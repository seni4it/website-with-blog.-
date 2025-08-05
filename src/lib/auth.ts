// Secure authentication system
// In production, this would use proper backend authentication

interface AuthAttempt {
  timestamp: number;
  ip?: string;
}

class AuthManager {
  private attempts: AuthAttempt[] = [];
  private readonly MAX_ATTEMPTS = 3;
  private readonly LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
  private readonly SESSION_KEY = 'adminSession';

  // Simple hash function (in production, use proper hashing like bcrypt)
  private simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  // Check if account is locked
  private isLocked(): boolean {
    const now = Date.now();
    const recentAttempts = this.attempts.filter(
      attempt => now - attempt.timestamp < this.LOCKOUT_TIME
    );
    return recentAttempts.length >= this.MAX_ATTEMPTS;
  }

  // Clean old attempts
  private cleanOldAttempts(): void {
    const now = Date.now();
    this.attempts = this.attempts.filter(
      attempt => now - attempt.timestamp < this.LOCKOUT_TIME
    );
  }

  // Verify password (in production, this would be server-side)
  public authenticate(password: string): { success: boolean; message: string; remainingAttempts?: number } {
    this.cleanOldAttempts();

    if (this.isLocked()) {
      return {
        success: false,
        message: 'Account temporarily locked due to too many failed attempts. Please try again in 15 minutes.'
      };
    }

    // In production, this hash would be stored securely on the server
    const correctPasswordHash = this.simpleHash('DrRoitman2025EndoSecure!');
    const inputHash = this.simpleHash(password);

    if (inputHash === correctPasswordHash) {
      // Clear failed attempts on successful login
      this.attempts = [];
      
      // Create session token (in production, use JWT or similar)
      const sessionToken = this.generateSessionToken();
      sessionStorage.setItem(this.SESSION_KEY, sessionToken);
      
      return { success: true, message: 'Authentication successful' };
    } else {
      // Record failed attempt
      this.attempts.push({ timestamp: Date.now() });
      
      const remainingAttempts = this.MAX_ATTEMPTS - this.attempts.length;
      return {
        success: false,
        message: remainingAttempts > 0 
          ? `Incorrect password. ${remainingAttempts} attempts remaining.`
          : 'Account locked due to too many failed attempts.',
        remainingAttempts: Math.max(0, remainingAttempts)
      };
    }
  }

  // Generate session token
  private generateSessionToken(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${timestamp}_${random}_admin`);
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem(this.SESSION_KEY);
    if (!token) return false;

    try {
      const decoded = atob(token);
      const [timestamp] = decoded.split('_');
      const tokenAge = Date.now() - parseInt(timestamp);
      
      // Token expires after 8 hours
      const EIGHT_HOURS = 8 * 60 * 60 * 1000;
      return tokenAge < EIGHT_HOURS;
    } catch {
      return false;
    }
  }

  // Logout
  public logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.attempts = [];
  }

  // Get remaining lockout time
  public getRemainingLockoutTime(): number {
    if (!this.isLocked()) return 0;
    
    const oldestAttempt = Math.min(...this.attempts.map(a => a.timestamp));
    const unlockTime = oldestAttempt + this.LOCKOUT_TIME;
    return Math.max(0, unlockTime - Date.now());
  }
}

export const authManager = new AuthManager();