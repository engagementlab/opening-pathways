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

var buildData = async (res, id, limit) => {

    let storyFields = 'name slug'
    let data;

	if(id)
        data = Pathway.model.findOne({slug: id}, storyFields + ' description -_id').populate('stories', storyFields + ' -_id');
    else
        data = Pathway.model.find({}, storyFields + ' -_id').populate('stories', storyFields + ' -_id');

    if(limit)  
        data.limit(limit);

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
* Get pathway by slug id
*/
exports.get = function (req, res) {

	return buildData(res, req.params.id);

}

/*
 * Get limited data for home (pathways)
 */
exports.limit = function (req, res) {

    return buildData(res, null, parseInt(req.params.limit));

}

/*
 * Get data
 */
exports.all = function (req, res) {

    return buildData(res);

}