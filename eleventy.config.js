export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.setTemplateFormats([
    "md",
    "css",
    "pdf",
    "liquid",
    "jpg",
    "js",
  ]);
}
