import pluginMermaid from "@kevingimbel/eleventy-plugin-mermaid";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginMermaid, {
    mermaid_config: {
      startOnLoad: true,
      securityLevel: "strict",
      theme: "base",
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      themeVariables: {
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: "15px",
      },
      flowchart: {
        curve: "linear",
        htmlLabels: true,
        padding: 16,
        nodeSpacing: 40,
        rankSpacing: 50,
        useMaxWidth: true,
      },
    },
  });
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setTemplateFormats(["md", "liquid"]);
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.addPassthroughCopy("src/temporal-2020-04/index.html");
}
