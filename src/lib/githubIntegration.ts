// GitHub integration for change tracking and verification
// This provides audit trail and backup of all content changes

interface GitHubCommit {
  message: string;
  content: any;
  timestamp: string;
  author: string;
}

interface ChangeLog {
  id: string;
  type: 'blog_post' | 'blog_page' | 'site_content';
  action: 'create' | 'update' | 'delete';
  content: any;
  timestamp: string;
  author: string;
  githubCommitId?: string;
  approved: boolean;
}

class GitHubContentManager {
  private changes: ChangeLog[] = [];
  private readonly GITHUB_REPO = 'your-username/website-content'; // Configure this
  private readonly CHANGE_LOG_KEY = 'contentChanges';

  constructor() {
    this.loadChanges();
  }

  // Load changes from localStorage
  private loadChanges(): void {
    const stored = localStorage.getItem(this.CHANGE_LOG_KEY);
    if (stored) {
      try {
        this.changes = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading changes:', error);
        this.changes = [];
      }
    }
  }

  // Save changes to localStorage
  private saveChanges(): void {
    localStorage.setItem(this.CHANGE_LOG_KEY, JSON.stringify(this.changes));
  }

  // Generate change ID
  private generateChangeId(): string {
    return `change_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  // Create a change record
  public recordChange(
    type: ChangeLog['type'],
    action: ChangeLog['action'],
    content: any,
    author: string = 'Dr. Roitman'
  ): string {
    const changeId = this.generateChangeId();
    
    const change: ChangeLog = {
      id: changeId,
      type,
      action,
      content: JSON.parse(JSON.stringify(content)), // Deep clone
      timestamp: new Date().toISOString(),
      author,
      approved: false // Requires approval before going live
    };

    this.changes.unshift(change); // Add to beginning
    this.saveChanges();

    // In production, this would trigger a GitHub webhook or API call
    this.simulateGitHubPush(change);

    return changeId;
  }

  // Simulate GitHub push (in production, this would be real GitHub API)
  private simulateGitHubPush(change: ChangeLog): void {
    console.log('📝 Content change recorded:', {
      id: change.id,
      type: change.type,
      action: change.action,
      timestamp: change.timestamp,
      author: change.author
    });

    // Simulate GitHub commit creation
    setTimeout(() => {
      const commitId = `commit_${Math.random().toString(36).substring(2)}`;
      this.updateChangeWithCommit(change.id, commitId);
    }, 1000);
  }

  // Update change with GitHub commit ID
  private updateChangeWithCommit(changeId: string, commitId: string): void {
    const change = this.changes.find(c => c.id === changeId);
    if (change) {
      change.githubCommitId = commitId;
      this.saveChanges();
      console.log('✅ GitHub commit created:', commitId);
    }
  }

  // Get all changes
  public getChanges(): ChangeLog[] {
    return [...this.changes];
  }

  // Get pending changes (not approved)
  public getPendingChanges(): ChangeLog[] {
    return this.changes.filter(c => !c.approved);
  }

  // Approve a change
  public approveChange(changeId: string): boolean {
    const change = this.changes.find(c => c.id === changeId);
    if (change) {
      change.approved = true;
      this.saveChanges();
      console.log('✅ Change approved:', changeId);
      return true;
    }
    return false;
  }

  // Reject and rollback a change
  public rejectChange(changeId: string): boolean {
    const changeIndex = this.changes.findIndex(c => c.id === changeId);
    if (changeIndex !== -1) {
      const change = this.changes[changeIndex];
      this.changes.splice(changeIndex, 1);
      this.saveChanges();
      console.log('❌ Change rejected and removed:', changeId);
      return true;
    }
    return false;
  }

  // Generate content backup for GitHub
  public generateBackup(): string {
    const backup = {
      timestamp: new Date().toISOString(),
      changes: this.changes,
      metadata: {
        totalChanges: this.changes.length,
        pendingChanges: this.getPendingChanges().length,
        approvedChanges: this.changes.filter(c => c.approved).length
      }
    };

    return JSON.stringify(backup, null, 2);
  }

  // Restore from backup
  public restoreFromBackup(backupData: string): boolean {
    try {
      const backup = JSON.parse(backupData);
      if (backup.changes && Array.isArray(backup.changes)) {
        this.changes = backup.changes;
        this.saveChanges();
        console.log('✅ Restored from backup');
        return true;
      }
    } catch (error) {
      console.error('❌ Error restoring backup:', error);
    }
    return false;
  }

  // Get change statistics
  public getStatistics() {
    const total = this.changes.length;
    const approved = this.changes.filter(c => c.approved).length;
    const pending = this.changes.filter(c => !c.approved).length;
    
    const byType = this.changes.reduce((acc, change) => {
      acc[change.type] = (acc[change.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byAction = this.changes.reduce((acc, change) => {
      acc[change.action] = (acc[change.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      approved,
      pending,
      approvalRate: total > 0 ? Math.round((approved / total) * 100) : 0,
      byType,
      byAction,
      lastChange: this.changes[0]?.timestamp || null
    };
  }
}

export const githubContentManager = new GitHubContentManager();

// Export types for use in components
export type { ChangeLog, GitHubCommit };