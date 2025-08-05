import { BlogPost } from "@/lib/markdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar, Tag } from "lucide-react";

interface LiveBlogPreviewProps {
  post: BlogPost;
}

const LiveBlogPreview = ({ post }: LiveBlogPreviewProps) => {
  // Simple markdown to HTML conversion for preview
  const renderMarkdownPreview = (content: string) => {
    if (!content) return '<p>Start writing to see preview...</p>';
    
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 text-foreground">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3 text-foreground">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2 text-foreground">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br/>')
      .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Blog Post Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.featuredImage || '/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png'}
          alt={post.title || 'Blog post'}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {post.category || 'Uncategorized'}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {post.title || 'Untitled Post'}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author || 'Author'}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date ? new Date(post.date).toLocaleDateString() : 'Today'}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readingTime || 5} min read
              </div>
            </div>
            
            {post.excerpt && (
              <p className="text-lg text-muted-foreground max-w-2xl">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: renderMarkdownPreview(post.content || '') 
                  }}
                  className="space-y-6 text-foreground"
                />
              </CardContent>
            </Card>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/20 text-primary/80 hover:bg-primary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
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
                  <h3 className="font-semibold mb-2">{post.author || 'Author'}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Endodontic Specialist
                  </p>
                  <p className="text-sm">Expert in advanced root canal techniques and complex endodontic procedures.</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Post Stats */}
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <h3 className="font-semibold">Post Statistics</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reading Time:</span>
                  <span className="font-medium">{post.readingTime || 5} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Word Count:</span>
                  <span className="font-medium">{post.content ? post.content.split(/\s+/).length : 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{post.category || 'None'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tags:</span>
                  <span className="font-medium">{post.tags?.length || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBlogPreview;