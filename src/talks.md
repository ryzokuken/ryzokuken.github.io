---
layout: layout.liquid
title: Ryzokuken's Talks
flags: true
---

# My Talks

[Browse all my slide decks →](/slides/)

{% assign all_flags = "" %}
{% for year_data in talks %}
  {% for talk in year_data.talks %}
    {% if talk.flag and talk.flag != '🌐' %}
      {% assign all_flags = all_flags | append: talk.flag | append: "," %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign unique_flags = all_flags | split: "," | uniq | join: "" %}
<p class="flags-label">// countries visited</p>
<div id="flags">{{ unique_flags }}</div>

## Podcasts

<div class="talk-grid">
{% for podcast in podcasts %}
<div class="talk-card podcast-card">
  <div class="talk-card-body">
    <div class="talk-card-title"><a href="{{ podcast.url }}">{{ podcast.title }}</a></div>
    <div class="talk-card-event">{{ podcast.show }}</div>
    <div class="talk-card-meta">🎙️ {{ podcast.date }}</div>
  </div>
</div>
{% endfor %}
</div>

{%- assign has_upcoming = false -%}
{%- for year_data in talks -%}
  {%- for talk in year_data.talks -%}
    {%- if talk.upcoming -%}{%- assign has_upcoming = true -%}{%- endif -%}
  {%- endfor -%}
{%- endfor -%}

{%- if has_upcoming %}
<h2 id="upcoming">Upcoming</h2>

<div class="talk-grid talk-grid--upcoming">
{%- for year_data in talks -%}
{%- for talk in year_data.talks -%}
{%- if talk.upcoming -%}
{%- include "talk-card.liquid" -%}
{%- endif -%}
{%- endfor -%}
{%- endfor %}
</div>
{%- endif %}

## Past Talks

<nav class="year-jump" aria-label="Jump to year">
  <span class="year-jump-label">// year:</span>
  {%- for year_data in talks -%}
    {%- assign year_has_past = false -%}
    {%- for talk in year_data.talks -%}{%- unless talk.upcoming -%}{%- assign year_has_past = true -%}{%- endunless -%}{%- endfor -%}
    {%- if year_has_past -%}<a href="#{{ year_data.year }}">{{ year_data.year }}</a>{%- endif -%}
  {%- endfor -%}
</nav>

{% include "talks-list.liquid" %}
