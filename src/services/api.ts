const API_BASE_URL = 'http://localhost:1337/api';

export interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    category: string;
    tags: string[];
    author: string;
    readingTime: number;
    status: 'draft' | 'published';
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ArticlesResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleArticleResponse {
  data: Article;
  meta: {};
}

export const articlesApi = {
  // Get all published articles
  async getPublishedArticles(): Promise<Article[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles?publicationState=live&populate=featuredImage&sort=publishedAt:desc`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ArticlesResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Fallback to JSON data if API is not available
      const fallbackData = await import('../data/articles.json');
      return fallbackData.articles
        .filter(article => article.status === 'published')
        .map((article, index) => ({
          id: article.id,
          attributes: {
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: article.content,
            featuredImage: {
              data: {
                attributes: {
                  url: article.featuredImage,
                  alternativeText: article.title
                }
              }
            },
            category: article.category,
            tags: article.tags || [],
            author: article.author,
            readingTime: article.readingTime,
            status: article.status as 'published',
            publishedAt: article.publishedAt,
            createdAt: article.publishedAt,
            updatedAt: article.publishedAt
          }
        }));
    }
  },

  // Get single article by slug
  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles?publicationState=live&populate=featuredImage&filters[slug][$eq]=${slug}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ArticlesResponse = await response.json();
      return data.data[0] || null;
    } catch (error) {
      console.error('Error fetching article:', error);
      // Fallback to JSON data if API is not available
      const fallbackData = await import('../data/articles.json');
      const article = fallbackData.articles.find(a => a.slug === slug && a.status === 'published');
      
      if (!article) return null;
      
      return {
        id: article.id,
        attributes: {
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          featuredImage: {
            data: {
              attributes: {
                url: article.featuredImage,
                alternativeText: article.title
              }
            }
          },
          category: article.category,
          tags: article.tags || [],
          author: article.author,
          readingTime: article.readingTime,
          status: article.status as 'published',
          publishedAt: article.publishedAt,
          createdAt: article.publishedAt,
          updatedAt: article.publishedAt
        }
      };
    }
  }
};

// Helper function to get image URL
export const getImageUrl = (imageData?: Article['attributes']['featuredImage']): string => {
  if (imageData?.data?.attributes?.url) {
    const url = imageData.data.attributes.url;
    // If URL starts with /, prepend the API base URL
    if (url.startsWith('/')) {
      return `http://localhost:1337${url}`;
    }
    return url;
  }
  return '/placeholder.svg';
};