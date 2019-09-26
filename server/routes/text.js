'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Utility to retrieve text snippets by list of slugs
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone,
                 TextSnippet = keystone.list('TextSnippet');


exports.get = async (textKeys) => {

    let slugArr = textKeys.split(',');
    let data = TextSnippet.model.find({ 'slug':{ $in: slugArr } }, 'text.html -_id');

	try {
        let result = await data.lean().exec();
		return result;
	} catch (e) {
        return 'error: ' +e;
	}

};