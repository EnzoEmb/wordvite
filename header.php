<!doctype html>
<html lang="es">
  <head>
    <!-- Tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <script>
      const THEMEPATH = `<?php echo get_template_directory_uri(); ?>`;
      const AJAX_URL = `<?php echo admin_url('admin-ajax.php'); ?>`;
    </script>
