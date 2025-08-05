import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Save, 
  Trash2, 
  Calendar,
  Clock,
  Tag,
  User,
  FileText,
  Eye,
  Monitor,
  Search,
  ChevronDown,
  ChevronRight,
  Home,
  BookOpen,
  Mail,
  Info,
  Settings,
  Image as ImageIcon,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  GripVertical,
  Upload,
  Globe, 
  Zap,
  Undo,
  Redo,
  X
} from "lucide-react";
import { BlogPost, getAllPosts, getPostBySlug } from "@/lib/markdown";
import { uploadImage, getBlogPageContent, saveBlogPageContent, BlogPageContent } from "@/lib/blogPageContent";
import { getHomePageContent, saveHomePageContent } from "@/lib/homePageContent";
import { publishWebsite, discardChanges, ContentManager } from "@/lib/githubIntegration";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Page types
type PageType = 'home' | 'blog-main' | 'blog-post' | 'about' | 'contact';

interface Page {
  id: string;
  title: string;
  type: PageType;
  path: string;
  content?: any;
  children?: Page[];
}

const ImprovedUniversalAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['blog']));
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();
  
  // Column widths and visibility
  const [leftWidth, setLeftWidth] = useState(() => {
    const saved = localStorage.getItem('adminLeftWidth');
    return saved ? parseInt(saved) : 320;
  });
  const [middleWidth, setMiddleWidth] = useState(() => {
    const saved = localStorage.getItem('adminMiddleWidth');
    return saved ? parseInt(saved) : 500;
  });
  const [rightWidth, setRightWidth] = useState(() => {
    const saved = localStorage.getItem('adminRightWidth');
    return saved ? parseInt(saved) : 400;
  });
  const [showLeftPanel, setShowLeftPanel] = useState(() => {
    const saved = localStorage.getItem('adminShowLeftPanel');
    return saved ? JSON.parse(saved) : true;
  });
  const [showRightPanel, setShowRightPanel] = useState(() => {
    const saved = localStorage.getItem('adminShowRightPanel');
    return saved ? JSON.parse(saved) : true;
  });
  const [isResizing, setIsResizing] = useState<'left' | 'middle' | 'right' | null>(null);
  
  // Form states for different page types
  const [blogPageContent, setBlogPageContent] = useState<BlogPageContent>(getBlogPageContent());
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [homePageData, setHomePageData] = useState<any>(null);
  const [newTag, setNewTag] = useState('');
  
  // Preview update key to force iframe refresh
  const [previewKey, setPreviewKey] = useState(0);
  
  // Content management for undo/redo
  const [contentManager] = useState(() => ContentManager.getInstance());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const categories = [
    'Clinical Cases',
    'Clinical Techniques',
    'Technology',
    'Patient Education',
    'Practice Management'
  ];

  // Save column preferences
  useEffect(() => {
    localStorage.setItem('adminLeftWidth', leftWidth.toString());
  }, [leftWidth]);

  useEffect(() => {
    localStorage.setItem('adminMiddleWidth', middleWidth.toString());
  }, [middleWidth]);

  useEffect(() => {
    localStorage.setItem('adminRightWidth', rightWidth.toString());
  }, [rightWidth]);

  useEffect(() => {
    localStorage.setItem('adminShowLeftPanel', JSON.stringify(showLeftPanel));
  }, [showLeftPanel]);

  useEffect(() => {
    localStorage.setItem('adminShowRightPanel', JSON.stringify(showRightPanel));
  }, [showRightPanel]);

  // Mouse resize handlers
  const handleMouseDown = (panel: 'left' | 'middle' | 'right') => (e: React.MouseEvent) => {
    // Only handle left mouse button (button 0)
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    console.log(`Starting resize for ${panel} panel at position:`, e.clientX, 'button:', e.button);
    setIsResizing(panel);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      // Only resize if the left mouse button is still pressed
      if (e.buttons !== 1) {
        console.log('Mouse button released during move, stopping resize');
        setIsResizing(null);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        return;
      }

      console.log(`Resizing ${isResizing} panel, mouse at:`, e.clientX);

      if (isResizing === 'left') {
        const newWidth = Math.max(200, Math.min(600, e.clientX));
        setLeftWidth(newWidth);
      } else if (isResizing === 'middle') {
        // Calculate middle width and adjust right width accordingly
        const leftPanelWidth = showLeftPanel ? leftWidth + 8 : 0; // +8 for left resize handle
        const totalAvailableWidth = window.innerWidth - leftPanelWidth - 8; // -8 for middle handle
        const mouseRelativeToMiddleStart = e.clientX - leftPanelWidth;
        
        // Constrain middle width (min 300px, max leaves 300px for right)
        const maxMiddleWidth = totalAvailableWidth - 300;
        const newMiddleWidth = Math.max(300, Math.min(maxMiddleWidth, mouseRelativeToMiddleStart));
        const newRightWidth = totalAvailableWidth - newMiddleWidth;
        
        setMiddleWidth(newMiddleWidth);
        setRightWidth(newRightWidth);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      console.log('Mouse button released, ending resize');
      setIsResizing(null);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    // Always add event listeners to detect mouse up anywhere on the page
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Also listen for mouse leave to stop resizing if cursor leaves window
    const handleMouseLeave = () => {
      if (isResizing) {
        console.log('Mouse left window, ending resize');
        setIsResizing(null);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isResizing, leftWidth, showLeftPanel]);

  // Site structure
  const [siteStructure, setSiteStructure] = useState<Page[]>([
    {
      id: 'home',
      title: 'Home Page',
      type: 'home',
      path: '/'
    },
    {
      id: 'blog',
      title: 'Blog',
      type: 'blog-main',
      path: '/blog',
      children: []
    },
    {
      id: 'about',
      title: 'About',
      type: 'about',
      path: '/about'
    },
    {
      id: 'contact',
      title: 'Contact',
      type: 'contact',
      path: '/contact'
    }
  ]);

  // Load data
  useEffect(() => {
    loadAllData();
    updateUndoRedoState();
  }, []);

  // Debounced snapshot saving - captures changes after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (blogPageContent && Object.keys(blogPageContent).length > 0) {
        saveContentSnapshot(`Blog content changed`);
      }
    }, 1000); // Save 1 second after user stops typing

    return () => clearTimeout(timer);
  }, [blogPageContent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (homePageData && Object.keys(homePageData).length > 0) {
        saveContentSnapshot(`Home page changed`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [homePageData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPost && Object.keys(currentPost).length > 0) {
        saveContentSnapshot(`Blog post edited: ${currentPost.title || 'Untitled'}`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPost]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (posts.length > 0) {
        saveContentSnapshot(`Posts updated`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [posts]);

  const loadAllData = async () => {
    try {
      // Load blog posts
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      
      // Update site structure with blog posts
      setSiteStructure(prev => {
        const newStructure = [...prev];
        const blogSection = newStructure.find(s => s.id === 'blog');
        if (blogSection) {
          blogSection.children = [
            // Add Blog Main Page as first child
            {
              id: 'blog-main-page',
              title: 'Blog Main Page',
              type: 'blog-main' as PageType,
              path: '/blog'
            },
            // Then add all blog posts
            ...allPosts.map(post => ({
              id: `post-${post.id}`,
              title: post.title,
              type: 'blog-post' as PageType,
              path: `/blog/${post.slug}`,
              content: post
            }))
          ];
        }
        return newStructure;
      });
      
      // Load home page content
      const homeContent = getHomePageContent();
      setHomePageData(homeContent);
      
      // Auto-select first page
      selectPage(siteStructure[0]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load site data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter pages based on search
  const filteredStructure = useMemo(() => {
    if (!searchQuery) return siteStructure;
    
    const query = searchQuery.toLowerCase();
    
    const filterPages = (pages: Page[]): Page[] => {
      return pages.reduce((acc: Page[], page) => {
        const matchesTitle = page.title.toLowerCase().includes(query);
        const matchesContent = page.content && 
          JSON.stringify(page.content).toLowerCase().includes(query);
        
        if (matchesTitle || matchesContent) {
          acc.push({
            ...page,
            children: page.children ? filterPages(page.children) : undefined
          });
        } else if (page.children) {
          const filteredChildren = filterPages(page.children);
          if (filteredChildren.length > 0) {
            acc.push({
              ...page,
              children: filteredChildren
            });
          }
        }
        
        return acc;
      }, []);
    };
    
    return filterPages(siteStructure);
  }, [searchQuery, siteStructure]);

  const selectPage = async (page: Page) => {
    setSelectedPage(page);
    
    // Load content based on page type
    switch (page.type) {
      case 'blog-main':
        const currentBlogContent = getBlogPageContent();
        setBlogPageContent(currentBlogContent);
        break;
      case 'blog-post':
        if (page.content) {
          setCurrentPost(page.content);
        }
        break;
      case 'home':
        const currentHomeContent = getHomePageContent();
        setHomePageData(currentHomeContent);
        break;
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      
      // Update the appropriate field based on current page
      if (selectedPage?.type === 'blog-main') {
        setBlogPageContent(prev => {
          const updated = { ...prev, [field]: imageUrl };
          // Force preview update by incrementing key
          setPreviewKey(prevKey => prevKey + 1);
          return updated;
        });
      } else if (selectedPage?.type === 'blog-post') {
        setCurrentPost(prev => {
          const updated = { ...prev, [field]: imageUrl };
          // Force preview update by incrementing key
          setPreviewKey(prevKey => prevKey + 1);
          return updated;
        });
      }
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      switch (selectedPage?.type) {
        case 'blog-main':
          saveBlogPageContent(blogPageContent);
          break;
        case 'blog-post':
          // Save blog post logic
          const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
          const existingIndex = savedPosts.findIndex((p: BlogPost) => p.id === currentPost.id);
          
          if (existingIndex >= 0) {
            savedPosts[existingIndex] = currentPost;
          } else {
            savedPosts.push(currentPost);
          }
          
          localStorage.setItem('blogPosts', JSON.stringify(savedPosts));
          break;
        case 'home':
          saveHomePageContent(homePageData);
          break;
      }
      
      toast({
        title: "Success",
        description: "Page saved successfully"
      });
      
      // Force preview update
      setPreviewKey(prev => prev + 1);
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Update undo/redo state
  const updateUndoRedoState = () => {
    setCanUndo(contentManager.canUndo());
    setCanRedo(contentManager.canRedo());
  };

  // Save content snapshot for undo/redo
  const saveContentSnapshot = (description: string) => {
    contentManager.saveSnapshot(
      description,
      blogPageContent,
      homePageData,
      posts
    );
    updateUndoRedoState();
  };

  const handlePublish = async () => {
    // Save current state before publishing
    saveContentSnapshot(`Published website - ${new Date().toLocaleString()}`);
    
    const result = await publishWebsite();
    toast({
      title: result.success ? "Ready to Publish!" : "Error",
      description: result.message,
      variant: result.success ? "default" : "destructive"
    });
  };

  const handleDiscard = async () => {
    const result = await discardChanges();
    
    if (result.success && (result as any).snapshot) {
      const snapshot = (result as any).snapshot;
      // Restore ALL content from snapshot
      setBlogPageContent(snapshot.blogContent);
      setHomePageData(snapshot.homeContent);
      setPosts(snapshot.posts);
      
      // Also restore currentPost if we're editing a blog post
      if (selectedPage?.type === 'blog-post' && selectedPage.content) {
        const restoredPost = snapshot.posts.find((p: any) => p.id === selectedPage.content.id);
        if (restoredPost) {
          setCurrentPost(restoredPost);
        }
      }
      
      // Force preview update
      setPreviewKey(prev => prev + 1);
    }
    
    updateUndoRedoState();
    
    toast({
      title: result.success ? "Changes Discarded" : "Cannot Discard",
      description: result.message,
      variant: result.success ? "default" : "destructive"
    });
  };

  const handleUndo = () => {
    const snapshot = contentManager.undo();
    if (snapshot) {
      setBlogPageContent(snapshot.blogContent);
      setHomePageData(snapshot.homeContent);
      setPosts(snapshot.posts);
      
      // Also restore currentPost if we're editing a blog post
      if (selectedPage?.type === 'blog-post' && selectedPage.content) {
        const restoredPost = snapshot.posts.find((p: any) => p.id === selectedPage.content.id);
        if (restoredPost) {
          setCurrentPost(restoredPost);
        }
      }
      
      setPreviewKey(prev => prev + 1);
      
      toast({
        title: "Undo",
        description: `Reverted: ${snapshot.description}`
      });
    }
    updateUndoRedoState();
  };

  const handleRedo = () => {
    const snapshot = contentManager.redo();
    if (snapshot) {
      setBlogPageContent(snapshot.blogContent);
      setHomePageData(snapshot.homeContent);
      setPosts(snapshot.posts);
      
      // Also restore currentPost if we're editing a blog post
      if (selectedPage?.type === 'blog-post' && selectedPage.content) {
        const restoredPost = snapshot.posts.find((p: any) => p.id === selectedPage.content.id);
        if (restoredPost) {
          setCurrentPost(restoredPost);
        }
      }
      
      setPreviewKey(prev => prev + 1);
      
      toast({
        title: "Redo",
        description: `Restored: ${snapshot.description}`
      });
    }
    updateUndoRedoState();
  };

  // Real-time preview component with direct iframe updates
  const RealtimePreview = () => {
    const [iframeKey, setIframeKey] = useState(0);
    const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);
    const [currentIframeUrl, setCurrentIframeUrl] = useState<string>('');
    
    // Monitor iframe URL changes with polling
    useEffect(() => {
      if (!iframeRef) return;

      const checkIframeUrl = () => {
        try {
          // Try to access iframe location
          const iframeWindow = iframeRef.contentWindow;
          if (iframeWindow && iframeWindow.location) {
            const currentUrl = iframeWindow.location.href;
            
            if (currentUrl !== currentIframeUrl) {
              console.log('Iframe URL changed to:', currentUrl);
              setCurrentIframeUrl(currentUrl);
              
              // Extract path from URL
              const url = new URL(currentUrl);
              const hash = url.hash.replace('#', '');
              const path = hash.split('?')[0] || '/';
              
              console.log('Extracted path:', path);
              
              // Find matching page
              const findPageByPath = (pages: Page[], targetPath: string): Page | null => {
                for (const page of pages) {
                  if (page.path === targetPath) {
                    return page;
                  }
                  if (page.children) {
                    const found = findPageByPath(page.children, targetPath);
                    if (found) return found;
                  }
                }
                return null;
              };

              const matchingPage = findPageByPath(siteStructure, path);
              
              if (matchingPage && matchingPage.id !== selectedPage?.id) {
                console.log('Auto-selecting page:', matchingPage.title);
                selectPage(matchingPage);
                
                // Auto-expand blog section for blog posts
                if (path.startsWith('/blog/') && path !== '/blog') {
                  setExpandedSections(prev => new Set([...prev, 'blog']));
                }
              }
            }
          }
        } catch (error) {
          // Cross-origin errors are expected when iframe navigates to different origin
          // For same-origin navigation, this should work
          console.log('URL check failed (might be cross-origin):', error.message);
        }
      };

      // Check after a short delay to avoid conflicts
      const timeout = setTimeout(checkIframeUrl, 1000);
      
      // Then check every 2 seconds (less frequent to avoid UI conflicts)
      const interval = setInterval(checkIframeUrl, 2000);
      
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }, [iframeRef, currentIframeUrl, siteStructure, selectedPage]);
    
    // Force iframe refresh whenever content changes
    useEffect(() => {
      // Store current content in sessionStorage for the iframe to read
      const content = selectedPage?.type === 'blog-main' ? blogPageContent :
                     selectedPage?.type === 'blog-post' ? currentPost :
                     selectedPage?.type === 'home' ? homePageData : null;
      
      if (content && selectedPage) {
        sessionStorage.setItem('adminPreviewData', JSON.stringify({
          pageType: selectedPage.type,
          content: content,
          timestamp: Date.now()
        }));
        
        // Force iframe reload
        setIframeKey(prev => prev + 1);
      }
    }, [blogPageContent, currentPost, homePageData, selectedPage]);
    
    const iframeSrc = selectedPage?.path ? `/#${selectedPage.path}?preview=admin&t=${Date.now()}` : '/';
    
    return (
      <iframe
        key={iframeKey}
        ref={setIframeRef}
        src={iframeSrc}
        className="w-full h-full border-0"
        title="Live Preview"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Universal Admin Panel</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('Toggling left panel from', showLeftPanel, 'to', !showLeftPanel);
                  setShowLeftPanel(!showLeftPanel);
                }}
                title={showLeftPanel ? "Hide left panel" : "Show left panel"}
              >
                {showLeftPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('Toggling right panel from', showRightPanel, 'to', !showRightPanel);
                  setShowRightPanel(!showRightPanel);
                }}
                title={showRightPanel ? "Hide right panel" : "Show right panel"}
              >
                {showRightPanel ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Undo/Redo buttons */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUndo}
                disabled={!canUndo}
                title="Undo last change"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRedo}
                disabled={!canRedo}
                title="Redo last change"
              >
                <Redo className="h-4 w-4" />
              </Button>
              
              {/* Main action buttons */}
              <div className="border-l pl-2 ml-2 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDiscard}
                  title="Discard changes (undo to last saved version)"
                >
                  <X className="h-4 w-4 mr-1" />
                  Not Publish
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handlePublish}
                  title="Publish website (remove admin + push to Git)"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Publish
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Monitor className="h-4 w-4" />
              Edit All Pages - Real-time Preview
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Page Tree & Search */}
        {showLeftPanel && (
          <>
            <div 
              className="border-r flex flex-col bg-muted/30 relative"
              style={{ width: `${leftWidth}px` }}
            >
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search pages by content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Page Tree */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              {filteredStructure.map((page) => (
                <div key={page.id} className="mb-2">
                  <div
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-accent transition-colors ${
                      selectedPage?.id === page.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => page.children ? toggleSection(page.id) : selectPage(page)}
                  >
                    {page.children && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(page.id);
                        }}
                      >
                        {expandedSections.has(page.id) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </button>
                    )}
                    
                    {page.type === 'home' && <Home className="h-4 w-4" />}
                    {page.type === 'blog-main' && <BookOpen className="h-4 w-4" />}
                    {page.type === 'blog-post' && <FileText className="h-4 w-4" />}
                    {page.type === 'about' && <Info className="h-4 w-4" />}
                    {page.type === 'contact' && <Mail className="h-4 w-4" />}
                    
                    <span className="text-sm font-medium">{page.title}</span>
                  </div>
                  
                  {page.children && expandedSections.has(page.id) && (
                    <div className="ml-6 mt-1">
                      {page.children.map((child) => (
                        <div
                          key={child.id}
                          className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-accent transition-colors ${
                            selectedPage?.id === child.id ? 'bg-accent' : ''
                          }`}
                          onClick={() => selectPage(child)}
                        >
                          <FileText className="h-3 w-3" />
                          <span className="text-sm">{child.title}</span>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start mt-2"
                        onClick={() => {
                          // Handle new blog post
                          const newPost = {
                            id: `post-new-${Date.now()}`,
                            title: 'New Post',
                            type: 'blog-post' as PageType,
                            path: '/blog/new',
                            content: {
                              id: Date.now().toString(),
                              title: '',
                              excerpt: '',
                              content: '',
                              author: 'Dr. Shimon Roitman',
                              category: 'Clinical Techniques',
                              date: new Date().toISOString(),
                              readingTime: 5,
                              featuredImage: '/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png',
                              tags: [],
                              slug: ''
                            }
                          };
                          selectPage(newPost);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        New Post
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Left Resize Handle */}
        <div
          className="w-3 bg-border hover:bg-primary/30 cursor-col-resize flex items-center justify-center transition-colors relative z-10"
          onMouseDown={handleMouseDown('left')}
          title="Drag to resize left panel"
          style={{ minHeight: '100%' }}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground hover:text-primary" />
        </div>
        </>
        )}

        {/* Middle Panel - Editor */}
        <div 
          className="flex flex-col border-r"
          style={{ width: `${middleWidth}px` }}
        >
          <div className="p-3 border-b bg-muted/30">
            <h2 className="font-semibold text-sm">
              {selectedPage ? `Editing: ${selectedPage.title}` : 'Select a page to edit'}
            </h2>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Blog Main Page Editor */}
              {selectedPage?.type === 'blog-main' && (
                <>
                  <div>
                    <Label>Hero Title</Label>
                    <Input
                      value={blogPageContent.heroTitle}
                      onChange={(e) => setBlogPageContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                      placeholder="Enter hero title"
                    />
                  </div>
                  
                  <div>
                    <Label>Hero Subtitle</Label>
                    <Textarea
                      value={blogPageContent.heroSubtitle}
                      onChange={(e) => setBlogPageContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                      placeholder="Enter hero subtitle"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label>Welcome Message</Label>
                    <Textarea
                      value={blogPageContent.welcomeMessage}
                      onChange={(e) => setBlogPageContent(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                      placeholder="Enter welcome message"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label>Hero Background Image</Label>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'heroBackgroundImage')}
                        disabled={uploadingImage}
                      />
                      {blogPageContent.heroBackgroundImage && (
                        <img
                          src={blogPageContent.heroBackgroundImage}
                          alt="Hero background"
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Categories</Label>
                    <div className="space-y-2">
                      {blogPageContent.categories.map((cat, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={cat}
                            onChange={(e) => {
                              const newCategories = [...blogPageContent.categories];
                              newCategories[index] = e.target.value;
                              setBlogPageContent(prev => ({ ...prev, categories: newCategories }));
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newCategories = blogPageContent.categories.filter((_, i) => i !== index);
                              setBlogPageContent(prev => ({ ...prev, categories: newCategories }));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setBlogPageContent(prev => ({ 
                            ...prev, 
                            categories: [...prev.categories, 'New Category'] 
                          }));
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Category
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              {/* Blog Post Editor */}
              {selectedPage?.type === 'blog-post' && (
                <>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={currentPost.title || ''}
                      onChange={(e) => setCurrentPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter post title"
                    />
                  </div>
                  
                  <div>
                    <Label>Excerpt</Label>
                    <Textarea
                      value={currentPost.excerpt || ''}
                      onChange={(e) => setCurrentPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={currentPost.category}
                        onValueChange={(value) => setCurrentPost(prev => ({ ...prev, category: value }))}
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
                    
                    <div>
                      <Label>Author</Label>
                      <Input
                        value={currentPost.author || ''}
                        onChange={(e) => setCurrentPost(prev => ({ ...prev, author: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Featured Image</Label>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'featuredImage')}
                        disabled={uploadingImage}
                      />
                      {currentPost.featuredImage && (
                        <img
                          src={currentPost.featuredImage}
                          alt="Featured"
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Content (Markdown)</Label>
                    <Textarea
                      value={currentPost.content || ''}
                      onChange={(e) => setCurrentPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your post content in Markdown..."
                      rows={15}
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (newTag.trim()) {
                              setCurrentPost(prev => ({
                                ...prev,
                                tags: [...(prev.tags || []), newTag.trim()]
                              }));
                              setNewTag('');
                            }
                          }
                        }}
                      />
                      <Button 
                        onClick={() => {
                          if (newTag.trim()) {
                            setCurrentPost(prev => ({
                              ...prev,
                              tags: [...(prev.tags || []), newTag.trim()]
                            }));
                            setNewTag('');
                          }
                        }} 
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentPost.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                          <button
                            onClick={() => {
                              setCurrentPost(prev => ({
                                ...prev,
                                tags: prev.tags?.filter((_, i) => i !== index)
                              }));
                            }}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {/* Home Page Editor */}
              {selectedPage?.type === 'home' && homePageData && (
                <div className="space-y-4">
                  <div>
                    <Label>Hero Title</Label>
                    <Input
                      value={homePageData.heroTitle || ''}
                      onChange={(e) => setHomePageData((prev: any) => ({ ...prev, heroTitle: e.target.value }))}
                      placeholder="Enter hero title"
                    />
                  </div>
                  
                  <div>
                    <Label>Hero Subtitle</Label>
                    <Textarea
                      value={homePageData.heroSubtitle || ''}
                      onChange={(e) => setHomePageData((prev: any) => ({ ...prev, heroSubtitle: e.target.value }))}
                      placeholder="Enter hero subtitle"
                      rows={3}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    More home page sections can be added here...
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Editor Actions */}
          <div className="border-t p-4 bg-background/95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                {selectedPage?.type === 'blog-post' && (
                  <>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {currentPost.readingTime || 5} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {currentPost.tags?.length || 0} tags
                    </span>
                  </>
                )}
              </div>
              
              <Button 
                onClick={handleSave} 
                size="sm"
                disabled={saving || !selectedPage}
              >
                <Save className="h-4 w-4 mr-1" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>

        {/* Middle Resize Handle - only show when right panel is visible */}
        {showRightPanel && (
          <div
            className="w-3 bg-border hover:bg-primary/30 cursor-col-resize flex items-center justify-center transition-colors relative z-10"
            onMouseDown={handleMouseDown('middle')}
            title="Drag to resize middle panel"
            style={{ minHeight: '100%' }}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </div>
        )}

        {/* Right Panel - Live Preview */}
        {showRightPanel && (
            <div 
              className="flex flex-col"
              style={{ width: `${rightWidth}px` }}
            >
              <div className="p-3 border-b bg-primary/5">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview - Updates in Real-time
                </h2>
              </div>
              
              <div className="flex-1 overflow-hidden bg-white">
                {selectedPage ? <RealtimePreview /> : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select a page to preview
                  </div>
                )}
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImprovedUniversalAdmin;