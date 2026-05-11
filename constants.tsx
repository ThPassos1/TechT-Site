
import React from 'react';
import { 
  Instagram,
  MessageCircle,
  BarChart3,
  Target,
  MousePointer2,
  PieChart,
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Activity
} from 'lucide-react';

export const COLORS = {
  bg: '#050505',
  cyan: '#00D2FF',
  purple: '#9D50BB',
};

export const GRADIENTS = {
  primary: 'bg-gradient-to-r from-[#00D2FF] to-[#9D50BB]',
  text: 'text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#9D50BB]',
  border: 'border-gradient-to-r from-[#00D2FF] to-[#9D50BB]',
};

/** Número E.164 sem símbolos (55 + DDD + número) — use em wa.me */
export const WHATSAPP_E164 = '559293627266';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;

const schedulePrefill = encodeURIComponent(
  'Olá! Quero agendar uma conversa com a TechT.'
);
export const WHATSAPP_SCHEDULE_URL = `${WHATSAPP_URL}?text=${schedulePrefill}`;

export const whatsappPrefill = (message: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

const env = import.meta.env;

export const EMAIL_JS_CONFIG = {
  SERVICE_ID: env.VITE_EMAILJS_SERVICE_ID || 'service_m7ac0b9',
  TEMPLATE_ID: env.VITE_EMAILJS_TEMPLATE_ID || 'template_sjdv2fb',
  PUBLIC_KEY: env.VITE_EMAILJS_PUBLIC_KEY || 'wGh-QmzuTd8xhcG2Z',
  DESTINATION_EMAIL:
    env.VITE_CONTACT_DESTINATION_EMAIL || 'thiagopassos.dev@gmail.com',
};

/** Menu principal como na versão online (âncoras via HashRouter). */
export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Portfólio', href: '/portfolio' },
  { name: 'Contato', href: '/contato' },
];

export const FOOTER_EXTRA_LINKS = [{ name: 'Blog', href: '/blog' }];

export const TRAFFIC_ICONS = [
  <Target className="w-6 h-6" />,
  <MousePointer2 className="w-6 h-6" />,
  <BarChart3 className="w-6 h-6" />,
  <PieChart className="w-6 h-6" />
];

export const DASHBOARD_ICONS = {
  Overview: <Activity className="w-4 h-4" />,
  Clients: <Briefcase className="w-4 h-4" />,
  Reports: <FileText className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />
};

export const SOCIALS = [
  { 
    name: 'Instagram', 
    icon: <Instagram size={22} />, 
    href: 'https://www.instagram.com/techt.dev?igsh=bGszZ3Nmendwdndn&utm_source=qr', 
    color: '#E1306C' 
  },
  { 
    name: 'WhatsApp', 
    icon: <MessageCircle size={22} />, 
    href: WHATSAPP_URL, 
    color: '#25D366' 
  },
];

