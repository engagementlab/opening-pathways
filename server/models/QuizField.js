'use strict';
/**
 * Engagement Journalism API server
 * 
 * QuizField page Model
 * @module QuizField
 * @class QuizField
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;
const _l = require('lodash');

/**
 * QuizField model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var QuizField = new keystone.List('QuizField', 
	{
		label: 'Quiz Fields',
		singular: 'Quiz Field',
        autokey: { path: 'slug', from: 'prompt' },
        map: { name: 'prompt' }
	});

/**
 * Model Fields
 * @main QuizField
 */
QuizField.add({
	
	prompt: { type: String, required: true, initial: true },
	page: { type: Number, required: true, initial: true, note: 'Which page of quiz to show field.' },
	pageOrder: { type: Number, required: true, initial: true, note: 'Ordering of field on page. Should be unique amongst siblings on page.' },
	type: { type: Types.Select, options: 'choice, text', required: true, initial: true },
    note: { type: Types.Markdown },
    responses: { type: Types.TextArray, dependsOn: {type: 'choice'}, note: 'Add " []" to end of a response (w/ preceding space) to show a fill-in field.' }
    
});

QuizField.schema.add({
    responsesObj: { type: Object }
});

// Transform responses to more easily used obj
QuizField.schema.pre('save', function (next) {

    // Map each response ('[]' means show blank field)
    this.responsesObj = _l.flatMap(this.responses, (r) => {
        return {
            txt: r.replace(' []', ''),
            field: r.indexOf('[]') > 0
        };
    });
    
    next();

});

/**
 * Model Registration
 */
QuizField.defaultSort = '-page, -pageOrder';
QuizField.defaultColumns = 'prompt, page, pageOrder, type';
QuizField.register();
