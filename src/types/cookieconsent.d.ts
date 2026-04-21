declare module "vanilla-cookieconsent" {
  export interface CookieConsentConfig {
    categories?: Record<string, { enabled?: boolean; readOnly?: boolean }>;
    language?: {
      default: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      translations: Record<string, any>;
    };
    guiOptions?: {
      consentModal?: { layout?: string; position?: string };
      preferencesModal?: { layout?: string };
    };
    onFirstConsent?: () => void;
    onConsent?: () => void;
    onChange?: () => void;
  }

  export function run(config: CookieConsentConfig): void;
  export function acceptedCategory(category: string): boolean;
  export function showPreferences(): void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[];
  }
}

export {};
