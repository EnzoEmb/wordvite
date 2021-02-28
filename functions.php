<?php 
include_once "core/wordvite.php";


/**
 * 
 * Include scripts
 */
function add_theme_assets()
{

	// enqueue style
	// wordpack_load_style('app');

	
	// enqueue chunks conditionally
  if(is_home()){
    wordpack_load_script('global');
  }
  // if(is_page(5)){
  //   wordpack_load_chunk('page_2');
  // }

	// add inline script w/ ajax nonce
	wordpack_ajax('MY_AJAX_NAME', 'MY_NONCE_KEY');

}
add_action('wp_enqueue_scripts', 'add_theme_assets');




/**
 * 
 * Custom AJAX call
 */
function wordpack_ajax_call() {
	// verify nonce
	if ( ! wp_verify_nonce( $_POST['nonce_data'], 'MY_NONCE_KEY' ) ) {
			die ( 'Busted!');
	}

	// return data
	echo json_encode('HELLO FROM AJAX', true);
	die();

}
add_action('wp_ajax_nopriv_MY_AJAX_ACTION', 'wordpack_ajax_call');    
add_action('wp_ajax_MY_AJAX_ACTION', 'wordpack_ajax_call');