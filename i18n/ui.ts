import { Locale } from '../context/AppPreferencesContext';

type NavItem = { name: string; href: string };

const navByLocale: Record<Locale, NavItem[]> = {
  pt: [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Portfólio', href: '/portfolio' },
    { name: 'Contato', href: '/contato' },
  ],
  en: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/sobre' },
    { name: 'Services', href: '/servicos' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contato' },
  ],
};

const footerExtraByLocale: Record<Locale, NavItem[]> = {
  pt: [{ name: 'Blog', href: '/blog' }],
  en: [{ name: 'Blog', href: '/blog' }],
};

export const getNavigation = (locale: Locale): NavItem[] => navByLocale[locale];
export const getFooterExtraLinks = (locale: Locale): NavItem[] => footerExtraByLocale[locale];

export const UI_TEXT = {
  pt: {
    start: 'Começar',
    openMenu: 'Abrir menu',
    whatsappDirect: 'WhatsApp direto',
    menuTagline: 'TechT • Evolução Digital de Elite',
    footerNavigation: 'Navegação',
    footerConnect: 'Conecte-se',
    footerCopy: '© 2026 TechT. Desenvolvido por',
    heroMicrocopy: 'Marketing de ponta a ponta — com time ao seu lado e tecnologia que apoia decisões e análises.',
    clientsPartners: 'Clientes e parceiros',
    contactEmail: 'Email',
    contactLocation: 'Localização',
    contactFollow: 'Siga-nos',
    contactName: 'Seu Nome',
    contactHelp: 'Como podemos ajudar?',
    contactMessageSent: 'Mensagem Enviada!',
    contactSendNow: 'Enviar Agora',
    contactMessagePlaceholder: 'Descreva seu projeto ou serviço de interesse...',
    contactNamePlaceholder: 'Ex: João Silva',
    mediaWatchVideo: 'Ver vídeo',
    mediaViewCase: 'Ver case',
    mediaGalleryLabel: 'Galeria',
    mediaPrev: 'Anterior',
    mediaNext: 'Próximo',
    mediaClose: 'Fechar vídeo',
  },
  en: {
    start: 'Start',
    openMenu: 'Open menu',
    whatsappDirect: 'Direct WhatsApp',
    menuTagline: 'TechT • Elite Digital Growth',
    footerNavigation: 'Navigation',
    footerConnect: 'Connect',
    footerCopy: '© 2026 TechT. Developed by',
    heroMicrocopy: 'End-to-end marketing with your team and technology that supports better decisions and analysis.',
    clientsPartners: 'Clients and partners',
    contactEmail: 'Email',
    contactLocation: 'Location',
    contactFollow: 'Follow us',
    contactName: 'Your name',
    contactHelp: 'How can we help?',
    contactMessageSent: 'Message sent!',
    contactSendNow: 'Send now',
    contactMessagePlaceholder: 'Describe your project or the service you need...',
    contactNamePlaceholder: 'Ex: John Smith',
    mediaWatchVideo: 'Watch reel',
    mediaViewCase: 'View case',
    mediaGalleryLabel: 'Gallery',
    mediaPrev: 'Previous',
    mediaNext: 'Next',
    mediaClose: 'Close video',
  },
} as const;
