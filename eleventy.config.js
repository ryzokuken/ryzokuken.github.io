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
        // curve: "basis",
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
  eleventyConfig.ignores.add("src/temporal-2020-04/README.md");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  for (const weight of [400, 700, 800]) {
    for (const subset of ["latin", "latin-ext"]) {
      const file = `jetbrains-mono-${subset}-${weight}-normal.woff2`;
      eleventyConfig.addPassthroughCopy({
        [`node_modules/@fontsource/jetbrains-mono/files/${file}`]: `fonts/${file}`,
      });
    }
  }
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/**/*.avif");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.addPassthroughCopy("src/temporal-2020-04/index.html");
}
