'use strict';
/**
 * Opening Pathways API server
 * 
 * StoryField page Model
 * @module StoryField
 * @class storyfield
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
 * StoryField model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var StoryField = new keystone.List('StoryField', 
	{
		label: 'Story Fields',
		singular: 'Story Field',
        autokey: { path: 'slug', from: 'prompt' },
        map: { name: 'prompt' },
        nocreate: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main StoryField
 */
StoryField.add({
	
	prompt: { type: String, required: true, initial: true },
	order: { type: Number, required: true, initial: true, note: 'Ordering of field on form. Should be unique amongst siblings on page.' },
	note: { type: String, note: 'Shows below prompt.' }, 
	halfSize: { type: Boolean, note: 'Text box is half the default height.' },
	mapping: { type: Types.Select, options: 'pathway, why, what, how, lessonsLearned, vision, links', required: true, initial: true, note: 'Which <a href="/cms/stories">stories</a> section does this field show under? Must be unique.' },
    required: { type: Boolean },
    
});

/**
 * Model Registration
 */
StoryField.defaultSort = 'order';
StoryField.defaultColumns = 'prompt, order';
StoryField.register();
