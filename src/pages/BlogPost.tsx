import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Share2, Calendar, Tag } from "lucide-react";
import { getPostBySlug, getAllPosts, BlogPost, markdownToHtml } from "@/lib/markdown";
import Footer from "@/components/Footer";

const BlogPostComponent = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPreview, setIsPreview] = useState(false);

  // Check if this is a preview mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsPreview(urlParams.get('preview') === 'true');
  }, []);

  // Listen for preview updates
  useEffect(() => {
    // Check for admin preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminPreview = urlParams.get('preview') === 'admin';
    
    if (isAdminPreview) {
      // Get preview data from sessionStorage
      const adminData = sessionStorage.getItem('adminPreviewData');
      if (adminData) {
        try {
          const { pageType, content } = JSON.parse(adminData);
          if (pageType === 'blog-post') {
            // Convert markdown to HTML
            if (content.content) {
              content.htmlContent = markdownToHtml(content.content);
            }
            setArticle(content);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error parsing admin preview data:', error);
        }
      }
    }
    
    if (!isPreview) return;

    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from same origin
      if (event.origin !== window.location.origin) return;
      
      if (event.data?.type === 'UPDATE_PREVIEW' && event.data?.post) {
        setArticle(event.data.post);
        setLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isPreview]);

  useEffect(() => {
    const fetchArticle = async () => {
      // Skip fetching if in preview mode - wait for message instead
      if (isPreview) {
        // Set a timeout to show loading state if no message received
        setTimeout(() => {
          if (loading) {
            setLoading(false);
          }
        }, 1000);
        return;
      }
      
      // Check if this is a preview with data passed from the editor
      if ((window as any).__PREVIEW_POST__) {
        const previewPost = (window as any).__PREVIEW_POST__ as BlogPost;
        setArticle(previewPost);
        
        // Convert markdown to HTML for preview
        if (previewPost.content) {
          previewPost.htmlContent = markdownToHtml(previewPost.content);
        }
        
        setLoading(false);
        return;
      }
      
      if (!slug) return;
      
      setLoading(true);
      try {
        const fetchedArticle = await getPostBySlug(slug);
        setArticle(fetchedArticle);
        
        if (fetchedArticle) {
          // Get related articles
          const allArticles = await getAllPosts();
          const related = allArticles
            .filter(a => 
              a.category === fetchedArticle.category && 
              a.id !== fetchedArticle.id
            )
            .slice(0, 3);
          setRelatedArticles(related);
          
          // Convert markdown to HTML
          if (fetchedArticle.content) {
            fetchedArticle.htmlContent = markdownToHtml(fetchedArticle.content);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, isPreview]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="relative h-96 overflow-hidden">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(article.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {article.readingTime} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: article.htmlContent || article.content }}
                  className="space-y-6"
                />
              </CardContent>
            </Card>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4" />
                <span className="font-medium">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags && article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/20 text-primary/80 hover:bg-primary/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <span className="font-medium">Share this article:</span>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Bio */}
            <Card className="mb-6 bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{article.author}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Endodontic Specialist
                  </p>
                  <p className="text-sm">Expert in advanced root canal techniques and complex endodontic procedures.</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <div key={related.id} className="group">
                        <Link to={`/blog/${related.slug}`} className="block">
                          <div className="flex gap-3">
                            <img
                              src={related.featuredImage}
                              alt={related.title}
                              className="w-16 h-16 rounded object-cover flex-shrink-0"
                            />
                            <div>
                              <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors text-sm">
                                {related.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {related.readingTime} min read
                              </p>
                            </div>
                          </div>
                        </Link>
                        {relatedArticles.indexOf(related) < relatedArticles.length - 1 && (
                          <div className="border-t mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPostComponent;