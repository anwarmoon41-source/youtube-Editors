export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  buttonText?: string;
}

export interface PricingTier {
  category?: string;
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  glowColor: 'cyan' | 'magenta' | 'voltage';
  buttonText?: string;
}

export interface PortfolioItem {
  id: string;
  client: string;
  category: 'Shorts' | 'Long-Form' | 'Gaming' | 'Corporate';
  description: string;
  imageUrl: string;
  result: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SiteContent {
  global: {
    brandNamePrefix: string;
    brandNameSuffix: string;
    logoText: string;
    navLinks: string[];
    chatbotName: string;
    chatbotWelcome: string;
  };
  home: {
    badgeText: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroSubtitle: string;
    btnPrimary: string;
    btnSecondary: string;
    introTitlePrefix: string;
    introTitleHighlight: string;
    introDesc: string;
    features: { icon: string; title: string; desc: string }[];
  };
  about: {
    titlePrefix: string;
    titleHighlight: string;
    mainImg: string;
    sectionTitle: string;
    desc1: string;
    desc2: string;
    points: string[];
    stats: { icon: string; title: string; desc: string; color: string }[];
  };
  services: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    items: Service[];
  };
  pricing: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    tiers: PricingTier[];
  };
  portfolio: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    items: PortfolioItem[];
  };
  contact: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    statusTitle: string;
    statusLabel: string;
    statusValue: string;
    formLabels: {
      name: string;
      email: string;
      service: string;
      message: string;
    };
    buttonText: string;
  };
  footer: {
    brandDesc: string;
    column1Title: string;
    column2Title: string;
    column3Title: string;
    column3Text: string;
    newsletterPlaceholder: string;
    copyright: string;
    privacyText: string;
    termsText: string;
  };
}