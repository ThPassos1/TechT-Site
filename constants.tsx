
import React from 'react';
import { 
  Code2, 
  Layers, 
  TrendingUp, 
  Zap, 
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

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Tráfego', href: '/trafego' },
  { name: 'Inteligência', href: '/inteligencia' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Portfólio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contato', href: '/contato' },
];

export const SERVICES = [
  {
    title: 'Desenvolvimento de Sites',
    description: 'Landing pages de alta conversão e portais institucionais com design artesanal e performance extrema.',
    icon: <Code2 className="w-8 h-8" />
  },
  {
    title: 'Sistemas Web Sob Medida',
    description: 'Arquitetura de sistemas complexos, ERPs e Dashboards personalizados para escalar sua operação.',
    icon: <Code2 className="w-8 h-8" />
  },
  {
    title: 'Tráfego Pago & Growth',
    description: 'Estratégias orientadas a dados no Meta Ads e Google Ads para maximizar seu ROI e presença digital.',
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    title: 'Experiência do Usuário',
    description: 'Interfaces intuitivas (UI/UX) que transformam visitantes em clientes através de psicologia de consumo.',
    icon: <Zap className="w-8 h-8" />
  }
];

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
    href: 'https://wa.me/+559293627266', 
    color: '#25D366' 
  },
];

export const EMAIL_JS_CONFIG = {
  SERVICE_ID: 'service_eoogkp8',
  TEMPLATE_ID: 'template_9rtu8mi',
  PUBLIC_KEY: 'wGh-QmzuTd8xhcG2Z',
  DESTINATION_EMAIL: 'thiagopassos.dev@gmail.com'
};
