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
const keystone = global.keystone;

var buildData = async (type, res) => {

    let homeFields = type === 'home' ? 
        'introHeader introText quizHeader quizBlurb tagline -_id' : 
        'introHeaderPatient introTextPatient submitHeader submitBlurb taglinePatient -_id';

    let resourceFields = 'name description category link -_id';

    let home = keystone.list('Home').model;
    let resource = keystone.list('Resource').model;
    let privacy = keystone.list('Privacy').model;

    let data = null;
    let getRes = [];

    if (type === 'home' || type === 'home-patient') {
        // Get home
        data = home.findOne({}, homeFields);
    }
    else if (type === 'resources') {
        // Get all resources and their category association
        data = resource.find({}, resourceFields).populate('category', 'name order -_id');
    }
    else if (type === 'privacy' || type === 'tos') {
        // Get tos/privacy
        data = privacy.findOne({}, type + ' -_id');
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