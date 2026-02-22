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

<audio data-theme="night" data-src="https://changelog.com/jsparty/86/embed" src="https://cdn.changelog.com/uploads/jsparty/86/js-party-86.mp3" preload="none" class="changelog-episode" controls></audio><script async src="https://cdn.changelog.com/embed.js"></script>

<iframe id="tc39ers" src="https://anchor.fm/hemanth-hm/embed/episodes/Ujjwal-Sharma-ep12mg/a-a1plh1" frameborder="0" scrolling="no"></iframe>

<iframe src="https://player.fireside.fm/v2/XHXVzqW5+5jgcJn8o?theme=dark" width="740" height="200" frameborder="0" scrolling="no"></iframe>

## Past Talks

{% include "talks-list.liquid" %}
