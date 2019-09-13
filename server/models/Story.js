'use strict';
/**
 * Opening Pathways API server
 * 
 * Story page Model
 * @module Story
 * @class story
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * Story model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Story = new keystone.List('Story', 
{
	label: 'Stories',
	autokey: { path: 'slug', from: 'name' }
});

/**
 * Model Fields
 * @main Story
 */
Story.add({
	
	name: { type: Types.Name, required: true, initial: true, noedit: true },
    email: { type: String, required: true, initial: true, noedit: true },
    
	pathway: { type: Types.Textarea, required: true, initial: true },
	why: { type: Types.Textarea, required: true, initial: true },
	what: { type: Types.Textarea, required: true, initial: true },
	how: { type: Types.Textarea, required: true, initial: true },
	deadCows: { type: Types.Markdown, required: true, initial: true },
	vision: { type: Types.Textarea, required: true, initial: true },
	links: { type: Types.Markdown },

	blurb: { type: String, note: 'Shows on pathways index.' },
	published: { type: Boolean, note: 'If unchecked, will never appear.' },
	submitDate: { type: Types.Datetime, noedit: true, required: true, initial: true },
	
});

Story.relationship({
    path: 'pathways', ref: 'Pathway', refPath: 'stories'
})

/**
 * Model Registration
 */
Story.defaultSort = '-createdAt';
Story.defaultColumns = 'name, submitDate, published';
Story.register();
