export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.setTemplateFormats(["md", "css", "pdf", "njk", "liquid", "jpg", "js"])
}