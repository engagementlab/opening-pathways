'use strict';
/**
 * Opening Pathways API server
 * 
 * TextSnippet Model
 * @module textsnippet
 * @class textsnippet
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * textsnippet model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var TextSnippet = new keystone.List('TextSnippet', 
	{
		label: 'Text Snippet',
        singular: 'Text Snippet',
        autokey: { path: 'slug', from: 'location', unique: true },
        map: { name: 'location' },

	});

/**
 * Model Fields
 * @main TextSnippet
 */
TextSnippet.add({
        
	location: { type: Types.Select, options: 'submit narrative, submit narrative thanks, narratives intro, pathways intro, resources intro, quiz landing intro, quiz results intro, submit story intro', required: true, initial: true, note: 'Page snippet shows on.' },    
    text: { type: Types.Markdown, required: true, initial: true }

});

/**
 * Model Registration
 */
TextSnippet.defaultColumns = 'location';
TextSnippet.register();
