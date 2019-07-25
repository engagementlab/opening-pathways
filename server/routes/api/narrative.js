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
	  Narrative = keystone.list('Narrative');var buildData = async (res) => {

		let quizFieldsFields = 'prompt page pageOrder pageName note.html type responsesObj slug -_id';
	
		let quizFields = keystone.list('QuizField').model;
		let data = quizFields.find({}, quizFieldsFields).sort({
			page: 1,
			pageOrder: 1
		});
	
		try {
			let result = await data.lean().exec();
			let groupedRes = _l.groupBy(result, 'page');
	
			res.json(groupedRes);
		} catch (e) {
			res.status(500).json({
				e
			});
		}
	
	};
	
	/*
	 * Get published narratives
	 */
	exports.get = function (req, res) {
	
		return buildData(res);
	
	}
 
/**
 * Create a submission
 */
exports.create = function(req, res) {
    
    const data = Object.assign(req.body, {submitDate: Date.now()}),
		  item = new Narrative.model(data);

	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			result: item
		});
		
	});
}
