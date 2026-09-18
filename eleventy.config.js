import pluginMermaid from "@kevingimbel/eleventy-plugin-mermaid";

import { numberClauses } from "./lib/clauses.js";

const FONTS = {
  "public-sans": ["public-sans-latin-wght-normal", "public-sans-latin-ext-wght-normal"],
  "source-serif-4": [
    "source-serif-4-latin-wght-normal",
    "source-serif-4-latin-wght-italic",
    "source-serif-4-latin-ext-wght-normal",
    "source-serif-4-latin-ext-wght-italic",
  ],
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginMermaid, {
    mermaid_config: {
      startOnLoad: true,
      securityLevel: "strict",
      theme: "base",
      fontFamily: '"Public Sans", system-ui, sans-serif',
      themeVariables: {
        fontFamily: '"Public Sans", system-ui, sans-serif',
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
  eleventyConfig.addFilter("isRecent", (since) => {
    const match = (since ?? "").match(/^(\d{4})-(\d{2})$/);
    if (!match) return false;
    const then = new Date(Number(match[1]), Number(match[2]) - 1, 1);
    const now = new Date();
    const months =
      (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth());
    return months >= 0 && months < 6;
  });
  eleventyConfig.ignores.add("src/temporal-2020-04/README.md");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  for (const [family, files] of Object.entries(FONTS)) {
    for (const file of files) {
      eleventyConfig.addPassthroughCopy({
        [`node_modules/@fontsource-variable/${family}/files/${file}.woff2`]: `fonts/${file}.woff2`,
      });
    }
  }
  eleventyConfig.addGlobalData("build", () => ({ date: new Date() }));
  eleventyConfig.addTransform("clauses", function (content) {
    return this.page.outputPath?.endsWith(".html") ? numberClauses(content) : content;
  });
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/**/*.avif");
  eleventyConfig.addPassthroughCopy("src/**/*.js");
  eleventyConfig.addPassthroughCopy("src/temporal-2020-04/index.html");
}
