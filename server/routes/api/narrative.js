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

var buildData = async (res, id, featured) => {

	let narrativeFields = 'name title blurb body slug submitDate readingTime -_id';
	let query = !id ? {accepted: true, published: true} : {slug: id};

	if(featured)
		query.featured = true;
		
	let data = null;
	
	if(id)
		data = Narrative.model.findOne(query, narrativeFields);
	else 
		data = Narrative.model.find(query, narrativeFields).sort({ submitDate: -1 });

	try {
		let result = await data.lean().exec();
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
