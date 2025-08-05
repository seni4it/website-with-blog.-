import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Eye, 
  Code, 
  Image as ImageIcon,
  Plus,
  Trash2,
  Calendar,
  Tag,
  User,
  Layout,
  Monitor,
  SplitSquareHorizontal,
  Settings
} from "lucide-react";
import { BlogPost } from "@/lib/markdown";
import { uploadImage } from "@/lib/blogPageContent";
import LiveBlogPreview from "./LiveBlogPreview";
import FullPagePreview from "./FullPagePreview";
import RealtimePreview from "./RealtimePreview";

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogPostEditor = ({ post, onSave, onCancel }: BlogPostEditorProps) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    id: post?.id || Date.now().toString(),
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || 'Dr. Shimon Roitman',
    category: post?.category || 'Clinical Techniques',
    date: post?.date || new Date().toISOString(),
    readingTime: post?.readingTime || 5,
    featuredImage: post?.featuredImage || '/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png',
    tags: post?.tags || [],
    slug: post?.slug || ''
  });

  const [newTag, setNewTag] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [splitView, setSplitView] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [previewOnRight, setPreviewOnRight] = useState(true);
  const [fullPagePreview, setFullPagePreview] = useState(true);

  const categories = [
    'Clinical Cases',
    'Clinical Techniques',
    'Technology',
    'Patient Education',
    'Practice Management'
  ];

  useEffect(() => {
    // Generate slug from title
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }

    // Estimate reading time (assuming 200 words per minute)
    if (formData.content) {
      const wordCount = formData.content.split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));
      setFormData(prev => ({ ...prev, readingTime }));
    }
  }, [formData.title, formData.content]);

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    // Generate excerpt if not provided
    if (!formData.excerpt && formData.content) {
      const excerpt = formData.content
        .replace(/[#*`]/g, '') // Remove markdown symbols
        .substring(0, 200)
        .trim() + '...';
      formData.excerpt = excerpt;
    }

    onSave(formData as BlogPost);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
        <h2 className="text-xl font-bold">
          {post ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant={splitView ? "default" : "outline"}
            onClick={() => setSplitView(!splitView)}
            size="sm"
          >
            <SplitSquareHorizontal className="h-4 w-4 mr-2" />
            Split View
          </Button>
          {splitView && (
            <>
              <Button
                variant="outline"
                onClick={() => setPreviewOnRight(!previewOnRight)}
                size="sm"
                title={`Move preview to ${previewOnRight ? 'left' : 'right'}`}
              >
                <Layout className="h-4 w-4 mr-2" />
                Preview {previewOnRight ? 'Right' : 'Left'}
              </Button>
              <Button
                variant={fullPagePreview ? "default" : "outline"}
                onClick={() => setFullPagePreview(!fullPagePreview)}
                size="sm"
              >
                <Monitor className="h-4 w-4 mr-2" />
                {fullPagePreview ? 'Full Page' : 'Content Only'}
              </Button>
            </>
          )}
          <Button
            variant={showSettings ? "default" : "outline"}
            onClick={() => setShowSettings(!showSettings)}
            size="sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {splitView ? (
          // Split View Layout
          <>
            {/* Editor Panel */}
            <div className={`w-1/2 flex flex-col ${previewOnRight ? 'border-r' : 'order-2 border-l'}`}>
              <div className="p-3 border-b bg-muted/30">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <Code className="h-4 w-4" />
                  Markdown Editor
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Quick Settings */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter post title"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="excerpt" className="text-sm font-medium">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Brief description (auto-generated if empty)"
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs font-medium">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-xs">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium">Author</Label>
                      <Input
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Markdown Editor */}
                <div className="flex-1">
                  <Label htmlFor="content" className="text-sm font-medium">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder={`Write your post content in Markdown...

Examples:
# Main Heading
## Sub Heading
**Bold text**
*Italic text*
- List item
- Another item

[Link text](https://example.com)
![Image alt](image-url)`}
                    className="font-mono text-sm mt-2 resize-none min-h-[400px]"
                  />
                </div>
                
                {/* Tags */}
                <div>
                  <Label className="text-sm font-medium">Tags</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      className="text-sm h-8"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag} size="sm" className="h-8">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs flex items-center gap-1">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-destructive"
                        >
                          <Trash2 className="h-2 w-2" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preview Panel */}
            <div className={`w-1/2 flex flex-col ${!previewOnRight ? 'order-1' : ''}`}>
              <div className="p-3 border-b bg-primary/5">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <Monitor className="h-4 w-4" />
                  Live Preview - {fullPagePreview ? 'Full Website' : 'Content Only'}
                </h3>
              </div>
              <div className="flex-1 overflow-hidden">
                {fullPagePreview ? (
                  <RealtimePreview post={formData as BlogPost} />
                ) : (
                  <div className="h-full overflow-y-auto">
                    <LiveBlogPreview post={formData as BlogPost} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          // Settings Panel (when not in split view)
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter post title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Brief description of the post (auto-generated if empty)"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content (Markdown) *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="Write your post content in Markdown..."
                        rows={15}
                        className="font-mono"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => handleInputChange('author', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange('category', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Featured Image */}
                    <div>
                      <Label>Featured Image</Label>
                      <div className="mt-2 space-y-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                        />
                        
                        {formData.featuredImage && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <img
                              src={formData.featuredImage}
                              alt="Featured image"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO & Metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="url-friendly-title"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        URL: /blog/{formData.slug}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="border-t bg-background/95 backdrop-blur p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formData.readingTime} min read
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {formData.tags?.length || 0} tags
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {formData.author}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onCancel} size="sm">
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              {post ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;