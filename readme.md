
<p align="center">
  <img alt="word-pack" src="https://i.imgur.com/X4plCaU.png">

<p align="center">
Wordpress Starter Theme using Vite as bundler
</p>


###  Tasks
``` bash
# Watch assets
npm run watch

# Build assets for production
npm run prod
```
<details>
  <summary>More tasks</summary>
  
``` bash
# Watch images
npm run watch:images

# Run vite serve
npm run watch:vite

# Optimize images
npm run prod:images

# Run vite build
npm run prod:vite

# Zip theme
npm run zip


```
</details>

### Features
🔥 Hot Module Replacement<br>
📦 Serve only the JS and CSS used per page<br>
🧦 Put JS scripts in footer and defer<br>
📂 Optimize images<br>
🔩 Convert theme images to .webp<br>
💄 PostCSS w/ nesting<br>
📑 Clean Wordpress scripts and emoji tags<br>
🥞 THEMEPATH and AJAX_URL variables<br>
🍬 Classic Wordpress theme structure (no weird stuff)<br>
🧩 Example of secure Ajax with nonce<br>
🎃 Cache bust of scripts and styles enqueued<br>

### Guide
<details>
  <summary>How to add a new page script?</summary>
  Create a .js file in src/js and add a new line in the JS section in webpack.mix.js then enqueue it in functions.php using the wordpack_load_chunk(JS_NAME) function
</details>
<details>
  <summary>How does the image optimization works?</summary>
  While in watching mode, every image you put into "src/img" folder gets an optimized version in "assets/img" also a WEBP version is created
</details>