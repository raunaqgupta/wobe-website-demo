---
title: Blog
permalink: "/blog/"
layout: basic
---

{% for post in site.posts %}
  <h2><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h2>
  <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

  <p class="excerpt">{{ post.content }}</p>

  <hr>
{% endfor %}
