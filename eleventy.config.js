export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setTemplateFormats(["md", "liquid"]);
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.addPassthroughCopy("src/temporal-2020-04/index.html");
}
