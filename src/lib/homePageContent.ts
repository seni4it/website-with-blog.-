export interface HomePageContent {
  id: string;
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  heroButtonText: string;
  heroButtonUrl: string;
  
  // About Section
  aboutTitle: string;
  aboutDescription: string;
  doctorImage: string;
  doctorName: string;
  doctorCredentials: string;
  
  // Features/Benefits
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  
  // Pricing
  originalPrice: string;
  currentPrice: string;
  discount: string;
  limitedTimeOffer: boolean;
  
  // Contact Information
  contactEmail: string;
  socialLinks: {
    instagram: string;
    telegram: string;
    linkedin?: string;
  };
  
  lastUpdated: string;
}

// Default home page content
export const defaultHomePageContent: HomePageContent = {
  id: 'home-page-content',
  
  // Hero Section
  heroTitle: 'Canal Localization Masterclass',
  heroSubtitle: 'Master Canal Localization with Dr. Roitman',
  heroDescription: 'Join over 2,000 dental professionals who have transformed their endodontic practice with proven techniques.',
  heroImage: 'https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg',
  heroButtonText: 'Register Now - Early Bird Special',
  heroButtonUrl: '#register',
  
  // About Section
  aboutTitle: 'About Dr. Roitman',
  aboutDescription: 'World-renowned endodontist with over 20 years of experience. Trained more than 10,000 dental professionals worldwide.',
  doctorImage: 'https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg',
  doctorName: 'Dr. Shimon Roitman',
  doctorCredentials: 'DDS, MS, Board Certified Endodontist',
  
  // Features
  features: [
    {
      id: '1',
      title: 'Advanced Microscope Techniques',
      description: 'Master the use of dental operating microscopes for precise canal location.',
      icon: 'microscope'
    },
    {
      id: '2', 
      title: 'Systematic Approach',
      description: 'Learn proven step-by-step protocols for consistent success.',
      icon: 'target'
    },
    {
      id: '3',
      title: 'Live Case Studies',
      description: 'Watch real procedures and learn from challenging cases.',
      icon: 'video'
    }
  ],
  
  // Pricing
  originalPrice: '€97',
  currentPrice: '€27',
  discount: '72% OFF',
  limitedTimeOffer: true,
  
  // Contact
  contactEmail: 'DRsroitman@gmail.com',
  socialLinks: {
    instagram: 'https://www.instagram.com/dr.roitman/',
    telegram: 'https://t.me/drroitman'
  },
  
  lastUpdated: new Date().toISOString()
};

// Get home page content
export const getHomePageContent = (): HomePageContent => {
  const stored = localStorage.getItem('homePageContent');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored home content:', error);
    }
  }
  return defaultHomePageContent;
};

// Save home page content
export const saveHomePageContent = (content: HomePageContent): void => {
  content.lastUpdated = new Date().toISOString();
  localStorage.setItem('homePageContent', JSON.stringify(content));
};