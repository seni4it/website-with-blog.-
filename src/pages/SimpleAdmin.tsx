import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import articlesData from "@/data/articles.json";

const SimpleAdmin = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(articlesData.articles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Clinical Techniques",
    author: "Dr. Roitman"
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newArticle = {
      id: editingId || Date.now().toString(),
      ...formData,
      slug: generateSlug(formData.title),
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: Math.ceil(formData.content.split(' ').length / 200),
      tags: ["Endodontics"],
      status: "published",
      featuredImage: "/lovable-uploads/78edbdfc-906b-4b3f-b44f-5bcedbf2144c.png"
    };

    let updatedArticles;
    if (editingId) {
      updatedArticles = articles.map(a => a.id === editingId ? newArticle : a);
    } else {
      updatedArticles = [newArticle, ...articles];
    }

    setArticles(updatedArticles);
    toast.success(editingId ? 'Article updated!' : 'Article created!');
    
    setEditingId(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Clinical Techniques",
      author: "Dr. Roitman"
    });
  };

  const copyToClipboard = () => {
    const dataStr = JSON.stringify({ articles }, null, 2);
    navigator.clipboard.writeText(dataStr);
    toast.success('Data copied! Replace the content in src/data/articles.json with this data, then rebuild.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Blog Admin</h1>
                <p className="text-muted-foreground">Manage your articles</p>
              </div>
            </div>
            <Button onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Data
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Articles</CardTitle>
                <CardDescription>Click to edit or create new</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full mb-4" 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: "",
                      excerpt: "",
                      content: "",
                      category: "Clinical Techniques",
                      author: "Dr. Roitman"
                    });
                  }}
                >
                  New Article
                </Button>
                
                {articles.map(article => (
                  <div key={article.id} className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer" onClick={() => handleEdit(article)}>
                    <h4 className="font-medium">{article.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{article.category}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? 'Edit Article' : 'New Article'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Article title..."
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content (HTML)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="<h2>Introduction</h2><p>Your content here...</p>"
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? 'Update Article' : 'Create Article'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdmin;