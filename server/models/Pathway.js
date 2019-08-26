'use strict';
/**
 * Opening Pathways API server
 * 
 * Pathway Model
 * @module pathway
 * @class pathway
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * pathway model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Pathway = new keystone.List('Pathway', 
	{
		label: 'Pathways',
		singular: 'Pathway',
        autokey: { path: 'slug', from: 'name' },
	});

/**
 * Model Fields
 * @main Pathway
 */
Pathway.add({
	
    name: { type: String, required: true, initial: true },
    description: { type: Types.Textarea, required: true, initial: true },
    stories: { type: Types.Relationship, ref: 'Story', many: true }

});

/**
 * Model Registration
 */
Pathway.register();