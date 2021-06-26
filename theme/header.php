<!doctype html>
<html lang="es">
  <head>
    <!-- Tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <script>
      const THEMEPATH = '<?php echo get_template_directory_uri(); ?>';
      const AJAX_URL = '<?php echo admin_url('admin-ajax.php'); ?>';
    </script>
