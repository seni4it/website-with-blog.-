import { BlogPost } from "@/lib/markdown";
import { useEffect, useRef, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";

interface RealtimePreviewProps {
  post: BlogPost;
}

const RealtimePreview = ({ post }: RealtimePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeReady, setIsIframeReady] = useState(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  // Create a message to send to the iframe
  const createUpdateMessage = (post: BlogPost) => {
    return {
      type: 'UPDATE_PREVIEW',
      post: {
        ...post,
        htmlContent: post.content ? markdownToHtml(post.content) : ''
      }
    };
  };

  // Send updates to the iframe
  const updatePreview = () => {
    if (!iframeRef.current?.contentWindow || !isIframeReady) return;
    
    try {
      iframeRef.current.contentWindow.postMessage(
        createUpdateMessage(post),
        window.location.origin
      );
    } catch (error) {
      console.error('Error updating preview:', error);
    }
  };

  // Set up iframe and message handling
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleIframeLoad = () => {
      setIsIframeReady(true);
      
      // Send initial data
      setTimeout(() => {
        updatePreview();
      }, 100);
    };

    iframe.addEventListener('load', handleIframeLoad);

    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
    };
  }, []);

  // Update preview when post changes with debouncing
  useEffect(() => {
    if (!isIframeReady) return;

    // Clear existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Debounce updates for better performance
    updateTimeoutRef.current = setTimeout(() => {
      updatePreview();
    }, 150); // Update after 150ms of no changes

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [post, isIframeReady]);

  // Create the preview URL
  const previewUrl = `/#/blog/${post.slug || 'preview'}?preview=true`;

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        src={previewUrl}
        className="w-full h-full border-0"
        title="Live Preview"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default RealtimePreview;