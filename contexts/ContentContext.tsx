import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Service, PricingTier, PortfolioItem } from '../types';

// Default Content
const defaultContent: SiteContent = {
  global: {
    brandNamePrefix: 'YOUTUBE',
    brandNameSuffix: 'EXPERTS',
    logoText: 'YOUTUBE EXPERTS',
    navLinks: ['Home', 'About', 'Services', 'Pricing', 'Portfolio', 'Contact'],
    chatbotName: 'PULSE AI',
    chatbotWelcome: 'Systems online. I am Pulse AI. Need a viral video idea or info on our services?',
  },
  home: {
    badgeText: 'System Online',
    heroTitleLine1: 'IGNITE YOUR',
    heroTitleLine2: 'CONTENT',
    heroSubtitle: 'Professional Video Editing & High-CTR Thumbnails designed for the next generation of creators. Stop the scroll. Hold the viewer.',
    btnPrimary: 'View Packages',
    btnSecondary: 'See Portfolio',
    introTitlePrefix: 'CUT THROUGH THE',
    introTitleHighlight: 'NOISE',
    introDesc: 'We provide high-retention editing and neon-infused thumbnails that amplify your digital presence.',
    features: [
      { icon: 'Zap', title: 'High Voltage Visuals', desc: 'Styles that pop with electric cyan and magenta accents to grab attention instantly.' },
      { icon: 'Play', title: 'Retention Focused', desc: 'Psychology-based pacing and sound design to keep viewers watching until the very end.' },
      { icon: 'Layers', title: 'Future-Proof', desc: 'We stay ahead of viral trends so your content never looks outdated.' },
    ]
  },
  about: {
    titlePrefix: 'BEHIND THE',
    titleHighlight: 'GLOW',
    mainImg: 'https://picsum.photos/seed/techworkspace/800/600',
    sectionTitle: 'Who We Are',
    desc1: 'We are digital artisans obsessed with retention. In a sea of content, we combine technical precision with artistic flair to ensure you don\'t just exist—you dominate.',
    desc2: 'Our team masters the "Neon/Cyber" aesthetic—clean cuts, glowing elements, smooth motion graphics, and punchy transitions. We don\'t just edit video; we engineer attention.',
    points: [
      'Mastery of Premiere Pro & After Effects',
      'Psychology-based pacing',
      'Trend-aware editing techniques'
    ],
    stats: [
      { icon: 'Clock', title: '24-Hour Turnaround', desc: 'Speed is currency. We deliver fast without sacrificing quality.', color: 'cyan' },
      { icon: 'ShieldCheck', title: '100% Satisfaction', desc: 'We don\'t stop until your vision is fully realized on the timeline.', color: 'magenta' },
      { icon: 'TrendingUp', title: 'Proven CTR Increase', desc: 'Our thumbnails are engineered to stop the scroll and get the click.', color: 'voltage' },
    ]
  },
  services: {
    titlePrefix: 'SYSTEM',
    titleHighlight: 'UPGRADES',
    subtitle: 'Choose the module that fits your content strategy. We scale with you.',
    items: [
      {
        id: 'editing',
        title: 'Video Editing',
        description: 'Professional cuts for any platform. We handle the technical side so you can focus on creating.',
        features: [
          'YouTube videos',
          'Vlogs & Travel edits',
          'Short-form content (Reels, Shorts, TikTok)',
          'Transitions & Effects',
          'Background music & Sound syncing',
          'Color grading',
          'Subtitles (Auto + Manual)'
        ],
        icon: 'Film',
        buttonText: 'Start Editing'
      },
      {
        id: 'thumbnails',
        title: 'YouTube Thumbnails',
        description: 'Stop the scroll with high-impact visuals designed to maximize your Click-Through Rate.',
        features: [
          'High-conversion designs',
          'Click-worthy styles',
          'Bright colors',
          'Clean typography',
          'Viral-style thumbnails'
        ],
        icon: 'Image',
        buttonText: 'Get Designed'
      },
      {
        id: 'packages',
        title: 'Social Media Video Packages',
        description: 'Consistent content scaling. Dominate the algorithm with a steady stream of high-quality uploads.',
        features: [
          'Monthly editing plan',
          'Weekly content creation',
          'Social branding bundle (thumbnails + edits)'
        ],
        icon: 'Package',
        buttonText: 'View Packages'
      }
    ]
  },
  pricing: {
    titlePrefix: 'CHOOSE YOUR',
    titleHighlight: 'POWER LEVEL',
    subtitle: 'Transparent pricing for every stage of your creator journey.',
    tiers: [
      // Video Editing Prices
      {
        category: 'Video Editing Prices',
        name: 'Basic Edit',
        price: 'Rs. 1200 – 2500',
        features: ['Simple Cuts & Trims', 'Basic Transitions', 'Color Correction', 'Background Music'],
        glowColor: 'cyan',
        buttonText: 'Order Now'
      },
      {
        category: 'Video Editing Prices',
        name: 'Standard Edit',
        price: 'Rs. 3000 – 5000',
        features: ['Advanced Transitions', 'Sound Design & SFX', 'Motion Graphics', 'Text Animations'],
        highlight: true,
        glowColor: 'magenta',
        buttonText: 'Order Now'
      },
      {
        category: 'Video Editing Prices',
        name: 'Premium Edit',
        price: 'Rs. 6000+',
        features: ['Complex VFX & Effects', 'Advanced Color Grading', 'Subtitles/Captions', '4K Export'],
        glowColor: 'voltage',
        buttonText: 'Order Now'
      },
      // Thumbnail Prices
      {
        category: 'Thumbnail Prices',
        name: 'Single Thumbnail',
        price: 'Rs. 300 – 600',
        features: ['High CTR Design', 'Face Retouching', 'Vibrant Colors', '1 Revision'],
        glowColor: 'cyan',
        buttonText: 'Get Thumbnail'
      },
      {
        category: 'Thumbnail Prices',
        name: '5 Thumbnails Pack',
        price: 'Rs. 1500 – 2500',
        features: ['Consistent Branding', 'Batch Delivery', 'Source Files', 'Priority Turnaround'],
        highlight: true,
        glowColor: 'magenta',
        buttonText: 'Get Pack'
      },
      // Monthly Editing Plans
      {
        category: 'Monthly Editing Plans',
        name: 'Starter Plan',
        price: 'Rs. 8000',
        features: ['8 Videos / Month', 'Basic Edits', 'Thumbnails Included', 'Dedicated Editor'],
        glowColor: 'cyan',
        buttonText: 'Subscribe'
      },
      {
        category: 'Monthly Editing Plans',
        name: 'Growth Plan',
        price: 'Rs. 12,000',
        features: ['12 Videos / Month', 'Standard Edits', 'Thumbnails Included', 'Social Snippets'],
        highlight: true,
        glowColor: 'magenta',
        buttonText: 'Subscribe'
      },
      {
        category: 'Monthly Editing Plans',
        name: 'Pro Creator Plan',
        price: 'Rs. 18,000',
        features: ['20 Videos / Month', 'Premium Edits', 'Thumbnails Included', 'Priority Support'],
        glowColor: 'voltage',
        buttonText: 'Subscribe'
      }
    ]
  },
  portfolio: {
    titlePrefix: 'VISUAL',
    titleHighlight: 'DATABASE',
    subtitle: 'A curated collection of our highest-performing edits.',
    items: [
      {
        id: '1',
        client: 'TechReviews',
        category: 'Long-Form',
        description: 'In-depth analysis of the latest gadgets with dynamic infographics and professional voice-overs.',
        imageUrl: 'https://picsum.photos/seed/tech/800/600',
        result: '200% Increase in Watch Time'
      },
      {
        id: '2',
        client: 'StreamKing',
        category: 'Gaming',
        description: 'High-energy kill montage with neon effects.',
        imageUrl: 'https://picsum.photos/seed/gaming/800/600',
        result: 'Viral on Twitter'
      },
      {
        id: '3',
        client: 'DailyVlog',
        category: 'Shorts',
        description: 'Vertical storytelling with dynamic captions.',
        imageUrl: 'https://picsum.photos/seed/vlog/800/600',
        result: '1M+ Shorts Views'
      },
      {
        id: '4',
        client: 'CryptoPulse',
        category: 'Corporate',
        description: 'Explainer video for a blockchain startup.',
        imageUrl: 'https://picsum.photos/seed/crypto/800/600',
        result: 'High Conversion'
      },
      {
        id: '5',
        client: 'SpeedRun',
        category: 'Gaming',
        description: 'Funny moments compilation with sound effects.',
        imageUrl: 'https://picsum.photos/seed/speed/800/600',
        result: 'Top Trending'
      },
      {
        id: '6',
        client: 'FitnessPro',
        category: 'Long-Form',
        description: 'Cinematic workout montage.',
        imageUrl: 'https://picsum.photos/seed/fitness/800/600',
        result: 'Brand Deal Secured'
      }
    ]
  },
  contact: {
    titlePrefix: 'INITIATE',
    titleHighlight: 'CONNECTION',
    subtitle: 'Ready to upgrade your channel? Fill out the data form to begin the sequence. Our team is standing by to analyze your request.',
    statusTitle: 'Status',
    statusLabel: 'Accepting New Clients:',
    statusValue: 'ONLINE',
    formLabels: {
      name: 'Operator Name',
      email: 'Email Frequency',
      service: 'Service Required',
      message: 'Message Specs'
    },
    buttonText: 'Transmit Message'
  },
  footer: {
    brandDesc: 'The architects of digital attention. We inject energy into raw footage to create futuristic masterpieces.',
    column1Title: 'System Links',
    column2Title: 'Modules',
    column3Title: 'Stay Connected',
    column3Text: 'Join the grid for updates.',
    newsletterPlaceholder: 'Enter email...',
    copyright: 'YOUTUBE EXPERT EDITORS. ALL RIGHTS RESERVED.',
    privacyText: 'PRIVACY_PROTOCOL',
    termsText: 'TERMS_OF_SERVICE'
  }
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (path: string, value: any) => void;
  addItem: (path: string, item: any) => void;
  deleteItem: (path: string, index: number) => void;
  resetContent: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('cybersync_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with default to ensure new fields are present if loaded from old state
        setContent(prev => ({ ...prev, ...parsed, 
          // Explicitly merge sub-objects if they might be missing new keys
          global: { ...prev.global, ...parsed.global },
          home: { ...prev.home, ...parsed.home },
          contact: { ...prev.contact, ...parsed.contact, formLabels: { ...prev.contact.formLabels, ...parsed.contact?.formLabels } },
          footer: { ...prev.footer, ...parsed.footer }
        }));
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cybersync_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (path: string, value: any) => {
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addItem = (path: string, item: any) => {
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const array = current[keys[keys.length - 1]];
      if (Array.isArray(array)) {
        array.push(item);
      }
      return newData;
    });
  };

  const deleteItem = (path: string, index: number) => {
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const array = current[keys[keys.length - 1]];
      if (Array.isArray(array)) {
        array.splice(index, 1);
      }
      return newData;
    });
  };

  const resetContent = () => {
    if (window.confirm("Are you sure you want to reset all content to default? This cannot be undone.")) {
      setContent(defaultContent);
    }
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <ContentContext.Provider value={{ content, updateContent, addItem, deleteItem, resetContent, isEditMode, toggleEditMode }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};