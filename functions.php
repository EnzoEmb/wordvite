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
  if(is_home()){
    wv_load_script('homepage');
  }

}
add_action('wp_enqueue_scripts', 'add_theme_assets');

