'use strict';
/**
 * Developed by Engagement Lab, 2019
 * ==============
 * Route to retrieve pathways and their stories
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone,
      Pathway = keystone.list('Pathway');

var buildData = async (res) => {

    let storyFields = 'name slug -_id'
    let data = Pathway.model.find({}, storyFields).populate('stories', storyFields);

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
 * Get data
 */
exports.all = function (req, res) {

    return buildData(res);

}