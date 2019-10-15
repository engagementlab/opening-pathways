'use strict';
/**
 * Opening Pathways API server
 * 
 * Narrative page Model
 * @module Narrative
 * @class narrative
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * Narrative model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Narrative = new keystone.List('Narrative', 
{
	label: 'Narratives',
	autokey: { path: 'slug', from: 'title' },
	map: { name: 'title' },
	nocreate: true
});

/**
 * Model Fields
 * @main Narrative
 */
Narrative.add({
	
	name: { type: String, required: true, initial: true, },
	email: { type: String, required: true, initial: true, noedit: true },
	title: { type: String, required: true, initial: true, unique: true },
	body: { type: Types.Html, wysiwyg: true, required: true, initial: true, note: 'Blockquote button will format as pull-quote.' },
	blurb: { type: Types.Textarea, dependsOn: {accepted:true}, note: 'Summary to show on home page, if featured.' },
	submitDate: { type: Types.Datetime, noedit: true, required: true, initial: true },

	accepted: { type: Boolean, note: 'Can be unpublished later.' },
	published: { type: Boolean, dependsOn: {accepted:true}, note: 'If unchecked, will never appear.' },
	featured: { type: Boolean, dependsOn: {published:true}, note: 'Show on home page?' },

	acceptedDate: { type: Types.Datetime, noedit: true },
	readingTime: { type: String, label: 'Reading Time (mins)', noedit: true }
	
});

// Update accepted date if accepted ticked
Narrative.schema.pre('save', function (next) {
	
	if(this.accepted) {
		this.acceptedDate = Date.now();

		// Calc read time
		const readingTime = require('reading-time');
		const stats = readingTime(this.body);
		this.readingTime = Math.round(stats.minutes);
	}
    
    next();

});


/**
 * Model Registration
 */
Narrative.defaultSort = '-createdAt';
Narrative.defaultColumns = 'title, name, submitDate, accepted, published, featured';
Narrative.register();
