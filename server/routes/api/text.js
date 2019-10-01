'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Route to retrieve text snippets by slug IDS 
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const textUtil = require('../text');

/*

*/
exports.get = async function (req, res) {

    let result = await textUtil.get(req.params.ids);
    if(result.length < 1) {
        res.status(204).send();
        return;
    }
    else
        res.json(result);

}