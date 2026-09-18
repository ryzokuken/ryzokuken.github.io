---
layout: layout.liquid
title: Ujjwal Sharma
clause: 1
---

<header class="title-block">
  <div class="title-text">
    <h1 class="doc-title">Ujjwal Sharma</h1>
    <p class="doc-subtitle">Programming Languages, Web Standards and Open Source Tinkerer</p>
    <ul class="refs" aria-label="Contact and profiles">
      <li><span class="ref-key">[GitHub]</span> <a href="https://github.com/ryzokuken">github.com/ryzokuken</a></li>
      <li><span class="ref-key">[LinkedIn]</span> <a href="https://www.linkedin.com/in/ryzokuken">linkedin.com/in/ryzokuken</a></li>
      <li><span class="ref-key">[Mastodon]</span> <a href="https://mastodon.social/@ryzokuken" rel="me">@ryzokuken@mastodon.social</a></li>
      <li><span class="ref-key">[Bluesky]</span> <a href="https://bsky.app/profile/ryzokuken.dev">@ryzokuken.dev</a></li>
      <li><span class="ref-key">[Email]</span> <a href="mailto:usharma1998@gmail.com">usharma1998@gmail.com</a></li>
    </ul>
    <p class="doc-meta">A Coruña, Galiza</p>
  </div>
  <figure class="portrait">
    <picture>
    <source type="image/avif" srcset="/img/photo-360.avif 1x, /img/photo-540.avif 1.5x, /img/photo-720.avif 2x">
    <source type="image/webp" srcset="/img/photo-360.webp 1x, /img/photo-540.webp 1.5x, /img/photo-720.webp 2x">
    <img src="/photo.jpg" srcset="/photo.jpg 1x, /img/photo-540.jpg 1.5x, /img/photo-720.jpg 2x" alt="Ujjwal Sharma" width="180" height="180" fetchpriority="high" decoding="async">
  </picture>
  </figure>
</header>

{% assign latest_post = collections.post | last %}

{% assign next_talk = nil %}
{% assign talk_count = 0 %}
{% for year_data in talks %}
  {% for talk in year_data.talks %}
    {% if talk.upcoming %}{% if next_talk == nil %}{% assign next_talk = talk %}{% endif %}{% else %}{% unless talk.title contains "*" %}{% assign talk_count = talk_count | plus: 1 %}{% endunless %}{% endif %}
  {% endfor %}
{% endfor %}
{% assign first_year = talks | last %}

{% unless next_talk %}
  {% assign latest_year = talks | first %}
  {% assign latest_talk = latest_year.talks | last %}
{% endunless %}

<h2 id="roles">Roles</h2>

<p>I work on how JavaScript handles dates, times and languages: Temporal, Intl (ECMA-402) and the next Unicode MessageFormat.</p>

<ol class="steps">
  <li><a href="https://tc39.es/ecma402/">ECMA-402</a> Co-editor</li>
  <li><a href="https://github.com/tc39/proposal-temporal">Temporal</a> Champion</li>
  <li><a href="/talks/">International Speaker</a></li>
</ol>

<h2 id="past-roles">Past roles</h2>

<ol class="steps">
  <li><a href="https://www.igalia.com/">Igalia</a> Developer Advocate</li>
  <li><a href="https://tc39.es/">TC39</a> Co-chairperson</li>
  <li><a href="https://nodejs.org/">Node.js</a> Core Contributor</li>
  <li><a href="https://www.electronjs.org/">Electron</a> Maintainer</li>
</ol>

<h2 id="current">Current activity</h2>

<div class="note">
<dl class="recent">
  <div class="recent-item">
    <dt>Latest post</dt>
    <dd><a href="{{ latest_post.url }}">{{ latest_post.data.title }}</a></dd>
  </div>
  <div class="recent-item">
    {%- if next_talk %}
    <dt>Next talk</dt>
    <dd><a href="/talks/#upcoming">{{ next_talk.title }}</a> <span class="recent-venue">{{ next_talk.event }}</span></dd>
    {%- else %}
    <dt>Latest talk</dt>
    <dd><a href="/talks/#{{ latest_year.year }}">{{ latest_talk.title }}</a> <span class="recent-venue">{{ latest_talk.event }}</span></dd>
    {%- endif %}
  </div>
</dl>
</div>

<h2 id="record">The record</h2>

<table class="index-table">
  <caption>Where everything else lives</caption>
  <thead>
    <tr><th scope="col">Section</th><th scope="col">Contents</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="/talks/"><span class="toc-num">2</span> Talks</a></td><td>{{ talk_count }} talks since {{ first_year.year }}, {{ podcasts.size }} podcasts{% if next_talk %}, and what is next{% endif %}</td></tr>
    <tr><td><a href="/projects/"><span class="toc-num">3</span> Projects</a></td><td>Specifications and codebases, current and past</td></tr>
    <tr><td><a href="/blog/"><span class="toc-num">4</span> Blog</a></td><td>{{ collections.post.size }} posts, including the “What even is Ecma?” series</td></tr>
    <tr><td><a href="/uses/"><span class="toc-num">5</span> Uses</a></td><td>Tools and gear, each with a reason</td></tr>
  </tbody>
</table>
