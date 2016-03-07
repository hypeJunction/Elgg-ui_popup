define(function (require) {

	var elgg = require('elgg');
	var $ = require('jquery');
	require('jquery-ui');

	var popup = {
		ready: false,
		init: function () {
			if (popup.ready) {
				return;
			}
			$(document).on('click', function (e) {
				var $eventTargets = $(e.target).parents().andSelf();
				if ($eventTargets.is('[data-popup]')) {
					return;
				}
				popup.close();
			});

			// Adding this magic so that popups with fixed position stick to their parent element
			$(window).on('scroll resize', function() {
				$('[data-popup]:visible').each(function() {
					$(this).position($(this).data('position'));
				});
			});
			popup.ready = true;
		},
		bind: function ($triggers) {
			$triggers.each(function () {
				$(this).off('click.popup').on('click.popup', function (e) {
					if (e.isDefaultPrevented()) {
						return;
					}
					e.preventDefault();
					e.stopPropagation();
					popup.open($(this));
				});
			});
		},
		open: function ($trigger, $target, position) {
			if (!$trigger.length) {
				return;
			}

			if (typeof $target === 'undefined') {
				var targetSelector = elgg.getSelectorFromUrlFragment($trigger.attr('href'));
				$target = $(targetSelector).eq(0);
			} else {
				$target.uniqueId();
				var targetSelector = '#' + $target.attr('id');
				$target = $target.eq(0);
			}

			position = position || {
				my: 'center top',
				at: 'center bottom',
				of: $trigger,
				collision: 'fit fit'
			};

			$.extend(position, $trigger.data());

			// emit a hook to allow plugins to position and control popups
			var params = {
				targetSelector: targetSelector,
				target: $target,
				source: $trigger
			};

			position = elgg.trigger_hook('getOptions', 'ui.popup', params, position);

			if (!position) {
				return;
			}

			popup.init();
			popup.close();

			$trigger.addClass('elgg-state-active');
			$target.data('trigger', $trigger);
			$target.data('position', position);
			$target.fadeIn().addClass('elgg-state-active').attr('data-popup', true).position(position);
		},
		close: function ($targets) {
			if (typeof $targets === 'undefined') {
				$targets = $('[data-popup]');
			}
			$targets.each(function () {
				var $target = $(this);
				if (!$target.is(':visible')) {
					return;
				}

				var $trigger = $target.data('trigger');
				if ($trigger.length) {
					$trigger.removeClass('elgg-state-active');
				}

				$target.fadeOut().removeClass('elgg-state-active').removeAttr('data-popup');
			});
		}
	};
	return popup;

});