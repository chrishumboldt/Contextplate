/**
 * jQuery File: 	contextplage.js
 * Type:			component
 * Author:        	Chris Humboldt
 * Last Edited:   	11 March 2015
 */


// Plugin
;(function($, window, document, undefined)
{
	// Plugin setup & settings
	var $contextplate					= 'contextplate', $defaults =
	{
		overlay_template 				: '<div class="contextplate-overlay"></div>'
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
			var $this 						= this;
			var $settings 					= $this.settings;
			var $this_contextual 			= $(this.element);
			var $context_id 				= $this_contextual.data('context-id');
			var $this_contextual_trigger 	= $('[data-context-trigger='+ $context_id +']');
			var $window_w 					= $(window).width();


			// Setup
			// ---------------------------------------------------------------------------------------
			$this_contextual.addClass('contextplate');
			$this.overlay_add();
			last_list_item();


			// Execute
			// ---------------------------------------------------------------------------------------
			// Hide contextplate
			$('.contextplate-overlay, .contextplate .close, .contextplate a').on('click', function($ev)
			{
				$ev.preventDefault();
				$this.contextplate_close($this_contextual);
			});
			$(window).resize(function()
			{
				if($(window).width() != $window_w)
				{
					$this.contextplate_close($this_contextual);
					$window_w 				= $(window).width();
				}
			});

			// Show contextplate
			$this_contextual_trigger.on('click', function($ev)
			{
				$ev.preventDefault();
				$this.contextplate_reveal($this_contextual, $(this));
			});


			// Internal functions
			// ---------------------------------------------------------------------------------------
			// Determine the last in the list
			function last_list_item()
			{
				// Loop through each
				if($this_contextual.find('li.seperate').length > 0)
				{
					$this_contextual.find('li.seperate').prev().addClass('last');
				}
				else
				{
					$this_contextual.find('li:last-child').addClass('last');
				}
			}
		},


		// Public functions
		// ---------------------------------------------------------------------------------------
		// Close
		contextplate_close 				: function($this_contextual)
		{
			$this_contextual.removeClass('reveal');
			$('html').removeClass('contextplate-reveal');
		},

		// Reveal
		contextplate_reveal				: function($this_contextual, $this)
		{
			$this_contextual.addClass('reveal');
			$('html').addClass('contextplate-reveal');

			// If large screen
			if($(window).width() > 700)
			{
				// Variables
				var $position 			= $this.offset();
				var $trigger_w 			= $this.width();
				var $trigger_h	 		= $this.height();

				var $position_top		= $position.top + $trigger_h + 14;
				var $position_left		= $position.left - ($trigger_w / 2);

				// Check left position
				if($position_left < 0)
				{
					$position_left 		= 4;
				}

				$this_contextual.css({ top: $position_top, left: $position_left, bottom: 'auto' });
			}
			else
			{
				$this_contextual.attr({ style: '' });
			}
		},

		// Overlay
		overlay_add 					: function()
		{
			if($('.contextplate-overlay').length == false)
			{
				$('body').append(this.settings.overlay_template);
			}
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