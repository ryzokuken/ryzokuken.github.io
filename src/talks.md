---
layout: layout.liquid
title: Ryzokuken's Talks
flags: true
clause: 2
---

# Talks

[Browse all my slide decks →](/slides/)

{%- assign has_upcoming = false -%}
{%- for year_data in talks -%}
  {%- for talk in year_data.talks -%}
    {%- if talk.upcoming -%}{%- assign has_upcoming = true -%}{%- endif -%}
  {%- endfor -%}
{%- endfor -%}

{%- if has_upcoming %}
<h2 id="upcoming">Upcoming</h2>

{% include "talks-table.liquid", caption: "Scheduled talks" %}
{%- for year_data in talks -%}
{%- for talk in year_data.talks -%}
{%- if talk.upcoming -%}
{%- include "talk-row.liquid" -%}
{%- endif -%}
{%- endfor -%}
{%- endfor %}
  </tbody>
</table>
</div>
{%- endif %}

<h2 id="recorded">Recorded talks</h2>

<div class="table-wrap">
<table class="talk-table">
  <caption>Talks with a recording, newest first; each title opens the video</caption>
  <thead>
    <tr><th scope="col">Date</th><th scope="col">Talk</th><th scope="col">Place</th></tr>
  </thead>
  <tbody>
{%- for year_data in talks -%}
{%- for talk in year_data.talks reversed -%}
{%- if talk.links.video %}
    <tr>
      <td class="cell-date">{{ talk.date }}</td>
      <td><a class="talk-title" href="{{ talk.links.video }}">{{ talk.title }}</a> <span class="talk-event">{{ talk.event }}</span></td>
      <td class="cell-place">{{ talk.flag }} {{ talk.location }}</td>
    </tr>
{%- endif -%}
{%- endfor -%}
{%- endfor %}
  </tbody>
</table>
</div>

## Past talks

<nav class="year-jump" aria-label="Jump to year">
  <span class="year-jump-label">Jump to year</span>
  <ul class="year-list">
  {%- for year_data in talks -%}
    {%- assign year_has_past = false -%}
    {%- for talk in year_data.talks -%}{%- unless talk.upcoming -%}{%- assign year_has_past = true -%}{%- endunless -%}{%- endfor -%}
    {%- if year_has_past -%}<li><a href="#{{ year_data.year }}">{{ year_data.year }}</a></li>{%- endif -%}
  {%- endfor -%}
  </ul>
</nav>

{% include "talks-list.liquid" %}

## Podcasts

<div class="table-wrap">
<table class="talk-table podcast-table">
  <caption>Podcast appearances, newest first</caption>
  <thead>
    <tr><th scope="col">Date</th><th scope="col">Episode</th><th scope="col">Show</th></tr>
  </thead>
  <tbody>
{%- for podcast in podcasts reversed %}
    <tr>
      <td class="cell-date">{{ podcast.date }}</td>
      <td><a class="talk-title" href="{{ podcast.url }}">{{ podcast.title }}</a></td>
      <td>{{ podcast.show }}</td>
    </tr>
{%- endfor %}
  </tbody>
</table>
</div>

## Countries

{% assign all_flags = "" %}
{% for year_data in talks %}
  {% for talk in year_data.talks %}
    {% if talk.flag and talk.flag != '🌐' %}
      {% assign all_flags = all_flags | append: talk.flag | append: "," %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign unique_flags = all_flags | split: "," | uniq | join: "" %}
<figure class="figure flags-figure">
  <div id="flags">{{ unique_flags }}</div>
  <figcaption>Countries visited</figcaption>
</figure>
