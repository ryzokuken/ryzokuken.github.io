---
layout: layout.liquid
title: Ryzokuken Uses
---

# Stuff I Use

Welcome to my `/uses` page. Inspired by folks like [Wes Bos](https://wesbos.com/uses/) and [Kent C. Dodds](https://kentcdodds.com/uses/), it is a living document of what I actually reach for. Over the years I have moved steadily toward open-source, open-protocol and privacy-respecting tools wherever they exist, and made my peace with the handful of places where they do not.

One rule governs this page: something is listed only if I use it, use it in preference to the alternatives, and can say why in a sentence or two. Anything I cannot defend that way has been cut, however popular it is.

Am I missing something you wanted to know? [Hit me up on Bluesky](https://bsky.app/profile/ryzokuken.dev). And do check out [uses.tech](https://uses.tech) for everyone else's `/uses` pages.

{% for section in uses.sections %}
{% include "uses-section.liquid", section: section %}
{% endfor %}

## Retired

Things that used to be on this page. Keeping them here felt more honest than quietly deleting them.

<div class="card-grid past-projects">
  {%- for item in uses.retired %}
  <div class="card">
    <strong>{{ item.name }}</strong>
    <p>{{ item.note }}{% if item.replacedBy %} Replaced by {{ item.replacedBy }}.{% endif %}</p>
  </div>
  {%- endfor %}
</div>
