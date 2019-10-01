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
	  Narrative = keystone.list('Narrative');

var getAdjacent = async (results, res) => {

	// Get one next/prev narrative from selected one's submit date
	let fields = 'slug -_id';
	let next = Narrative.model.findOne({published: true, submitDate: {
		$gt: results.submitDate
	}}, fields);
	let prev = Narrative.model.findOne({published: true, submitDate: {
		$lt: results.submitDate
	}}, fields).sort({submitDate: -1});

	try {
		
		let nextExec = await next.lean().exec();
		let prevExec = await prev.lean().exec();
		let nextSlug = null;
		let prevSlug = null;

		if(nextExec)
			nextSlug = nextExec.slug;
		if(prevExec)
			prevSlug = prevExec.slug;

		let output = {narrative: results, next: nextSlug, prev: prevSlug};
		res.json(output);

	} catch (e) {
		console.error(e)
		res.status(500).send({error:e});
	}

}
var buildData = async (res, id, featured) => {

	let narrativeFields = 'name title blurb body slug submitDate readingTime -_id';
	let query = !id ? {accepted: true, published: true} : {slug: id};

	if(featured)
		query.featured = true;
		
	let data = null;
	
	if(id) {
		data = Narrative.model.findOne(query, narrativeFields);
		let result = await data.lean().exec();
		getAdjacent(result, res);
		return;
	}
	else 
		data = Narrative.model.find(query, narrativeFields).sort({ submitDate: -1 });

	try {
		let result = await data.lean().exec();
		
		// Get index page text and append result
        if(!id && !featured) {
            const textUtil = require('../text');
            let txtResult = await textUtil.get('narratives-intro');
			
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
* Get published narratives
*/
exports.all = function (req, res) {

	return buildData(res);

}

/*
* Get published narratives
*/
exports.featured = function (req, res) {

	return buildData(res, null, true);

}

/*
* Get narrative by slug id
*/
exports.get = function (req, res) {

	return buildData(res, req.params.id);

}

/**
 * Create a submission
 */
exports.create = function(req, res) {
    
    const data = Object.assign(req.body, {submitDate: Date.now()}),
		  item = new Narrative.model(data);

	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err)
			return res.status(500).send({code: err.detail.code});
		
		res.apiResponse({
			result: item
		});
		
	});
}
