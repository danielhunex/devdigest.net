const fs = require('fs');

module.exports = (config) => {
  // The imgDim transform (below) reads these images back out of `_site`
  // while it runs, and needs them to already be in place. Eleventy 3 copies
  // passthrough files and renders/writes templates concurrently, so relying
  // on addPassthroughCopy here would race the transform's reads against
  // Eleventy's own copy (and, worse, a copy that's still in flight when the
  // transform's outputs are written could clobber them). Copy these two
  // directories ourselves, synchronously, before any template is rendered.
  config.on('eleventy.before', () => {
    fs.cpSync('src/assets/img', '_site/assets/img', { recursive: true });
    fs.cpSync('src/posts/img', '_site/assets/img', { recursive: true });
  });
  config.addPassthroughCopy({
    "src/_includes/icons": "icons/"
  })

  config.addWatchTarget("src/assets/js/");

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('minifyJs', require('./lib/filters/minifyJs'));

  config.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('tagList', require('./lib/collections/tagList'));
  config.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  config.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));

  config.addPlugin(require("./lib/img-dim.js"));
  config.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });

  config.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"))
  
  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    // pathPrefix: "/subfolder/",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
