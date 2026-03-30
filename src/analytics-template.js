/**
 * Konflux Analytics - Standalone bundle for GitHub Pages (TEMPLATE)
 *
 * GDPR-compliant cookie consent with Google Consent Mode v2 and Amplitude.
 * Can be used on both Docusaurus and Antora sites.
 *
 * This is a template file processed by scripts/build-analytics.js at build time.
 * Environment variables are baked in during build, not configured at runtime.
 *
 * Build-time placeholders (replaced by build script):
 *   __GA_MEASUREMENT_ID__     → process.env.GA_MEASUREMENT_ID
 *   __AMPLITUDE_API_KEY__     → process.env.AMPLITUDE_API_KEY
 *   __PRIVACY_POLICY_URL__    → process.env.PRIVACY_POLICY_URL
 *   __DEBUG__                 → (NODE_ENV !== 'production')
 *
 * Usage in both sites:
 *   <script src="/js/konflux-analytics.js" type="module"></script>
 */

(function () {
  "use strict";

  // Configuration (baked in at build time)
  const gaId = "__GA_MEASUREMENT_ID__";
  const amplitudeKey = "__AMPLITUDE_API_KEY__";
  const privacyUrl = "__PRIVACY_POLICY_URL__";
  const debug = __DEBUG__; // Boolean literal, not a string

  // Debug logging
  function log(msg, data) {
    if (debug) console.log("[Konflux Analytics]", msg, data || "");
  }

  // Google Consent Mode v2: Set defaults BEFORE gtag loads
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });

  log('Consent defaults set to "denied"');

  // Amplitude initialization (lazy-loaded)
  let amplitudeModule = null;
  async function initAmplitude() {
    if (!amplitudeKey) return;
    if (amplitudeModule) return;

    try {
      // Import Amplitude from CDN
      const { init, setOptOut } =
        await import("https://cdn.amplitude.com/libs/analytics-browser-2.11.3-min.js.gz");
      amplitudeModule = { init, setOptOut };

      init(amplitudeKey, undefined, {
        defaultTracking: {
          sessions: true,
          pageViews: true,
          formInteractions: false,
          fileDownloads: false,
        },
        optOut: true, // Start opted out
      });

      log("Amplitude initialized (opted out)");
    } catch (e) {
      console.error("[Konflux Analytics] Amplitude init failed:", e);
    }
  }

  // Update consent for GA4 and Amplitude
  function updateConsent(allowed) {
    log("Updating consent", { allowed });

    // Update Google Consent Mode
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: allowed ? "granted" : "denied",
        ad_storage: "denied", // Always deny ads
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    // Update Amplitude opt-out
    if (amplitudeModule && typeof amplitudeModule.setOptOut === "function") {
      try {
        amplitudeModule.setOptOut(!allowed);
      } catch (e) {
        console.error("[Konflux Analytics] Amplitude setOptOut failed:", e);
      }
    }
  }

  // Load vanilla-cookieconsent default CSS
  function loadCookieConsentCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css";

    // Insert at the beginning of <head> so site's custom CSS can override it
    const firstLink = document.head.querySelector('link[rel="stylesheet"]');
    if (firstLink) {
      document.head.insertBefore(link, firstLink);
    } else {
      document.head.prepend(link);
    }
  }

  // Initialize cookie consent
  async function initCookieConsent() {
    // Load vanilla CSS first (PatternFly overrides in Docusaurus, default in Antora)
    loadCookieConsentCSS();

    try {
      // Import vanilla-cookieconsent from CDN
      const CookieConsent =
        await import("https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.esm.js");

      CookieConsent.run({
        mode: "opt-in",
        autoShow: true,
        autoClearCookies: true,
        disablePageInteraction: true,
        hideFromBots: true,
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
                      "These cookies help us understand how visitors use the site (e.g., Google Analytics, Amplitude).",
                    linkedCategory: "analytics",
                  },
                  {
                    title: "More information",
                    description: `For details, see our <a href="${privacyUrl}" target="_blank" rel="noopener">Privacy Statement</a>.`,
                  },
                ],
              },
            },
          },
        },
        guiOptions: {
          consentModal: {
            layout: "box inline",
            position: "bottom center",
            flipButtons: false,
          },
          preferencesModal: {
            layout: "box inline",
            position: "right",
          },
        },
        onFirstConsent: () => {
          const allowed = CookieConsent.acceptedCategory("analytics");
          updateConsent(allowed);
          log("First consent", { allowed });
        },
        onConsent: () => {
          const allowed = CookieConsent.acceptedCategory("analytics");
          updateConsent(allowed);
          log("Consent updated", { allowed });
        },
        onChange: () => {
          const allowed = CookieConsent.acceptedCategory("analytics");
          updateConsent(allowed);
          log("Preferences changed", { allowed });
        },
      });

      // Apply consent for returning visitors
      setTimeout(() => {
        const allowed = CookieConsent.acceptedCategory("analytics");
        updateConsent(allowed);
      }, 0);

      // Docusaurus-specific fix: Re-add modal classes on route changes
      // Docusaurus removes classes from <html> during SPA navigation
      // Only needed on Docusaurus sites (not Antora)
      const isDocusaurus = document.getElementById("__docusaurus") !== null;

      if (isDocusaurus) {
        function syncConsentClasses() {
          const html = document.documentElement;
          const ccMain = document.querySelector("#cc-main");

          // Only show the modal if consent hasn't been given yet
          if (ccMain && !CookieConsent.validConsent()) {
            if (!html.classList.contains("show--consent")) {
              html.classList.add("show--consent", "cc--anim");
            }
            if (!ccMain.classList.contains("cc--anim")) {
              ccMain.classList.add("cc--anim");
            }
          }
        }

        // Initial sync after a short delay
        setTimeout(syncConsentClasses, 150);

        // Watch for class removals (Docusaurus route changes)
        const observer = new MutationObserver(() => {
          const ccMain = document.querySelector("#cc-main");
          if (ccMain && !CookieConsent.validConsent()) {
            const html = document.documentElement;
            if (!html.classList.contains("show--consent")) {
              requestAnimationFrame(syncConsentClasses);
            }
          }
        });

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });

        log("Docusaurus class sync enabled");
      }

      log("Cookie consent initialized");
    } catch (e) {
      console.error("[Konflux Analytics] Cookie consent init failed:", e);
    }
  }

  // Load Google Analytics gtag.js
  function loadGoogleAnalytics() {
    if (!gaId) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;

    script.onload = () => {
      window.gtag("js", new Date());
      window.gtag("config", gaId, {
        anonymize_ip: true,
      });
      log("Google Analytics loaded", { gaId });
    };

    document.head.appendChild(script);
  }

  // Initialize everything
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }

    log("Initializing", { gaId, amplitudeKey, privacyUrl });

    // Load GA4
    loadGoogleAnalytics();

    // Initialize Amplitude
    if (amplitudeKey) {
      initAmplitude();
    }

    // Initialize cookie consent
    initCookieConsent();

    if (!gaId && !amplitudeKey) {
      log(
        "No analytics configured (GA_MEASUREMENT_ID and AMPLITUDE_API_KEY not set)",
      );
    }
  }

  init();
})();
