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
2. Install node JS
3. Clone this repository and navigate to your clone.
4. Install JS dependencies: `npn install -C website`
5. Run: `hugo --source website server -D`.

This will start a local web server and will provide you the link to your local website.

To test analytics and the cookie consent banner with real IDs locally, set the same environment variables used in CI (optional):

    $ export GA_MEASUREMENT_ID=G-XXXXXXXXXX
    $ export AMPLITUDE_API_KEY=your-amplitude-api-key
    $ hugo --source website server -D

If these are unset, the site still runs; analytics scripts are simply omitted.

## Development

### Analytics and cookie consent

A single script (`/js/konflux-analytics.js`) is built by Hugo (js.Build) and loaded in the HEAD. It includes [Vanilla CookieConsent v3](https://cookieconsent.orestbida.com/) and the Amplitude SDK (vendored via npm); only gtag is loaded from googletagmanager.com. Configuration (GA ID, Amplitude key, privacy URL, debug) is set at build time in this repo; other CMS that embed the script from konflux-ci.dev add one script tag and do not set any config.

Analytics run only after the user accepts the “Analytics” category. The cookie banner links to the [Red Hat Privacy Statement](https://www.redhat.com/en/about/privacy-policy) (or the URL set in `privacy_policy_url` in `website/hugo.toml`).

Production analytics IDs are **not** committed. Configure them as GitHub Actions secrets:

- **GA_MEASUREMENT_ID** — your GA4 Measurement ID (e.g. `G-XXXXXXXXXX`)
- **AMPLITUDE_API_KEY** — your Amplitude project API key

Add them under **Repository Settings → Secrets and variables → Actions**. The build job passes them into Hugo so the analytics bundle receives them at build time.

**CORB / CORS with Amplitude locally:** The dev server is configured (see `[server]` in `website/hugo.toml`) with permissive Content-Security-Policy headers so script and connect sources for Amplitude and other analytics are allowed. The `[server]` section is used only by `hugo server` and does not affect production builds.

### Updating the Hugo modules

The website utilizes dependencies in the form of Hugo modules, the list of these
can be seen in the `website/go.mod` file. To update those dependencies run:

    $ cd website
    $ hugo mod get -u
