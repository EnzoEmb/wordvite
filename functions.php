<?php

include_once "core/wordvite.php";


/**
 * 
 * Enqueue assets
 */
function add_theme_assets()
{
	// enqueue chunks conditionally
  wv_load_script('global');

}
add_action('wp_enqueue_scripts', 'add_theme_assets');

