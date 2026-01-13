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

1. Install Hugo: https://gohugo.io/installation/.
2. Clone this repository and navigate to your clone.
3. Run: `hugo --source website server -D`.

This will start a local web server and will provide you the link to your local website.

## Development

### Updating the Hugo modules

The website utilizes dependencies in the form of Hugo modules, the list of these
can be seen in the `website/go.mod` file. To update those dependencies run:

    $ cd website
    $ hugo mod get -u
