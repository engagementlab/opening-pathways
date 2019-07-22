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

    let aboutFields = 'image.public_id para1.html para2.html -_id';

    let about = keystone.list('About').model;
    let data = null;
    let getRes = [];

    // if (type === 'home') {
    //     // Get home
    //     data = home.findOne({}, homeFields);
    // }
    // else if (type === 'about') {
    //     // Get about
    //     data = about.findOne({}, aboutFields);
    // } else if(type === 'activity') {
    //     // Get all activity
    //     data = activity.find({}, activityFields);
    // } else {
    //     // Get all studies
    //     let introData = about.findOne({}, aboutStudiesFields);
    //     data = study.find({}, studiesFields);

    //     getRes.push(await introData.exec());
    // }

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