'use strict';
/**
 * Opening Pathways API server
 * 
 * Privacy Model
 * @module privacy
 * @class privacy
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * privacy model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Privacy = new keystone.List('Privacy', 
	{
		label: 'Privacy/TOS',
		singular: 'Privacy/TOS',
		nocreate: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Privacy
 */
Privacy.add({

	name: { type: String, default: 'Privacy/TOS', hidden: true, required: true, initial: true },
    privacy: { type: Types.Markdown, label: 'Privacy Policy',  required: true, initial: true },
    tos: { type: Types.Markdown, label: 'TOS',  required: true, initial: true }
    
});

/**
 * Model Registration
 */
Privacy.register();
