
<p align="center">
  <img alt="wordvite" src="https://raw.githubusercontent.com/EnzoEmb/wordvite/next/.github/github-badge.png" style="width: 100%;">
</p>

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
📂 Optimize images<br>
🔩 Convert theme images to .webp<br>
💄 PostCSS w/ nesting and imports<br>
📑 Remove WP scripts and emoji tags<br>
🥞 THEMEPATH and AJAX_URL variables<br>
🍬 Classic Wordpress theme structure (no weird stuff)<br>

### Guide
<details>
  <summary>How to add a new page script?</summary>
  Create a .js file in src/js, then enqueue it conditionally in functions.php using the wv_load_script(JS_NAME) function
</details>
<details>
  <summary>How does the image optimization works?</summary>
  While in watching mode, every image you put into "src/img" folder gets an optimized version in "assets/img" also a WEBP version is created, you can add it in the theme by using the wv_img PHP function
</details>
<details>
  <summary>How does url() works in css</summary>
  CSS urls points to assets folder
</details>


### Scaffolding

```
wordvite/
├── assets/              // public assets (like fonts) and output of processed assets
│   ├── img/             // output of optimized images
│   ├── js/              // output of builded vite files (js and css)
├── core/ 
│   ├── wordvite.php     // contains wordvite useful php functions
├── src/    
│   ├── css/             // style files
│   ├── img/             // theme images
│   ├── js/              // javascript files
```