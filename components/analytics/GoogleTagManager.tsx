import React, { useEffect } from 'react';

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface GTMProps {
  gtmId: string;
}

/**
 * GoogleTagManager - Integra GTM para rastreamento de eventos e conversões
 * Rastreia: cliques WhatsApp, agendamentos, submissões de formulário, seleção de planos
 */
export const GoogleTagManager: React.FC<GTMProps> = ({ gtmId }) => {
  useEffect(() => {
    // Script do GTM (noscript)
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.insertBefore(noscript, document.body.firstChild);

    // Script do GTM (script)
    const script = document.createElement('script');
    script.async = true;
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.insertBefore(script, document.head.firstChild);
  }, [gtmId]);

  return null;
};

/**
 * Event Tracking Utilities
 */
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

// Conversão: Clique no WhatsApp
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    source, // 'hero', 'cta-final', 'contact-form', etc
  });
};

// Conversão: Agendamento
export const trackScheduling = (source: string) => {
  trackEvent('scheduling_click', {
    source, // 'header', 'cta-section', etc
  });
};

// Conversão: Seleção de plano
export const trackPlanSelection = (planName: string) => {
  trackEvent('plan_selected', {
    plan: planName, // 'starter', 'growth', 'scale'
  });
};

// Conversão: Submissão de formulário
export const trackFormSubmit = (formType: string, success: boolean) => {
  trackEvent('form_submit', {
    form_type: formType, // 'contact', 'newsletter'
    success,
  });
};

// Event: Ver demonstração
export const trackDemoView = () => {
  trackEvent('demo_view_clicked', {
    timestamp: new Date().toISOString(),
  });
};

// Event: Scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    depth: percentage,
  });
};

// Event: Clique em card (portfolio, blog, etc)
export const trackCardClick = (cardType: string, cardName: string) => {
  trackEvent('card_click', {
    card_type: cardType, // 'portfolio', 'blog', 'service'
    card_name: cardName,
  });
};

// Event: Visualização de página
export const trackPageView = (pageName: string) => {
  trackEvent('page_view', {
    page_name: pageName,
  });
};
