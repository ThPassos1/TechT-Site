import type { Locale } from './context/AppPreferencesContext';
import mediaFeatureCampaign from './assets/videos/Campanha Cinematográfica.mp4';
import mediaDirectionSet from './assets/videos/Direção criativa do set.MOV';
import mediaPremium4k from './assets/videos/optimized/premium-4k-hq.mp4';
import mediaBehindScenes from './assets/videos/bastidores da produção.mp4';
import mediaReelLaunch from './assets/videos/optimized/reel-launch-hq.mp4';
import mediaInstitutional from './assets/videos/optimized/institutional-brand-hq.mp4';
import mediaStudioProduction from './assets/videos/optimized/studio-production-hq.mp4';
import mediaSocialVertical from './assets/videos/Social midia - Formatos.mp4';
import mediaPosterFeatureCampaign from './assets/videos/posters/feature-campaign.jpg';
import mediaPosterDirectionSet from './assets/videos/posters/direction-set.jpg';
import mediaPosterPremium4k from './assets/videos/posters/premium-4k.jpg';
import mediaPosterInstitutional from './assets/videos/posters/institutional-brand.jpg';
import mediaPosterBehindScenes from './assets/videos/posters/behind-scenes.jpg';
import mediaPosterReelLaunch from './assets/videos/posters/reel-launch.jpg';
import mediaPosterStudioProduction from './assets/videos/posters/studio-production.jpg';
import mediaPosterSocialVertical from './assets/videos/posters/social-vertical.jpg';

export type MediaShowcaseItem = {
  id: string;
  title: string;
  category: string;
  size: 'featured' | 'wide' | 'vertical';
  poster: string;
  videoSrc?: string;
};

const MEDIA_ITEMS_PT: readonly MediaShowcaseItem[] = [
  {
    id: 'feature-campaign',
    title: 'Campanha cinematográfica — case institucional',
    category: 'campaigns',
    size: 'featured',
    poster: mediaPosterFeatureCampaign,
    videoSrc: mediaFeatureCampaign,
  },
  {
    id: 'direction-set',
    title: 'Direção criativa em set',
    category: 'direction',
    size: 'wide',
    poster: mediaPosterDirectionSet,
    videoSrc: mediaDirectionSet,
  },
  {
    id: 'premium-4k',
    title: 'Captação premium em 4K',
    category: 'premium',
    size: 'wide',
    poster: mediaPosterPremium4k,
    videoSrc: mediaPremium4k,
  },
  {
    id: 'institutional-brand',
    title: 'Conteúdo institucional',
    category: 'institutional',
    size: 'wide',
    poster: mediaPosterInstitutional,
    videoSrc: mediaInstitutional,
  },
  {
    id: 'behind-scenes',
    title: 'Bastidores da produção',
    category: 'behind',
    size: 'vertical',
    poster: mediaPosterBehindScenes,
    videoSrc: mediaBehindScenes,
  },
  {
    id: 'reel-launch',
    title: 'Reel de lançamento',
    category: 'reels',
    size: 'vertical',
    poster: mediaPosterReelLaunch,
    videoSrc: mediaReelLaunch,
  },
  {
    id: 'studio-production',
    title: 'Produção em estúdio',
    category: 'production',
    size: 'vertical',
    poster: mediaPosterStudioProduction,
    videoSrc: mediaStudioProduction,
  },
  {
    id: 'social-vertical',
    title: 'Social media — formatos verticais',
    category: 'social',
    size: 'vertical',
    poster: mediaPosterSocialVertical,
    videoSrc: mediaSocialVertical,
  },
];

const MEDIA_ITEMS_EN: readonly MediaShowcaseItem[] = [
  {
    id: 'feature-campaign',
    title: 'Cinematic campaign — institutional case',
    category: 'campaigns',
    size: 'featured',
    poster: mediaPosterFeatureCampaign,
    videoSrc: mediaFeatureCampaign,
  },
  {
    id: 'direction-set',
    title: 'Creative direction on set',
    category: 'direction',
    size: 'wide',
    poster: mediaPosterDirectionSet,
    videoSrc: mediaDirectionSet,
  },
  {
    id: 'premium-4k',
    title: 'Premium 4K capture',
    category: 'premium',
    size: 'wide',
    poster: mediaPosterPremium4k,
    videoSrc: mediaPremium4k,
  },
  {
    id: 'institutional-brand',
    title: 'Institutional content',
    category: 'institutional',
    size: 'wide',
    poster: mediaPosterInstitutional,
    videoSrc: mediaInstitutional,
  },
  {
    id: 'behind-scenes',
    title: 'Behind the scenes of production',
    category: 'behind',
    size: 'vertical',
    poster: mediaPosterBehindScenes,
    videoSrc: mediaBehindScenes,
  },
  {
    id: 'reel-launch',
    title: 'Launch reel',
    category: 'reels',
    size: 'vertical',
    poster: mediaPosterReelLaunch,
    videoSrc: mediaReelLaunch,
  },
  {
    id: 'studio-production',
    title: 'Studio production',
    category: 'production',
    size: 'vertical',
    poster: mediaPosterStudioProduction,
    videoSrc: mediaStudioProduction,
  },
  {
    id: 'social-vertical',
    title: 'Social media — vertical formats',
    category: 'social',
    size: 'vertical',
    poster: mediaPosterSocialVertical,
    videoSrc: mediaSocialVertical,
  },
];

export const getMediaShowcaseItems = (locale: Locale): readonly MediaShowcaseItem[] =>
  locale === 'en' ? MEDIA_ITEMS_EN : MEDIA_ITEMS_PT;
