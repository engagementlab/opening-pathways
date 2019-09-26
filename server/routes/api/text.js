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
const textUtil = require('../text');

/*

*/
exports.get = async function (req, res) {

    let result = await textUtil.get(req.params.ids);
    res.json(result);

}