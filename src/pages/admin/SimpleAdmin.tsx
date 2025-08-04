import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus,
  X,
  Download,
  Upload,
  FileText,
  Copy
} from "lucide-react";
import { toast } from "sonner";
import articlesData from "@/data/articles.json";

const categories = [
  "Clinical Cases",
  "Clinical Techniques",
  "Technology",
  "Patient Education",
  "Practice Management"
];

const SimpleAdmin = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(articlesData.articles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: categories[0],
    tags: [] as string[],
    status: "draft" as "draft" | "published",
    featuredImage: "",
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

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags,
      status: article.status,
      featuredImage: article.featuredImage,
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
      readingTime: calculateReadingTime(formData.content)
    };

    let updatedArticles;
    if (editingId) {
      updatedArticles = articles.map(a => a.id === editingId ? newArticle : a);
    } else {
      updatedArticles = [...articles, newArticle];
    }

    setArticles(updatedArticles);
    toast.success(editingId ? 'Article updated!' : 'Article created!');
    
    // Reset form
    setEditingId(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: categories[0],
      tags: [],
      status: "draft",
      featuredImage: "",
      author: "Dr. Roitman"
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
      toast.success('Article deleted');
    }
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, currentTag] }));
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(t => t !== tag) 
    }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ articles }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'articles.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Data exported! Copy this file to src/data/articles.json');
  };

  const copyToClipboard = () => {
    const dataStr = JSON.stringify({ articles }, null, 2);
    navigator.clipboard.writeText(dataStr);
    toast.success('Data copied to clipboard! Paste it into src/data/articles.json');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/blog')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Blog Admin</h1>
                <p className="text-muted-foreground">Manage your articles</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Data
              </Button>
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Article List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Articles</CardTitle>
                <CardDescription>Click an article to edit or create a new one</CardDescription>
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
                      category: categories[0],
                      tags: [],
                      status: "draft",
                      featuredImage: "",
                      author: "Dr. Roitman"
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Button>
                
                {articles.map(article => (
                  <div key={article.id} className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1" onClick={() => handleEdit(article)}>
                        <h4 className="font-medium">{article.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{article.category}</span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(article.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Editor */}
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
                    placeholder="<h2>Introduction</h2>\n<p>Your content here...</p>"
                    rows={10}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use HTML tags: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
                  </p>
                </div>

                <div>
                  <Label htmlFor="image">Featured Image URL</Label>
                  <Input
                    id="image"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="/lovable-uploads/..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "draft" | "published") => setFormData(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button size="icon" onClick={addTag} type="button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="pr-1">
                        {tag}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-4 w-4 ml-1"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
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