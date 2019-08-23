'use strict';
/**
 * Opening Pathways API server
 * 
 * Home page Model
 * @module home
 * @class home
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * home model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Home = new keystone.List('Home', 
	{
		label: 'Home Page',
		singular: 'Home Page',
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main Home
 */
Home.add(
	
	{
		name: { type: String, default: "Home Page Content", hidden: true, required: true, initial: true }
	},

	'Partner Site', {
		tagline: { type: String, required: true, initial: true },
		introHeader: { type: String, required: true, initial: true },
		introText: { type: Types.Textarea, required: true, initial: true },

		quizHeader: { type: String, required: true, initial: true },
		quizBlurb: { type: Types.Textarea, required: true, initial: true },
	},
	
	'Patient Site', {

		taglinePatient: { type: String, required: true, initial: true },		
		introHeaderPatient: { type: String, required: true, initial: true, label: 'Intro Header' },
		introTextPatient: { type: Types.Textarea, required: true, initial: true, label: 'Intro Text' },

		submitHeader: { type: String, required: true, initial: true },
		submitBlurb: { type: Types.Textarea, required: true, initial: true }

	}

);

/**
 * Model Registration
 */
Home.register();
