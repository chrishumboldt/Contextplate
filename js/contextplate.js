/**
 * jQuery File: 	contextplage.js
 * Type:			component
 * Author:        	Chris Humboldt
 * Last Edited:   	10 Mrch 2015
 */


// Plugin
;(function($, window, document, undefined)
{
	// Plugin setup & settings
	var $contextplate					= 'contextplate', $defaults =
	{
	};
	
	// The actual plugin constructor
	function Plugin($element, $options) 
	{
		this.element 					= $element;
		this.settings 					= $.extend({}, $defaults, $options);
		this._defaults 					= $defaults;
		this._name 						= $contextplate;

		// Initilize plugin
		this.init();
	}
	
	// Plugin
	// ---------------------------------------------------------------------------------------
	Plugin.prototype 					= 
	{
		init 							: function()
		{
			// Variables
			// ---------------------------------------------------------------------------------------
			var $this 					= this;
			var $settings 				= $this.settings;


			// Execute
			// ---------------------------------------------------------------------------------------
			// Public function
			$this.public_function();
		},

		// Public functions
		// ---------------------------------------------------------------------------------------
		public_function 				: function($variable)
		{
		}
	};


	// Plugin wrapper
	// ---------------------------------------------------------------------------------------
	$.fn[$contextplate] 				= function($options)
	{
		var $plugin;

		this.each(function()
		{
			$plugin 					= $.data(this, 'plugin_' + $contextplate);

			if(!$plugin)
			{
				$plugin 				= new Plugin(this, $options);
				$.data(this, 'plugin_' + $contextplate, $plugin);
			}
		});

		return $plugin;
	};
})(jQuery, window, document);