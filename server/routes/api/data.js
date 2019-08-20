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
      _l = require('lodash');

var buildData = async (type, res) => {

    let homeFields = 'introHeader introText quizHeader quizBlurb tagline -_id';
    let resourceFields = 'name description category link -_id';

    let home = keystone.list('Home').model;
    let resource = keystone.list('Resource').model;
    let data = null;
    let getRes = [];

    if (type === 'home') {
        // Get home
        data = home.findOne({}, homeFields);
    }
    else if (type === 'resources') {
        // Get all resources and their category association
        data = resource.find({}, resourceFields).populate('category', 'name order -_id');
    }

    try {
        getRes.push(await data.exec());
        res.json(getRes);
    } catch (e) {
        res.status(500).json({
            e
        });
    }

};

/*
 * Get data
 */
exports.get = function (req, res) {

    return buildData(req.params.type, res);

}