import { BlogPost } from "@/lib/markdown";
import { useEffect, useRef } from "react";

interface FullPagePreviewProps {
  post: BlogPost;
}

const FullPagePreview = ({ post }: FullPagePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const updatePreview = () => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;

      // Wait for iframe to load
      const checkIframeLoaded = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDoc) return;

          // Check if the app is loaded by looking for the root element
          const rootElement = iframeDoc.getElementById('root');
          if (!rootElement || !rootElement.children.length) {
            setTimeout(checkIframeLoaded, 100);
            return;
          }

          // Set the preview data on the iframe's window
          (iframe.contentWindow as any).__PREVIEW_POST__ = post;

          // Navigate to the blog post page
          const blogSlug = post.slug || 'preview';
          iframe.src = `/#/blog/${blogSlug}`;
        } catch (error) {
          console.error('Error updating preview:', error);
        }
      };

      checkIframeLoaded();
    };

    updatePreview();
  }, [post]);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        src="/"
        className="w-full h-full border-0"
        title="Full Page Preview"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default FullPagePreview;