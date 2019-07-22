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
 
/**
 * Create a Post
 */
exports.create = function(req, res) {
    
    const data = req.body,
          item = new Narrative.model(data);    

	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			result: item
		});
		
	});
}
