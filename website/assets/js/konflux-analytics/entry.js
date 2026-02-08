/**
 * Konflux analytics and cookie consent — single bundle.
 * Built by Hugo js.Build; config via @params (gaId, amplitudeKey, privacyUrl, debug, cookieconsentCss).
 */
import * as params from "@params";
import * as CookieConsent from "vanilla-cookieconsent";
import * as amplitude from "@amplitude/analytics-browser";

(function () {
  const debug = !!params.debug;
  if (debug) {
    window.__KONFLUX_DEBUG_ANALYTICS = true;
    window.__KONFLUX_DEBUG_ANALYTICS_CONFIG = {
      ga: !!params.gaId,
      amp: !!params.amplitudeKey,
    };
  }

  // GA consent default before any gtag load
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });

  // Inject CookieConsent CSS
  if (params.cookieconsentCss) {
    const style = document.createElement("style");
    style.textContent = params.cookieconsentCss;
    (document.head || document.documentElement).appendChild(style);
  }

  // Helpers (used by CookieConsent callbacks)
  window.__KONFLUX_DEBUG_ANALYTICS_LOG = function (context) {
    if (!debug || !window.__KONFLUX_DEBUG_ANALYTICS_CONFIG) return;
    const c = window.__KONFLUX_DEBUG_ANALYTICS_CONFIG;
    const analyticsAllowed = CookieConsent.acceptedCategory("analytics");
    const ga = c.ga
      ? analyticsAllowed
        ? "configured, enabled"
        : "configured, disabled"
      : "not configured";
    const amp = c.amp
      ? analyticsAllowed
        ? "configured, enabled"
        : "configured, disabled"
      : "not configured";
    console.log(
      "[Konflux] " +
        context +
        ": Analytics category " +
        (analyticsAllowed ? "allowed" : "denied") +
        ". GA4: " +
        ga +
        ", Amplitude: " +
        amp +
        "."
    );
  };
  window.__KONFLUX_APPLY_ANALYTICS_CONSENT = function () {
    const allowed = CookieConsent.acceptedCategory("analytics");
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: allowed ? "granted" : "denied",
        ad_storage: "denied",
      });
    }
    if (amplitude && typeof amplitude.setOptOut === "function") {
      try {
        amplitude.setOptOut(!allowed);
      } catch (e) {
        if (debug) console.error("[Konflux] Amplitude setOptOut error:", e);
      }
    }
  };

  // Amplitude: init with opt-out until consent
  if (params.amplitudeKey) {
    try {
      amplitude.init(params.amplitudeKey, {
        defaultTracking: true,
      });
      amplitude.setOptOut(true);
    } catch (e) {
      if (debug) console.error("[Konflux] Amplitude init error:", e);
    }
  }

  // CookieConsent
  const privacyUrl = params.privacyUrl || "#";
  CookieConsent.run({
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {},
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "We use cookies",
            description:
              "We use cookies to improve your experience and analyze site traffic. You can choose to accept analytics cookies or reject non-essential cookies.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage preferences",
          },
          preferencesModal: {
            title: "Manage cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save preferences",
            closeIconLabel: "Close",
            sections: [
              {
                title: "Strictly necessary",
                description:
                  "These cookies are essential for the site to function and cannot be disabled.",
                linkedCategory: "necessary",
              },
              {
                title: "Analytics",
                description:
                  "These cookies help us understand how visitors use the site (e.g. Google Analytics, Amplitude).",
                linkedCategory: "analytics",
              },
              {
                title: "More information",
                description:
                  'For details, see our <a href="' +
                  privacyUrl +
                  '" target="_blank" rel="noopener">Privacy Statement</a>.',
              },
            ],
          },
        },
      },
    },
    guiOptions: {
      consentModal: { layout: "box inline", position: "bottom center" },
      preferencesModal: { layout: "box" },
    },
    onFirstConsent: function () {
      if (window.__KONFLUX_APPLY_ANALYTICS_CONSENT)
        window.__KONFLUX_APPLY_ANALYTICS_CONSENT();
      if (window.__KONFLUX_DEBUG_ANALYTICS_LOG)
        window.__KONFLUX_DEBUG_ANALYTICS_LOG("Cookie consent (first)");
    },
    onConsent: function () {
      if (window.__KONFLUX_APPLY_ANALYTICS_CONSENT)
        window.__KONFLUX_APPLY_ANALYTICS_CONSENT();
      if (window.__KONFLUX_DEBUG_ANALYTICS_LOG)
        window.__KONFLUX_DEBUG_ANALYTICS_LOG("Cookie consent");
    },
    onChange: function () {
      if (window.__KONFLUX_APPLY_ANALYTICS_CONSENT)
        window.__KONFLUX_APPLY_ANALYTICS_CONSENT();
      if (window.__KONFLUX_DEBUG_ANALYTICS_LOG)
        window.__KONFLUX_DEBUG_ANALYTICS_LOG("Cookie preferences changed");
    },
  });

  // Apply consent for returning visitors
  if (window.__KONFLUX_APPLY_ANALYTICS_CONSENT)
    setTimeout(window.__KONFLUX_APPLY_ANALYTICS_CONSENT, 0);

  // Inject gtag script if GA is configured
  if (params.gaId) {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" + params.gaId;
    script.onload = function () {
      window.gtag("js", new Date());
      window.gtag("config", params.gaId);
    };
    document.head.appendChild(script);
  }

  if (debug && !params.gaId && !params.amplitudeKey) {
    console.log(
      "[Konflux] Analytics scripts skipped: GA_MEASUREMENT_ID and AMPLITUDE_API_KEY are not set. Set env vars or add GitHub Actions secrets to enable."
    );
  }
})();
