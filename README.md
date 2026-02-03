# konflux-ci.github.io

This repository contains the source code for the konflux-ci website hosted at
[konflux-ci.dev](https://konflux-ci.dev/).

The website is based on [Hugo](https://gohugo.io/) and
[hugo-universal-theme](https://github.com/devcows/hugo-universal-theme).

## Contributing

When new code is pushed to the repository's `main` branch, it triggers a GitHub action
that renders the website HTML and CSS files using Hugo, and pushes those artifacts to
the repository's GitHub Page which is reachable at
[konflux-ci.dev](https://konflux-ci.dev/).

See more details here:
https://gohugo.io/hosting-and-deployment/hosting-on-github/

To deploy the website locally:

### Using Hugo directly

1. Install Hugo: https://gohugo.io/installation/.
2. Clone this repository and navigate to your clone.
3. Run: `hugo --source website server -D`.

This will start a local web server and will provide you the link to your local website.

### Using containers (podman/docker)

1. Build the container image: `podman build -t konflux-website .`
2. Run the container: `podman run --rm -p 1313:1313 konflux-website`
3. Access the site at http://localhost:1313/

The containerized version uses the `hugomods/hugo:exts` image and serves the site with live reload enabled.

## Development

### Updating the Hugo modules

The website utilizes dependencies in the form of Hugo modules, the list of these
can be seen in the `website/go.mod` file. To update those dependencies run:

    $ cd website
    $ hugo mod get -u
