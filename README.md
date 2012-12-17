# Varnish Inspector

A simple Google Chrome extension that shows the freshness of a pages being served up by Varnish cache based on HIT/MISS headers.

## Screenshots

Currently this addon consists of a single toolbar button that changes state based on detected HTTP headers.

### Default

The button icon appears gray/disabled when no special HTTP headers are detected.

![Button when inactive](https://raw.github.com/deizel/varnish-inspector/master/img/screenshot_inactive.png)

### Varnish detected

The button icon becomes Varnish-blue when the HTTP header `Via` is detected containing the string "varnish":

![Button when active](https://raw.github.com/deizel/varnish-inspector/master/img/screenshot_active.png)

### Cache miss

The button becomes red-ish in color when the HTTP header `X-Cache` is detected containing the string "MISS":

![Button when cache miss](https://raw.github.com/deizel/varnish-inspector/master/img/screenshot_miss.png)

### Cache hit

The button becomes green in color when the HTTP header `X-Cache` is detected containing the string "HIT":

![Button when cache hit](https://raw.github.com/deizel/varnish-inspector/master/img/screenshot_hit.png)

The label text is updated to reflect the number of cache hits if the HTTP header `X-Cache-Hits` is present.
