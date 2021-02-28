<?php 

/*
|--------------------------------------------------------------------------
| Wordvite v1.0.0 helper functions
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/




/**
 * 
 * Remove emoji scripts
 * 
 */
function wordvite_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );	
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );	
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'wordvite_disable_emojis' );


/**
 * 
 * Remove wp-embed script
 * 
 */
function wordvite_disable_embed_js(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'wordvite_disable_embed_js' );


/**
 * 
 * Add module or nomodule type to vite assets
 * 
 */
function wordvite_module_scripts($tag, $handle) {
  if(strpos($handle, 'polyfill') !== false){
    $tag = str_replace(" type='text/javascript'", " nomodule", $tag);
  }else{
    $tag = str_replace(" type='text/javascript'", " type='module'", $tag);
  }
  return $tag;
}
add_filter('script_loader_tag', 'wordvite_module_scripts', 10, 2);


/**
 * 
 * Check if site is in development mode
 * true if is in localhost and DEBUG is true
 * 
 */
function wordvite_is_dev()
{
	$whitelist = array(
		'127.0.0.1',
		'::1'
	);
	if (WP_DEBUG && in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
		return true;
	}
}


/**
 * 
 * Get optimized image and webp version
 * 
 */
function wordvite_img($name, $alt){
  $file_path = get_template_directory() . '/assets/img/' . $name;
  $file_type = mime_content_type($file_path);
  $file_name = pathinfo($name, PATHINFO_FILENAME);;
  $file_path_webp = get_template_directory() . '/assets/img/' . $file_name . '.webp';
  $file_size = getimagesize($file_path);

  if(file_exists($file_path)){
    $original_url = get_template_directory_uri() . '/assets/img/' . $name;
  }
  if(file_exists($file_path_webp)){
    $webp_url = get_template_directory_uri() . '/assets/img/' . $file_name . '.webp';
  }
  
  return '<picture>
  '.($webp_url ? '<source srcset="'.$webp_url.'" type="image/webp">' : '').'
  '.($original_url ? '<source srcset="'.$original_url.'" type="'.$file_type.'"> ' : '').'
  '.($original_url ? '<img src="'.$original_url.'" '.$file_size[3].'>' : '').'
  </picture>';
}


/**
 * 
 * Enqueue corresponding vite styles for dev and prod
 * 
 */

function wordvite_load_style($style_name){
  $css_file = get_template_directory() . "/assets/css/" . $style_name. ".css";
  $is_watch = file_exists(get_template_directory() . "/assets/watch");

  if($is_watch){
    wp_enqueue_style(
      $style_name,
      'http://localhost:3000'. "/assets/css/".$style_name.'.css',
      array(),
      null
    );
  }else{
    $manifest = json_decode(file_get_contents(get_template_directory() . "/assets/js/manifest.json"), true);
    wp_enqueue_style(
      $style_name,
      get_template_directory_uri(). "/assets/".$manifest["js/".$style_name.".js"]["css"][0],
      array(),
      null
    );
  }

}


/**
 * 
 * Load the appropiate scripts for the specified route
 */
function wordvite_load_script($chunk_name){
  $is_watch = file_exists(get_template_directory() . "/assets/watch");

  if($is_watch){
    wp_enqueue_script(
      $chunk_name,
      'http://localhost:3000'. "/js/".$chunk_name.'.js',
      null,
      null,
      true
    );

  }else{
    $manifest = json_decode(file_get_contents(get_template_directory() . "/assets/js/manifest.json"), true);

    // modern bundle
    wp_enqueue_script(
      'modern-'.$chunk_name,
      get_template_directory_uri(). "/assets/js/".$manifest["js/".$chunk_name.".js"]["file"],
      null,
      null,
      true
    );

    // polyfill
    wp_enqueue_script(
      'polyfill',
      get_template_directory_uri(). "/assets/js/".$manifest["../vite/legacy-polyfills"]["file"],
      null,
      null,
      true
    );
    
    // polyfill bundle
    wp_enqueue_script(
      'polyfill-'.$chunk_name,
      get_template_directory_uri(). "/assets/js/".$manifest["js/".$chunk_name."-legacy.js"]["file"],
      null,
      null,
      true
    );

    // css if have
    if($manifest["js/".$chunk_name.".js"]["css"]){    
      wp_enqueue_style(
        $chunk_name,
        get_template_directory_uri(). "/assets/js/".$manifest["js/".$chunk_name.".js"]["css"][0],
        array(),
        null
      );
    }

  }
}





/**
 * 
 * Defer scripts
 */
// function wordvite_defer_scripts($tag, $handle) {
//   if ( is_user_logged_in() ) return $tag;
//   // $exclude = [];
//   // if(!in_array($handle, $exclude)){
//     // var_dump(strpos($handle, 'polyfill'));
//     if(strpos($handle, 'polyfill') === false){
//     $tag = str_replace(' src', ' defer src', $tag);
//   }
//   // }
//   return $tag;

// }
// add_filter('script_loader_tag', 'wordvite_defer_scripts', 10, 2);





/**
 * 
 * Async styles
 */
// function wordvite_async_styles($tag, $handle) {
//   $include = ["wp-block-library"];
//   if(in_array($handle, $include)){
//     $tag = str_replace(" media='all'", ' media="print" onload="this.media=\'all\'; this.onload=null;"', $tag);
//   }
//   return $tag;
  
// }
// add_filter('style_loader_tag', 'wordvite_async_styles', 10, 2);





/**
 * 
 * Register inline script w/ ajax nonce
 */
// function wordvite_ajax($ajax_name, $key){
  
//   $script_name = uniqid();
// 	wp_register_script( $script_name, '' );
// 	wp_enqueue_script( $script_name );
// 	wp_add_inline_script( $script_name, 'const '.$ajax_name.' = "'.wp_create_nonce('MY_NONCE_KEY').'"');


// 	// wp_register_script( 'my-ajax-nonce-script', '' );
// 	// wp_enqueue_script( 'my-ajax-nonce-script' );
// 	// wp_add_inline_script( 'my-ajax-nonce-script', 'const MY_ACTION_NONCE = "'.wp_create_nonce('MY_NONCE_KEY').'"');
// }







