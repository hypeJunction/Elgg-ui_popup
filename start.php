<?php

/**
 * Popups
 *
 * @author Ismayil Khayredinov <info@hypejunction.com>
 * @copyright Copyright (c) 2015, Ismayil Khayredinov
 */
require_once __DIR__ . '/autoloader.php';

elgg_register_event_handler('init', 'system', 'ui_popup_init');

/**
 * Initialize the plugin
 * @return void
 */
function ui_popup_init() {
	elgg_extend_view('elgg.js', 'components/popup.js');
}
