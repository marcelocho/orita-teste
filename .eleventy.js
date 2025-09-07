module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addCollection("price", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/config/price.md");
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
