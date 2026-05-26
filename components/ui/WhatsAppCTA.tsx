import React from 'react';
import { whatsappPrefill } from '../../constants';
import { trackWhatsAppClick } from '../analytics/GoogleTagManager';
import GlowBorder from '../effects/GlowBorder';
import WhatsAppIcon from './WhatsAppIcon';

type WhatsAppCTAProps = {
  label: string;
  message: string;
  trackLabel: string;
  size?: 'md' | 'lg';
  className?: string;
};

const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  label,
  message,
  trackLabel,
  size = 'md',
  className = '',
}) => {
  const sizing =
    size === 'lg'
      ? 'px-9 py-4 text-base md:text-[1.05rem]'
      : 'px-7 py-3.5 text-[0.95rem] md:text-base';

  return (
    <GlowBorder
      className={`rounded-full inline-block ${className}`.trim()}
      thickness="1.5px"
      duration="4.5s"
      color="rgba(37,211,102,0.95)"
      accent="rgba(255,255,255,0.7)"
    >
      <a
        href={whatsappPrefill(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(trackLabel)}
        className={`relative z-10 inline-flex items-center gap-2.5 rounded-full font-bold tracking-[-0.005em] text-white bg-gradient-to-r from-[#25D366] via-[#22C75E] to-[#1EBE5C] shadow-[0_0_30px_rgba(37,211,102,0.36),0_18px_40px_-18px_rgba(37,211,102,0.55)] hover:shadow-[0_0_44px_rgba(37,211,102,0.55),0_22px_46px_-18px_rgba(37,211,102,0.7)] hover:scale-[1.03] active:scale-[0.99] transition-all duration-300 will-change-transform ${sizing}`}
      >
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15 border border-white/25">
          <WhatsAppIcon className="w-[15px] h-[15px]" />
        </span>
        <span>{label}</span>
      </a>
    </GlowBorder>
  );
};

export default WhatsAppCTA;
