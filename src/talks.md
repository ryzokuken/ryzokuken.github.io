---
layout: layout.njk
title: Ryzokuken's Talks
---

# My Talks

{% assign all_flags = "" %}
{% for year_data in talks %}
  {% for talk in year_data.talks %}
    {% if talk.flag and talk.flag != '🌐' %}
      {% assign all_flags = all_flags | append: talk.flag | append: "," %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign unique_flags = all_flags | split: "," | uniq | join: "" %}
<span id="flags">{{ unique_flags }}</span>

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

## Past Talks

{% include "talks-list.liquid" %}
