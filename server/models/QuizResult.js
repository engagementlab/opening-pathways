'use strict';
/**
 * Opening Pathways API server
 * 
 * QuizResult page Model
 * @module QuizResult
 * @class QuizResult
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone,
      Types = keystone.Field.Types;

/**
 * QuizResult model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var QuizResult = new keystone.List('QuizResult', 
	{
		label: 'Quiz Results',
        singular: 'Quiz Result',
        nocreate: true        
	});

/**
 * Model QuizResults
 * @main QuizResult
 */
QuizResult.add({
	
	submitDate: { type: Types.Datetime, noedit: true, required: true, initial: true }
    
});

QuizResult.schema.add({
    key: { type: String },
    responses: { type: Object }
});

/**
 * Model Registration
 */
QuizResult.defaultSort = '-submitDate';
QuizResult.defaultColumns = 'submitDate';
QuizResult.register();
