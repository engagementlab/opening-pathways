'use strict';
/**
 * Engagement Journalism API server
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
	
	name: { type: String, required: true, initial: true, noedit: true },
	email: { type: String, required: true, initial: true, noedit: true },
	title: { type: String, required: true, initial: true, noedit: true, unique: true },
	body: { type: Types.Html, wysiwyg: true, required: true, initial: true },
	submitDate: { type: Types.Datetime, noedit: true, required: true, initial: true },

	accepted: { type: Boolean, note: 'Can be unpublished later.' },
	published: { type: Boolean, dependsOn: {accepted:true} },
	acceptedDate: { type: Types.Datetime, noedit: true }

});

// Update accepted date if accepted ticked
Narrative.schema.pre('save', function (next) {
	
	if(this.accepted)
		this.acceptedDate = Date.now();
    
    next();

});


/**
 * Model Registration
 */
Narrative.defaultSort = '-createdAt';
Narrative.defaultColumns = 'title, name, submitDate, accepted';
Narrative.register();
