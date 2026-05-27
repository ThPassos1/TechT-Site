import React from 'react';
import { Helmet } from 'react-helmet-async';
import { WHATSAPP_URL } from '../constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
  keywords?: string[];
  canonical?: string;
  schema?: Record<string, unknown>;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'TechT — Marketing empresarial completo e Ecossistema TechT',
  description =
    'Pacote de marketing empresarial: tráfego, conteúdo, páginas, WhatsApp e plataforma Ecossistema TechT. IA apoia análises e decisões em todo o fluxo. Manaus e remoto.',
  image = 'https://techtai.com.br/og-image.jpg',
  url,
  type = 'website',
  author = 'TechT',
  publishedDate,
  updatedDate,
  keywords = [
    'TechT',
    'marketing empresarial',
    'Ecossistema TechT',
    'tráfego pago Manaus',
    'Meta Ads',
    'Google Ads',
    'automação WhatsApp',
    'CRM integrado',
    'agência Manaus',
  ],
  canonical,
  schema,
  noindex = false,
}) => {
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://techt-site.vercel.app').replace(/\/$/, '');
  const resolvedUrl = url ?? siteUrl;
  const resolvedCanonical = canonical ?? `${siteUrl.replace(/\/$/, '')}/`;

  // Schema.org LocalBusiness markup
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'TechT',
    description: description,
    url: resolvedUrl,
    telephone: '+55-92-93627-266',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Manaus',
      addressRegion: 'AM',
      addressCountry: 'BR',
    },
    sameAs: [
      'https://www.instagram.com/techt.br/',
      WHATSAPP_URL,
    ],
    image,
    areaServed: {
      '@type': 'City',
      name: 'Manaus',
    },
  };

  // Schema.org Organization markup
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TechT',
    url: resolvedUrl,
    logo: `${siteUrl}/logo.png`,
    description: description,
    sameAs: [
      'https://www.instagram.com/techt.br/',
      WHATSAPP_URL,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Manaus',
      addressRegion: 'AM',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+55-92-93627-266',
    },
  };

  const servicesItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ecossistema TechT',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Marketing integrado — da aquisição à conversão' },
      { '@type': 'ListItem', position: 2, name: 'Ecossistema TechT — SaaS multi-tenant com CRM, tráfego e portal do cliente' },
      { '@type': 'ListItem', position: 3, name: 'Automação e WhatsApp — integração com apoio de IA e webhooks (ex.: n8n)' },
    ],
  };

  // Merge default schemas with custom
  const finalSchema = schema || localBusinessSchema;
  const robots = noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="google-site-verification" content="ZSUpt6LKCPvAeSr4OqZHk0oO4R3o2yj6UTIKEzsg_aU" />
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="geo.region" content="BR-AM" />
      <meta name="geo.placename" content="Manaus" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="TechT" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Article specific */}
      {type === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === 'article' && updatedDate && (
        <meta property="article:modified_time" content={updatedDate} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      <link rel="canonical" href={canonical ?? resolvedCanonical} />
      <link rel="alternate" hrefLang="pt-BR" href={resolvedCanonical} />
      <link rel="alternate" hrefLang="x-default" href={resolvedCanonical} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>

      {/* Additional Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      <script type="application/ld+json">{JSON.stringify(servicesItemList)}</script>

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Helmet>
  );
};

export default SEOHead;
