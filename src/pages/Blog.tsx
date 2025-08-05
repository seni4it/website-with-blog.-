import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, User, ArrowLeft, Menu, X, Settings, Plus, Filter, Trash2 } from "lucide-react";
import { getAllPosts, BlogPost } from "@/lib/markdown";
import BlogCalendar from "@/components/BlogCalendar";
import Footer from "@/components/Footer";
import { getBlogPageContent, BlogPageContent } from "@/lib/blogPageContent";

const categories = [
  "All Articles",
  "Clinical Cases",
  "Clinical Techniques", 
  "Technology",
  "Patient Education",
  "Practice Management"
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [managedCategories, setManagedCategories] = useState([
    "Clinical Cases",
    "Clinical Techniques", 
    "Technology",
    "Patient Education",
    "Practice Management"
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [blogPageContent, setBlogPageContent] = useState<BlogPageContent | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const posts = await getAllPosts();
        setArticles(posts);
        setFilteredArticles(posts);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    
    // Load blog page content
    const pageContent = getBlogPageContent();
    setBlogPageContent(pageContent);
  }, []);
  
  // Listen for admin updates
  useEffect(() => {
    // Check URL params for admin preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminPreview = urlParams.get('preview') === 'admin';
    
    if (isAdminPreview) {
      // Get preview data from sessionStorage
      const adminData = sessionStorage.getItem('adminPreviewData');
      if (adminData) {
        try {
          const { pageType, content } = JSON.parse(adminData);
          if (pageType === 'blog-main') {
            setBlogPageContent(content);
          }
        } catch (error) {
          console.error('Error parsing admin preview data:', error);
        }
      }
    }
    
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data?.type === 'ADMIN_UPDATE' && event.data?.pageType === 'blog-main') {
        setBlogPageContent(event.data.content);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    let filtered = [...articles];
    
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    if (selectedCategory !== "All Articles") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, articles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-gradient-to-br from-primary via-primary/90 to-accent"
          style={{
            backgroundImage: blogPageContent?.heroBackgroundImage 
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${blogPageContent.heroBackgroundImage})`
              : undefined
          }}
        />
        <div className="relative container max-w-6xl mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              {blogPageContent?.heroTitle || 'Clinical Blog'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {blogPageContent?.heroSubtitle || 'Advanced endodontic education and professional insights'}
            </p>
            {blogPageContent?.welcomeMessage && (
              <p className="text-sm opacity-75 mt-4 max-w-xl mx-auto">
                {blogPageContent.welcomeMessage}
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Navigation Bar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Categories Menu */}
          <div className="w-64 flex-shrink-0">
            <Card className="sticky top-8">
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Categories
                </h2>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("All Articles")}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedCategory === "All Articles"
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    All Articles
                  </button>
                  {managedCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">{articles.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Filtered:</span>
                      <span className="font-medium">{filteredArticles.length}</span>
                    </div>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          </div>

          {/* Center Content - Articles */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Loading articles...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 overflow-hidden border-0 bg-white/50 backdrop-blur-sm">
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        style={{ maxWidth: '100%', height: 'auto' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20">
                          {article.category}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{article.readingTime} min read</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        <Link to={`/blog/${article.slug}`} className="hover:underline">
                          {article.title}
                        </Link>
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span className="font-medium">{article.author}</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {article.tags && article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-primary/20 text-primary/80 hover:bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Calendar */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-8">
              <BlogCalendar articles={articles} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
    </div>
  );
};

export default Blog;