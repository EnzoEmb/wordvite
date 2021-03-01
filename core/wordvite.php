<?php 

/*
|--------------------------------------------------------------------------
| Wordvite v1.0.0 Helper Functions
|--------------------------------------------------------------------------
*/




/**
 * 
 * Remove emoji scripts
 * 
 */
function wv_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );	
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );	
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'wv_disable_emojis' );


/**
 * 
 * Remove wp-embed script
 * 
 */
function wv_disable_embed_js(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'wv_disable_embed_js' );


/**
 * 
 * Add module or nomodule type to vite assets
 * 
 */
function wv_module_scripts($tag, $handle) {
  if(strpos($handle, 'polyfill') !== false){
    $tag = str_replace(" type='text/javascript'", " nomodule", $tag);
  }else{
    $tag = str_replace(" type='text/javascript'", " type='module'", $tag);
  }
  return $tag;
}
add_filter('script_loader_tag', 'wv_module_scripts', 10, 2);


/**
 * 
 * Check if site is in development mode
 * true if is in localhost and DEBUG is true
 * 
 */
function wv_is_dev()
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
function wv_img($name, $alt){
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

function wv_load_style($style_name){
  $css_file = get_template_directory() . "/assets/css/" . $style_name. ".css";
  $is_watch = file_exists(get_template_directory() . "/assets/watch");

  if($is_watch){
    wp_enqueue_style(
      $style_name,
      'http://localhost:3000'. "/css/".$style_name.'.css',
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
function wv_load_script($chunk_name){
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
    $css = $manifest["js/".$chunk_name.".js"]["css"];
    if($css){
      foreach ($css as $key => $value) {
        wp_enqueue_style(
          $chunk_name.'-'.$key,
          get_template_directory_uri(). "/assets/js/".$value,
          array(),
          null
        );
      }
    }

  }
}
