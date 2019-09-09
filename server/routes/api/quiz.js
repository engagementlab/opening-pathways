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

var buildData = async (res) => {

    let quizFieldsFields = 'prompt page pageOrder pageName note.html type required responsesObj slug -_id';

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
 * Get data
 */
exports.get = function (req, res) {

    return buildData(res);

}

/**
 * Save unique quiz results
 */
exports.save = function (req, res) {

    const QuizResult = keystone.list('QuizResult').model;
    QuizResult.count({}, (err, ct) => {

        const data = {
            responses: req.body,
            submitDate: Date.now(),
            key: ct
        };
        let item = new QuizResult(data)

        item.getUpdateHandler(req).process(data, function (err) {

            if (err)
                return res.status(500).send({
                    code: err.detail.code
                });

            res.apiResponse({
                result: item.key
            });

        });
    });

}
