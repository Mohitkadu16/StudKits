declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      type: string,
      propertyId: string,
      options?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-M758VFCJX9';

export const pageview = (url: string) => {
  window.gtag('event', 'page_view', {
    page_path: url,
    send_to: GA_MEASUREMENT_ID
  });
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    send_to: GA_MEASUREMENT_ID
  });
};