export interface BlogPageContent {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  welcomeMessage: string;
  categories: string[];
  featuredPostIds: string[];
  lastUpdated: string;
}

// Default blog page content
export const defaultBlogPageContent: BlogPageContent = {
  id: 'blog-main-page',
  heroTitle: 'Clinical Blog',
  heroSubtitle: 'Advanced endodontic education and professional insights',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  welcomeMessage: 'Welcome to our comprehensive collection of endodontic knowledge and clinical insights.',
  categories: [
    'Clinical Cases',
    'Clinical Techniques',
    'Technology',
    'Patient Education',
    'Practice Management'
  ],
  featuredPostIds: ['1', '2', '3'],
  lastUpdated: new Date().toISOString()
};

// Get blog page content (in real app, this would fetch from CMS/database)
export const getBlogPageContent = (): BlogPageContent => {
  const stored = localStorage.getItem('blogPageContent');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored blog content:', error);
    }
  }
  return defaultBlogPageContent;
};

// Save blog page content
export const saveBlogPageContent = (content: BlogPageContent): void => {
  content.lastUpdated = new Date().toISOString();
  localStorage.setItem('blogPageContent', JSON.stringify(content));
};

// Image upload simulation (in real app, this would upload to cloud storage)
export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.readAsDataURL(file);
  });
};