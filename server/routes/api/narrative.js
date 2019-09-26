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
	let next = Narrative.model.findOne({accepted: true, published: true, sortOrder: {
		$gt: results.submitDate
	}}, fields).limit(1);
	let prev = Narrative.model.findOne({accepted: true, published: true, sortOrder: {
		$lt: results.submitDate
	}}, fields).sort({sortOrder: -1}).limit(1);

	try {
		
		let nextExec = await next.lean().exec();
		let prevExec = await prev.lean().exec();

		let output = {narrative: results, next: nextExec, prev: prevExec};
		console.log(output)
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
