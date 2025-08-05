import React, { useState } from 'react';

const Footer = () => {
  const [showMoneyBackGuarantee, setShowMoneyBackGuarantee] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showTermsConditions, setShowTermsConditions] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  return (
    <>
      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" alt="LearnEndo.io Logo" className="w-12 h-12 rounded-full" />
                <span className="text-2xl font-bold text-foreground">LearnEndo.io</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <button onClick={() => setShowMoneyBackGuarantee(true)} className="hover:text-primary transition-colors">
                  <span>Money-Back Guarantee</span>
                </button>
                <span>•</span>
                <button onClick={() => setShowCookiePolicy(true)} className="hover:text-primary transition-colors">
                  <span>Cookie Policy</span>
                </button>
                <span>•</span>
                <button onClick={() => setShowTermsConditions(true)} className="hover:text-primary transition-colors">
                  <span>Terms and Conditions</span>
                </button>
                <span>•</span>
                <button onClick={() => setShowAboutMe(true)} className="hover:text-primary transition-colors">
                  <span>About Dr. Roitman</span>
                </button>
                <span>•</span>
                <button onClick={() => setShowContactUs(true)} className="hover:text-primary transition-colors">
                  <span>Contact Us</span>
                </button>
              </div>
              
              <div className="text-center text-muted-foreground">
                <p className="mb-2">© 2025 LearnEndo.io. All rights reserved.</p>
                <p className="text-sm">Transforming dental education worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals - Note: These should ideally be handled by a global modal context */}
      {/* For now, just show placeholders that redirect to main page */}
      {showMoneyBackGuarantee && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowMoneyBackGuarantee(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Money-Back Guarantee</h2>
            <p className="text-muted-foreground mb-6">
              For full details about our 100% money-back guarantee, please visit our main page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/#/'}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Main Page
              </button>
              <button
                onClick={() => setShowMoneyBackGuarantee(false)}
                className="flex-1 border border-border px-4 py-2 rounded hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCookiePolicy && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCookiePolicy(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Cookie Policy</h2>
            <p className="text-muted-foreground mb-6">
              For full details about our cookie policy, please visit our main page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/#/'}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Main Page
              </button>
              <button
                onClick={() => setShowCookiePolicy(false)}
                className="flex-1 border border-border px-4 py-2 rounded hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showTermsConditions && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowTermsConditions(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <p className="text-muted-foreground mb-6">
              For full terms and conditions, please visit our main page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/#/'}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Main Page
              </button>
              <button
                onClick={() => setShowTermsConditions(false)}
                className="flex-1 border border-border px-4 py-2 rounded hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAboutMe && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAboutMe(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">About Dr. Roitman</h2>
            <p className="text-muted-foreground mb-6">
              Learn more about Dr. Roitman on our main page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/#/'}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Main Page
              </button>
              <button
                onClick={() => setShowAboutMe(false)}
                className="flex-1 border border-border px-4 py-2 rounded hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showContactUs && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactUs(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              For contact information and our contact form, please visit our main page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/#/'}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Go to Main Page
              </button>
              <button
                onClick={() => setShowContactUs(false)}
                className="flex-1 border border-border px-4 py-2 rounded hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;