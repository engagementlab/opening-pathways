'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Route to create a story or retrieve all story data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone,
	  Story = keystone.list('Story');

var buildData = async (res, id, featured) => {

	let storyFields = 'name	pathway	why	how	deadCows vision	links.html -_id';
	let query = !id ? {published: true} : {slug: id};

	if(featured)
		query.featured = true;
		
	let data = null;
	
	if(id)
		data = Story.model.findOne(query, storyFields);
	else 
		data = Story.model.find(query, 'name slug -_id').sort({ submitDate: -1 });

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
* Get published stories
*/
exports.all = function (req, res) {

	return buildData(res);

}

/*
* Get featured stories
*/
exports.featured = function (req, res) {

	return buildData(res, null, true);

}

/*
* Get story by slug id
*/
exports.get = function (req, res) {

	return buildData(res, req.params.id);

}

/**
 * Create a story submission
 */
exports.create = function(req, res) {
    
    const data = Object.assign(req.body, {submitDate: Date.now()}),
		  item = new Story.model(data);

	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			result: item
		});
		
	});
}
