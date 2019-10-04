'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Route to retrieve all data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone,
	  Resource = keystone.list('Resource'),
      _l = require('lodash');

var getAdjacent = async (results, res) => {

	// Get all resources from selected one's category, then get next/prev resource based on index of selected
	let fields = 'slug -_id';
    let all = Resource.model.find({category: results.category}, fields).sort({slug: 1});
    let data = await all.lean().exec();

	let indSelected = _l.findIndex(data, {'slug': results.slug});

    // Get adjacent
    let nextSlug = data[indSelected+1];
    let prevSlug = data[indSelected-1];

	try {

		let output = {resource: results, next: nextSlug, prev: prevSlug};
		res.json(output);

	} catch (e) {
		console.error(e)
		res.status(500).send({error:e});
	}

}
var buildData = async (res, id) => {

	let resourceFields = 'name slug';

    let data = null;
    
	if(id) {
        data = Resource.model.findOne({slug: id}, resourceFields + ' body category -_id');
        let result = await data.lean().exec();

		getAdjacent(result, res);
		return;
    }
    // Get all resources and their category association
    else
        data = Resource.model.find({}, resourceFields + ' description -_id').sort({slug: 1}).populate('category', 'key name order -_id');

	try {
		let result = await data.lean().exec();

        // Get index page text and append result
        if(!id) {
            const textUtil = require('../text');
            let txtResult = await textUtil.get('resources-intro');

            result = {content: result, txt: txtResult};
		}
		
		res.json(result);
	} catch (e) {
		res.status(500).json({
			e
		});
	}

};

/*
* Get all resources
*/
exports.all = function (req, res) {

	return buildData(res);

}

/*
* Get resource by slug id
*/
exports.get = function (req, res) {

	return buildData(res, req.params.id);

}