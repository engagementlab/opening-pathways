'use strict';
/**
 * Opening Pathways API server
 * 
 * Resource Category Model
 * @module resourcecategory
 * @class resourcecategory
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * resourcecategory model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var ResourceCategory = new keystone.List('ResourceCategory', 
	{
		label: 'Resource Category',
		singular: 'Resource Category',
		plural: 'Resource Categories'
	});

/**
 * Model Fields
 * @main ResourceCategory
 */
ResourceCategory.add({
	
    name: { type: String, required: true, initial: true },
    order: { type: Number, note: 'Order on page' }

});

/**
 * Model Registration
 */
ResourceCategory.register();
