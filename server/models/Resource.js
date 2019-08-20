'use strict';
/**
 * Opening Pathways API server
 * 
 * Resource Model
 * @module resource
 * @class resource
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * resource model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Resource = new keystone.List('Resource', 
	{
		label: 'Resource',
		singular: 'Resource'
	});

/**
 * Model Fields
 * @main Resource
 */
Resource.add({
	
    name: { type: String, required: true, initial: true },
    description: { type: String, required: true, initial: true },
    category: { type: Types.Relationship, ref: 'ResourceCategory', required: true, initial: true },
    link: { type: Types.Url, label: 'Link to resource', note: 'Must be a valid URL' }

});

/**
 * Model Registration
 */
Resource.defaultColumns = 'name, category';
Resource.register();
