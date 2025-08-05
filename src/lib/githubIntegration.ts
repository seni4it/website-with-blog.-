// Local change management and publishing system
interface ContentSnapshot {
  id: string;
  timestamp: number;
  description: string;
  blogContent: any;
  homeContent: any;
  posts: any[];
}

export class ContentManager {
  private static instance: ContentManager;
  private changeHistory: ContentSnapshot[] = [];
  private currentIndex: number = -1;
  private maxHistory: number = 50; // Keep last 50 changes

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  constructor() {
    this.loadHistory();
  }

  private saveHistory() {
    localStorage.setItem('contentHistory', JSON.stringify({
      history: this.changeHistory,
      currentIndex: this.currentIndex
    }));
  }

  private loadHistory() {
    const saved = localStorage.getItem('contentHistory');
    if (saved) {
      const data = JSON.parse(saved);
      this.changeHistory = data.history || [];
      this.currentIndex = data.currentIndex || -1;
    }
  }

  saveSnapshot(description: string, blogContent: any, homeContent: any, posts: any[]) {
    // Remove any changes after current index (when undoing then making new changes)
    this.changeHistory = this.changeHistory.slice(0, this.currentIndex + 1);
    
    const snapshot: ContentSnapshot = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      description,
      blogContent: JSON.parse(JSON.stringify(blogContent)),
      homeContent: JSON.parse(JSON.stringify(homeContent)),
      posts: JSON.parse(JSON.stringify(posts))
    };

    this.changeHistory.push(snapshot);
    this.currentIndex = this.changeHistory.length - 1;

    // Keep only last maxHistory items
    if (this.changeHistory.length > this.maxHistory) {
      this.changeHistory = this.changeHistory.slice(-this.maxHistory);
      this.currentIndex = this.changeHistory.length - 1;
    }

    this.saveHistory();
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.changeHistory.length - 1;
  }

  undo(): ContentSnapshot | null {
    if (this.canUndo()) {
      this.currentIndex--;
      this.saveHistory();
      return this.changeHistory[this.currentIndex];
    }
    return null;
  }

  redo(): ContentSnapshot | null {
    if (this.canRedo()) {
      this.currentIndex++;
      this.saveHistory();
      return this.changeHistory[this.currentIndex];
    }
    return null;
  }

  getHistory(): ContentSnapshot[] {
    return [...this.changeHistory];
  }

  getCurrentSnapshot(): ContentSnapshot | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.changeHistory.length) {
      return this.changeHistory[this.currentIndex];
    }
    return null;
  }
}

// Publishing functions
export const publishWebsite = async () => {
  try {
    // Show publishing instructions
    const instructions = `
Publishing your website:

1. Building production version (without admin panel)
2. Run: npm run publish-website
3. Upload dist/ folder to hosting
4. Push changes to GitHub

Commands copied to clipboard!
`;

    console.log(instructions);
    
    if (navigator.clipboard) {
      try {
        const commands = `npm run publish-website
git add .
git commit -m "Publish website - ${new Date().toLocaleDateString()}"
git push origin main`;
        
        await navigator.clipboard.writeText(commands);
        return { 
          success: true, 
          message: 'Publishing commands copied! Run in Terminal to publish your website.' 
        };
      } catch (e) {
        return { 
          success: true, 
          message: 'Run: npm run publish-website then push to Git' 
        };
      }
    }
    
    return { 
      success: true, 
      message: 'Run: npm run publish-website then git add . && git commit -m "Publish" && git push' 
    };
  } catch (error) {
    console.error('Publish error:', error);
    return { 
      success: false, 
      message: 'Please run manually: npm run publish-website' 
    };
  }
};

export const discardChanges = async () => {
  try {
    const contentManager = ContentManager.getInstance();
    const undoResult = contentManager.undo();
    
    if (undoResult) {
      return { 
        success: true, 
        message: 'Changes discarded. Reverted to previous version.',
        snapshot: undoResult
      };
    } else {
      return { 
        success: false, 
        message: 'No changes to discard.' 
      };
    }
  } catch (error) {
    console.error('Discard error:', error);
    return { 
      success: false, 
      message: 'Could not discard changes.' 
    };
  }
};