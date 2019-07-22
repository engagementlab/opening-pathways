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
});

/**
 * Model Fields
 * @main Narrative
 */
Narrative.add({
	
	name: { type: String, required: true, initial: true, noedit: true },
	email: { type: String, required: true, initial: true, noedit: true },
	title: { type: String, required: true, initial: true, noedit: true },
	body: { type: Types.Html, wysiwyg: true, required: true, initial: true },
	date: { type: Types.Datetime, default: Date.now, noedit: true },
	accepted: { type: Boolean }	

});

/**
 * Model Registration
 */
Narrative.defaultSort = '-createdAt';
Narrative.defaultColumns = 'title, name, date, accepted';
Narrative.register();
