import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import toothLogo from "@/assets/tooth-logo.png";
import drRoitman from "@/assets/dr-roitman.png";
import toothQuestion from "/lovable-uploads/78edbdfc-906b-4b3f-b44f-5bcedbf2144c.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Clock, Users, Video, RotateCcw, CheckCircle, Award, Target, AlertTriangle, Microscope, GraduationCap, FileText, Phone, Timer, Shield, TrendingUp, Star, ArrowRight, Play, Zap, MessageCircle, Instagram, Send, X } from "lucide-react";
import CalendlyWidget from "@/components/CalendlyWidget";
import { ToothLocationIcon, ToothSettingsIcon, ToothKeyIcon, ToothCareIcon } from "@/components/DentalIcons";
import { getHomePageContent, HomePageContent } from "@/lib/homePageContent";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 4,
    minutes: 32,
    seconds: 15
  });
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showMoneyBackGuarantee, setShowMoneyBackGuarantee] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showTermsConditions, setShowTermsConditions] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [homePageContent, setHomePageContent] = useState<HomePageContent | null>(null);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        } else if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);
    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Cookie consent effect
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show cookie consent after 2 seconds
      setTimeout(() => {
        setShowCookieConsent(true);
      }, 2000);
    } else {
      const hasConsent = cookieConsent === 'accepted' || cookieConsent === 'essentials-plus-analytics';
      setCookiesAccepted(hasConsent);
    }
    
    // Load home page content
    const content = getHomePageContent();
    setHomePageContent(content);
    
    // Check for admin preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminPreview = urlParams.get('preview') === 'admin';
    
    if (isAdminPreview) {
      // Listen for admin updates
      const adminData = sessionStorage.getItem('adminPreviewData');
      if (adminData) {
        try {
          const { pageType, content: adminContent } = JSON.parse(adminData);
          if (pageType === 'home') {
            setHomePageContent(adminContent);
          }
        } catch (error) {
          console.error('Error parsing admin preview data:', error);
        }
      }
    }
  }, []);

  const handleCookieConsent = (accepted: boolean) => {
    const consentValue = accepted ? 'accepted' : 'declined';
    localStorage.setItem('cookieConsent', consentValue);
    setCookiesAccepted(accepted);
    setShowCookieConsent(false);
    
    // Enable Google Analytics if consent is given
    if (accepted && (window as any).enableGoogleAnalytics) {
      (window as any).enableGoogleAnalytics();
    }
  };

  const handleEssentialsConsent = () => {
    localStorage.setItem('cookieConsent', 'essentials-plus-analytics');
    setCookiesAccepted(true);
    setShowCookieConsent(false);
    
    // Enable Google Analytics for essentials + analytics
    if ((window as any).enableGoogleAnalytics) {
      (window as any).enableGoogleAnalytics();
    }
  };
  
  return <div className="min-h-screen bg-background">
      {/* Urgency Banner - Simplified */}
      <div className="bg-destructive text-destructive-foreground text-center py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge className="bg-white text-destructive font-bold animate-pulse">
              ONLY 47 SPOTS LEFT
            </Badge>
            <span>•</span>
            <span className="font-semibold">72% OFF ENDS SOON!</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" 
                alt="LearnEndo.io" 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
              />
              <span className="text-base sm:text-lg font-bold text-foreground">LearnEndo.io</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <button 
                onClick={() => document.getElementById('about-instructor')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                About Dr. Roitman
              </button>
              <button 
                onClick={() => document.getElementById('who-is-this-for')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Who Is This For
              </button>
              <button 
                onClick={() => document.getElementById('what-youll-learn')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                What You'll Learn
              </button>
              <button 
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Testimonials
              </button>
              <a 
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Blog
              </a>
              <button 
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                FAQ
              </button>
              <button 
                onClick={() => setShowContactUs(true)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Contact
              </button>
              <Button 
                size="sm"
                onClick={() => {
                  document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' });
                  if (cookiesAccepted && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      event_category: 'navigation',
                      event_label: 'nav_book_now'
                    });
                  }
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Book Now
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="h-8 px-3"
              >
                Menu
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' });
                  if (cookiesAccepted && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      event_category: 'navigation',
                      event_label: 'mobile_book_now'
                    });
                  }
                }}
                className="bg-primary hover:bg-primary/90 h-8 px-3"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b border-border shadow-lg sticky top-[60px] z-30">
          <div className="container mx-auto px-3">
            <div className="grid grid-cols-1 gap-1 py-2">
              <button 
                onClick={() => {
                  document.getElementById('about-instructor')?.scrollIntoView({ behavior: 'smooth' });
                  setShowMobileMenu(false);
                }}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-3 px-3 rounded flex items-center gap-3"
              >
                <GraduationCap className="w-4 h-4 text-primary" />
                About Dr. Roitman
              </button>
              <button 
                onClick={() => {
                  document.getElementById('who-is-this-for')?.scrollIntoView({ behavior: 'smooth' });
                  setShowMobileMenu(false);
                }}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-3 px-3 rounded flex items-center gap-3"
              >
                <Users className="w-4 h-4 text-primary" />
                Who Is This For
              </button>
              <button 
                onClick={() => {
                  document.getElementById('what-youll-learn')?.scrollIntoView({ behavior: 'smooth' });
                  setShowMobileMenu(false);
                }}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-3 px-3 rounded flex items-center gap-3"
              >
                <Award className="w-4 h-4 text-primary" />
                What You'll Learn
              </button>
              <button 
                onClick={() => {
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                  setShowMobileMenu(false);
                }}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-3 px-3 rounded flex items-center gap-3"
              >
                <Star className="w-4 h-4 text-primary" />
                Testimonials
              </button>
              <button 
                onClick={() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  setShowMobileMenu(false);
                }}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-3 px-3 rounded flex items-center gap-3"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                FAQ
              </button>
              <button 
                onClick={() => {
                  setShowContactUs(true);
                  setShowMobileMenu(false);
                }}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-3 px-3 rounded flex items-center gap-3"
              >
                <Phone className="w-4 h-4 text-primary" />
                Contact Us
              </button>
              <button 
                onClick={() => {
                  document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' });
                  setShowMobileMenu(false);
                }}
                className="text-left text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors py-3 px-3 rounded font-semibold flex items-center gap-3"
              >
                <Calendar className="w-4 h-4 text-primary" />
                Book Your Spot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Completely Redesigned */}
      <section className="gradient-hero py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <Badge 
                className="mb-6 bg-accent text-accent-foreground border-accent px-6 py-3 text-base font-bold animate-pulse-glow cursor-pointer hover:bg-accent/90 transition-colors"
                onClick={() => {
                  document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' });
                  // Track masterclass button click
                  if (cookiesAccepted && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      event_category: 'engagement',
                      event_label: 'live_masterclass_button'
                    });
                  }
                }}
              >
                <span>🔥 LIVE MASTERCLASS • SEPTEMBER 6, 2025</span>
              </Badge>
              
              {/* Tooth with Question Mark Icon - Bigger and No Bounce */}
              <div className="flex justify-center mb-8">
                <img src={toothQuestion} alt="Tooth with Question Mark" className="w-40 h-40" />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
                <span>NEVER MISS A</span>
                <span className="block text-accent-glow animate-pulse-glow">CANAL AGAIN</span>
              </h1>
              
              <div className="max-w-4xl mx-auto mb-8">
                <p className="text-2xl lg:text-3xl text-white font-bold mb-4">
                  <span className="text-orange-500">STOP</span> fearing <span className="text-orange-500">ENDO</span> Master the canal localization today!!
                </p>
                <p className="text-xl text-white/90 mb-6">
                  Eliminate missed canals • Prevent perforations • Boost confidence
                </p>
              </div>
              
              {/* Main CTA Section - Enhanced */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto mb-8">
                {/* Countdown Timer */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-lg font-bold mb-4">
                    <Timer className="w-5 h-5" />
                    <span className="text-white">🔥 LIMITED TIME OFFER ENDS IN:</span>
                  </div>
                  <div className="flex gap-3 text-xl font-black justify-center mb-4">
                    <div className="bg-white/20 px-3 py-2 rounded-lg min-w-[50px]">
                      <div>{timeLeft.days}</div>
                      <div className="text-xs font-normal">DAYS</div>
                    </div>
                    <div className="bg-white/20 px-3 py-2 rounded-lg min-w-[50px]">
                      <div>{timeLeft.hours}</div>
                      <div className="text-xs font-normal">HRS</div>
                    </div>
                    <div className="bg-white/20 px-3 py-2 rounded-lg min-w-[50px]">
                      <div>{timeLeft.minutes}</div>
                      <div className="text-xs font-normal">MIN</div>
                    </div>
                    <div className="bg-white/20 px-3 py-2 rounded-lg min-w-[50px]">
                      <div>{timeLeft.seconds}</div>
                      <div className="text-xs font-normal">SEC</div>
                    </div>
                  </div>
                  
                  {/* Limited time badge */}
                  <div className="flex justify-center mb-2">
                    <Badge className="bg-destructive text-destructive-foreground animate-pulse font-medium">🔥 LIMITED TIME</Badge>
                  </div>
                  
                  {/* Spots remaining centered */}
                  <div className="flex justify-center mb-6">
                    <span className="text-white font-medium">Only 47 spots remaining</span>
                  </div>
                  
                  {/* Divider line */}
                  <div className="w-full h-px bg-white/30 mb-6"></div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-3xl text-red-400 line-through font-bold">€97</span>
                    <span className="text-5xl font-black text-accent-glow">€27</span>
                  </div>
                  <p className="text-white/90 font-semibold">Early Bird Special (Save 72%)</p>
                </div>
                
                <Button variant="cta" size="xl" className="w-full text-sm sm:text-lg font-bold transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:bg-accent/90 mb-4 px-4 sm:px-8 py-3 sm:py-4" onClick={() => {
                  document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' });
                  // Track CTA button click
                  if (cookiesAccepted && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      event_category: 'conversion',
                      event_label: 'secure_spot_cta'
                    });
                  }
                }}>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  <span className="flex-1 text-center">SECURE YOUR SPOT NOW</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </Button>
                
                {/* Enhanced Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-white/90">
                  <div className="flex items-center gap-2 justify-center p-3 bg-white/10 rounded-lg">
                    <Shield className="w-6 h-6 text-accent" />
                    <span className="font-semibold">100% Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center p-3 bg-accent/20 rounded-lg border border-accent/30">
                    <Video className="w-6 h-6 text-accent" />
                    <span className="font-bold">RECORDING INCLUDED</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center p-3 bg-white/10 rounded-lg">
                    <RotateCcw className="w-6 h-6 text-accent" />
                    <span className="font-semibold">Lifetime Access</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20 text-center">
                  <p className="text-white font-bold text-sm">
                    🎁 BONUS: Can't attend live? No problem! Full HD recording included for lifetime access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section - NEW */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="scroll-animate">
               <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-foreground">
                 Are You Tired of...
               </h2>
                <div className="space-y-6">
                  <Card className="border-l-4 border-l-destructive bg-destructive/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                           <h3 className="font-bold text-lg mb-2 text-foreground">Missing canals during treatment?</h3>
                           <p className="text-muted-foreground">Leading to failed treatments and unhappy patients</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-destructive bg-destructive/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                           <h3 className="font-bold text-lg mb-2 text-foreground">Fear of perforations?</h3>
                           <p className="text-muted-foreground">Hesitating during canal exploration due to perforation anxiety</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-destructive bg-destructive/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-foreground">Referring easy cases?</h3>
                          <p className="text-muted-foreground">Lost revenue from referring cases you could handle yourself</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="scroll-animate">
                 <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-primary">
                   Here's the Solution!
                 </h2>
                <div className="space-y-6">
                  <Card className="border-l-4 border-l-primary bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ToothLocationIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" color="hsl(var(--primary))" />
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-foreground">Locate EVERY canal with confidence</h3>
                          <p className="text-muted-foreground">Our proven 3-step system works every time</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-primary bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ToothCareIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" color="hsl(var(--primary))" />
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-foreground">Prevent perforations completely</h3>
                          <p className="text-muted-foreground">Learn the warning signs and prevention techniques</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-primary bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ToothKeyIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" color="hsl(var(--primary))" />
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-foreground">Keep more cases in-house</h3>
                          <p className="text-muted-foreground">Increase revenue by handling your own endodontics</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Dr. Roitman - Redesigned */}
      <section id="about-instructor" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Meet Your <span className="text-primary">Expert Instructor</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn from a world-renowned endodontist with 20+ years of experience
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <img 
                    src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" 
                    alt="Dr. Roitman - Expert Endodontist" 
                    className="w-80 h-80 rounded-2xl mx-auto lg:mx-0 brand-shadow object-cover cursor-pointer hover:scale-105 transition-transform duration-300" 
                    onClick={() => setShowAboutMe(true)}
                    title="Click to learn more about Dr. Roitman"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">20+</div>
                      <div className="text-xs">Years</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Dr. Roitman, DDS</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary" className="text-primary font-semibold">
                      Board Certified Endodontist
                    </Badge>
                    <Badge variant="secondary" className="text-primary font-semibold">
                      International Speaker
                    </Badge>
                    <Badge variant="secondary" className="text-primary font-semibold">
                      Published Author
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Dr. Roitman has trained over 10,000 dental professionals worldwide and is recognized as one of the leading experts in canal localization. His innovative techniques have revolutionized how dentists approach complex endodontic cases.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 border-l-4 border-l-primary">
                    <div className="flex items-center gap-3 mb-3">
                      <GraduationCap className="w-6 h-6 text-primary" />
                      <span className="font-bold text-foreground">Education</span>
                    </div>
                    <p className="text-muted-foreground">
                      Harvard School of Dental Medicine, Advanced Endodontic Residency, 
                      Multiple board certifications
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-l-4 border-l-accent">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-6 h-6 text-accent" />
                      <span className="font-bold text-foreground">Achievements</span>
                    </div>
                    <p className="text-muted-foreground">
                      50+ published papers, Keynote speaker at 30+ international conferences, 
                      Innovation awards
                    </p>
                  </Card>
                </div>
                
                <div className="p-8 bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-foreground text-lg font-medium italic mb-4">
                    "After 20 years of perfecting these techniques, I'm excited to share the exact system 
                    that has helped thousands of dentists eliminate missed canals forever. This isn't theory – 
                    it's practical, proven methods you can use immediately."
                  </p>
                  <p className="text-primary font-bold">— Dr. Roitman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Enhanced Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Success Stories from <span className="text-primary">Real Dentists</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                See how our masterclass has transformed dental practices worldwide
              </p>
            </div>
            
            {/* Stats Row */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-primary mb-2">2,000+</div>
                <p className="text-muted-foreground font-medium">Dentists Trained</p>
              </Card>
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-primary mb-2">98%</div>
                <p className="text-muted-foreground font-medium">Success Rate</p>
              </Card>
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-primary mb-2">15+</div>
                <p className="text-muted-foreground font-medium">Countries</p>
              </Card>
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-primary mb-2">4.9/5</div>
                <p className="text-muted-foreground font-medium">Average Rating</p>
              </Card>
            </div>
            
            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 brand-shadow hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">SM</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Dr. Sarah Martinez</p>
                    <p className="text-sm text-muted-foreground">General Dentist, Spain</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "My success rate went from 78% to 96% in just 30 days! I've eliminated missed canals completely and my confidence has skyrocketed. Best investment I've made for my practice."
                </p>
                <div className="flex text-yellow-500 text-lg">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </Card>
              
              <Card className="p-6 brand-shadow hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">MW</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Dr. Michael Wong</p>
                    <p className="text-sm text-muted-foreground">Endodontist, Canada</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "Dr. Roitman's techniques for calcified canals are game-changing. I now handle cases I used to consider impossible. My referral income has increased by 60%."
                </p>
                <div className="flex text-yellow-500 text-lg">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </Card>
              
              <Card className="p-6 brand-shadow hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">LP</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Dr. Lisa Patel</p>
                    <p className="text-sm text-muted-foreground">General Dentist, Australia</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "I was nervous about endodontics before this course. Now I confidently locate MB2 canals and haven't had a single perforation in 6 months. Patients notice the difference!"
                </p>
                <div className="flex text-yellow-500 text-lg">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </Card>
              
              <Card className="p-6 brand-shadow hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">AR</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Dr. Ahmed Rahman</p>
                    <p className="text-sm text-muted-foreground">Endodontist, India</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "The systematic approach taught in this masterclass is brilliant. My treatment time has decreased by 40% while my success rate has improved dramatically."
                </p>
                <div className="flex text-yellow-500 text-lg">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </Card>
              
              <Card className="p-6 brand-shadow hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">GR</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Dr. Giovanni Rossi</p>
                    <p className="text-sm text-muted-foreground">General Dentist, Italy</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "Exceptional training! The perforation prevention techniques alone saved me thousands in potential complications. Worth every penny and more."
                </p>
                <div className="flex text-yellow-500 text-lg">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </Card>
              
              <Card className="p-6 brand-shadow hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">EJ</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Dr. Emma Johnson</p>
                    <p className="text-sm text-muted-foreground">Dental Resident, UK</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "As a recent graduate, this masterclass gave me the confidence I needed. The techniques are clear, practical, and immediately applicable. Highly recommended!"
                </p>
                <div className="flex text-yellow-500 text-lg">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This Course For Section - NEW */}
      <section id="who-is-this-for" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Who Is This <span className="text-primary">Course For?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our proven system works for dentists at every stage of their career
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Dental Students */}
              <Card className="p-8 text-center hover:scale-105 transition-all duration-300 brand-shadow bg-gradient-to-b from-primary/5 to-primary/10">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Dental Students</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    About to start practicing and want to build confidence in endodontics from day one. Get the foundation you need to succeed.
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Build confidence early</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Learn proper techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Avoid common mistakes</span>
                  </div>
                </div>
              </Card>

              {/* Beginner Dentists */}
              <Card className="p-8 text-center hover:scale-105 transition-all duration-300 brand-shadow bg-gradient-to-b from-accent/5 to-accent/10">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Beginner Dentists</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In your first 5 years of practice and want to master endodontics quickly. Perfect your technique and boost your confidence.
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Accelerate your learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Reduce treatment time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Increase success rates</span>
                  </div>
                </div>
              </Card>

              {/* Experienced Dentists */}
              <Card className="p-8 text-center hover:scale-105 transition-all duration-300 brand-shadow bg-gradient-to-b from-primary/5 to-primary/10">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Experienced Dentists</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Many years of experience but using older techniques. Ready to modernize your approach and reduce stress in your practice.
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Modern techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Reduce stress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Stay current</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Redesigned */}
      <section id="what-youll-learn" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Master the <span className="text-primary">3-Step System</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn the exact techniques that have helped 2,000+ dentists eliminate missed canals forever
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <Card className="p-8 border-l-4 border-l-primary bg-primary/5 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Systematic Canal Location</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Master the proven 3-step approach to locate every canal, including the challenging MB2. Never miss a canal again with our systematic methodology.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 border-l-4 border-l-accent bg-accent/5 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Perforation Prevention</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Learn to recognize early warning signs and implement proven prevention strategies. Eliminate the fear of perforations once and for all.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 border-l-4 border-l-primary bg-primary/5 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Calcification Management</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Advanced techniques for navigating the most challenging calcified canals and complex anatomical variations with confidence.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="text-center">
                <div className="relative">
                  <img src="https://d1yei2z3i6k35z.cloudfront.net/11922468/687672e4434d1_version4-min.png" alt="Dr. Roitman teaching endodontics" className="rounded-2xl brand-shadow max-w-full h-auto" />
                  
                  
                  {/* Instructor Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 brand-shadow">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" 
                        alt="Dr. Roitman" 
                        className="w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300" 
                        onClick={() => setShowAboutMe(true)}
                        title="Click to learn more about Dr. Roitman"
                      />
                      <div>
                        <p className="font-bold text-foreground">Dr. Roitman</p>
                        <p className="text-sm text-primary">Live Training</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section id="faq" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about the masterclass
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="experience" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <span>What level of experience is required for this masterclass?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <span>This masterclass is designed for dentists of all experience levels. Whether you're a recent graduate or an experienced practitioner, you'll learn valuable techniques. The content is structured to be accessible for beginners while providing advanced insights for experienced dentists.</span>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="credits" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <span>Will I receive CE credits for attending?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <span>Yes! This masterclass provides 1.5 hours of continuing education credits. You'll receive your CE certificate immediately after completing the session. The course is approved by major dental education bodies.</span>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="recording" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <span>What if I can't attend the live session?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <span>No problem! Every session is recorded and you'll have lifetime access to the recording. You can watch at your own pace and refer back to the material whenever needed. The recording will be available within 24 hours of the live session.</span>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="equipment" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <span>What equipment or materials do I need?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <span>You just need a computer, tablet, or smartphone with internet access to join the Zoom session. We'll provide downloadable resources including procedure checklists, reference guides, and step-by-step protocols that you can use in your practice.</span>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="questions" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <span>Can I ask questions during the masterclass?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <span>Absolutely! The last 30 minutes are dedicated to Q&A where Dr. Roitman personally answers your questions. You can submit questions throughout the presentation via chat, and there will be opportunities for live discussion.</span>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="guarantee" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <span>Is there a money-back guarantee?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <span>Yes! We offer a 100% satisfaction guarantee. If you're not completely satisfied with the masterclass content, contact us within 30 days for a full refund. We're confident you'll find tremendous value in Dr. Roitman's proven techniques.</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Ask a Question Section */}
            <div className="mt-16 text-center">
              <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">Can't Find an Answer?</h3>
                  <p className="text-muted-foreground text-lg">Send us a message and we'll get back to you quickly!</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                  <Button 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 ease-in-out hover:scale-105"
                    onClick={() => {
                      const form = document.getElementById('contact-form');
                      form?.classList.toggle('hidden');
                    }}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Send Email
                  </Button>
                  
                  <Button 
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 ease-in-out hover:scale-105"
                    onClick={() => window.open('https://t.me/drroitman', '_blank')}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Telegram
                  </Button>
                  
                  <Button 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 ease-in-out hover:scale-105"
                    onClick={() => window.open('https://www.instagram.com/dr.roitman/', '_blank')}
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Instagram
                  </Button>
                </div>
                
                {/* Contact Form Dropdown */}
                <div id="contact-form" className="hidden mt-6 max-w-md mx-auto">
                  <Card className="p-6 bg-white border border-border">
                    <h4 className="text-lg font-bold text-foreground mb-4">Send us a message</h4>
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target as HTMLFormElement);
                      const name = formData.get('name');
                      const email = formData.get('email');
                      const message = formData.get('message');
                      
                      // Create mailto link with form data
                      const subject = encodeURIComponent('Question about Canal Localization Masterclass');
                      const body = encodeURIComponent(`Hi Dr. Roitman,

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`);
                      
                      window.location.href = `mailto:DRsroitman@gmail.com?subject=${subject}&body=${body}`;
                    }}>
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          required
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          placeholder="Your question..."
                          required
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        ></textarea>
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                          Send Message
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => document.getElementById('contact-form')?.classList.add('hidden')}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Card>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  We typically respond within 2-4 hours during business hours
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Booking */}
      <section id="booking" className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-destructive text-destructive-foreground px-6 py-3 text-base font-bold animate-pulse">
                🚨 LIMITED TIME: 72% OFF EARLY BIRD SPECIAL
              </Badge>
              
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Don't Miss This
                <span className="block text-accent-glow">Opportunity!</span>
              </h2>
              
              <div className="max-w-3xl mx-auto mb-12">
                <p className="text-xl lg:text-2xl text-white font-medium mb-6">
                  Join 2,000+ dentists who have transformed their practice with our proven system
                </p>
                
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md mx-auto mb-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Timer className="w-6 h-6 text-accent" />
                      <span className="text-white font-bold">Only 47 spots remaining!</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-2xl text-white/60 line-through">€97</span>
                      <span className="text-5xl font-black text-accent-glow">€27</span>
                    </div>
                    <p className="text-white/90 font-medium">Early Bird Special Ends Soon!</p>
                  </div>
                  
                  <div className="space-y-3 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>60-minute live masterclass</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>30-minute Q&A session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Lifetime access to recording</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>CE credits included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>100% money-back guarantee</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-2xl lg:text-3xl text-white font-bold">
                  Select your preferred time slot below and secure your spot now!
                </p>
              </div>
            </div>
            
            {/* Calendly Widget */}
            <div id="calendar" className="max-w-4xl mx-auto">
              <Card className="p-4 sm:p-8 bg-white/95 backdrop-blur-sm border border-white/20">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    <span>Choose Your Time Slot</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    <span>Select the time that works best for your schedule</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <CalendlyWidget url="https://calendly.com/endoclub/new-meeting-1" className="min-h-[600px] sm:min-h-[700px] w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Policy Modal */}
      {showCookiePolicy && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCookiePolicy(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Cookie Policy</h2>
              <button 
                onClick={() => setShowCookiePolicy(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">What Are Cookies?</h3>
                <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and improving our services for dental professionals.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Types of Cookies We Use</h3>
                
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">1. Essential Cookies (Always Active)</h4>
                    <p className="text-sm">These cookies are necessary for the website to function properly and cannot be disabled.</p>
                    <ul className="mt-2 space-y-1 text-sm list-disc list-inside ml-4">
                      <li>Session management and security</li>
                      <li>Form submissions and contact forms</li>
                      <li>Calendar booking functionality</li>
                      <li>Cookie consent preferences</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">2. Analytics Cookies</h4>
                    <p className="text-sm">These help us understand how visitors interact with our website.</p>
                    <ul className="mt-2 space-y-1 text-sm list-disc list-inside ml-4">
                      <li><strong>Google Analytics (G-GWBDNMRWFS):</strong> Tracks page views, user behavior, traffic sources</li>
                      <li><strong>Google Tag Manager:</strong> Manages tracking codes and analytics</li>
                      <li><strong>Performance monitoring:</strong> Website speed and technical performance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">3. Marketing & Advertising Cookies</h4>
                    <p className="text-sm">These cookies are used to deliver relevant advertisements and track advertising effectiveness.</p>
                    <ul className="mt-2 space-y-1 text-sm list-disc list-inside ml-4">
                      <li><strong>Facebook Pixel:</strong> Tracks conversions and optimizes ad targeting (when implemented)</li>
                      <li><strong>LinkedIn Insight Tag:</strong> For professional network advertising (when implemented)</li>
                      <li><strong>Google Ads:</strong> Conversion tracking and remarketing (when implemented)</li>
                      <li><strong>Instagram Pixel:</strong> Social media advertising optimization (when implemented)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">4. Functional Cookies</h4>
                    <p className="text-sm">These cookies enhance your experience by remembering your preferences.</p>
                    <ul className="mt-2 space-y-1 text-sm list-disc list-inside ml-4">
                      <li>Language and region preferences</li>
                      <li>Video playback settings</li>
                      <li>Form auto-fill information</li>
                      <li>Chat widget preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Third-Party Services</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Google Services</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                      <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
                      <li><strong>Google Tag Manager:</strong> Efficient management of tracking codes</li>
                      <li><strong>Google Fonts:</strong> Web font loading and display optimization</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground">Scheduling & Communication</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                      <li><strong>Calendly:</strong> Appointment booking system with session cookies</li>
                      <li><strong>Zoom:</strong> Webinar and masterclass integration (when applicable)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground">Social Media & Marketing</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                      <li><strong>Facebook/Meta:</strong> Social media integration and advertising</li>
                      <li><strong>Instagram:</strong> Content embedding and social features</li>
                      <li><strong>LinkedIn:</strong> Professional networking and B2B advertising</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Cookie Consent Management</h3>
                <p>We respect your privacy choices. You can manage your cookie preferences at any time:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li><strong>Accept All:</strong> Allow all cookies for the best experience</li>
                  <li><strong>Essential Only:</strong> Only necessary cookies for basic functionality</li>
                  <li><strong>Custom Settings:</strong> Choose which types of cookies to allow</li>
                </ul>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm"><strong>Note:</strong> Declining analytics and marketing cookies will not affect your ability to attend the masterclass or access course materials, but may limit our ability to provide personalized recommendations.</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Browser Cookie Settings</h3>
                <p>You can also control cookies through your browser settings:</p>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                  <li><strong>Chrome:</strong> Settings {'>'} Privacy and Security {'>'} Cookies</li>
                  <li><strong>Firefox:</strong> Preferences {'>'} Privacy & Security {'>'} Cookies</li>
                  <li><strong>Safari:</strong> Preferences {'>'} Privacy {'>'} Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings {'>'} Site Permissions {'>'} Cookies</li>
                </ul>
                <p className="mt-2 text-sm text-amber-600">⚠️ Disabling essential cookies may prevent website functionality, including masterclass registration and contact forms.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Data Retention</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Essential Cookies:</strong> Session-based or up to 1 year</li>
                  <li><strong>Analytics Cookies:</strong> Up to 26 months (Google Analytics default)</li>
                  <li><strong>Marketing Cookies:</strong> 30-180 days depending on the service</li>
                  <li><strong>Functional Cookies:</strong> Up to 1 year for preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Your Rights (GDPR Compliance)</h3>
                <p>If you are in the European Economic Area, you have the right to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Erase your data (right to be forgotten)</li>
                  <li>Restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Updates to This Policy</h3>
                <p>We may update this Cookie Policy to reflect changes in our practices or for legal requirements. We will notify users of significant changes by updating the "Last Updated" date and, where appropriate, providing additional notice on our website.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Contact Information</h3>
                <p>If you have questions about our cookie policy or wish to exercise your rights, please contact us through our official channels. For specific privacy-related inquiries, you can also reach out via our contact form.</p>
              </div>
              
              <div className="text-sm text-muted-foreground border-t border-border pt-4">
                <p><strong>Last updated:</strong> January 2025</p>
                <p><strong>Effective date:</strong> January 2025</p>
                <p>This policy applies to LearnEndo.io and all associated dental education services provided by Dr. Roitman.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Money-Back Guarantee Modal */}
      {showMoneyBackGuarantee && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowMoneyBackGuarantee(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">100% Money-Back Guarantee</h2>
              <button 
                onClick={() => setShowMoneyBackGuarantee(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 text-muted-foreground">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Our Promise to You</h3>
                </div>
                <p className="text-lg text-foreground">We're so confident in the value of our Canal Localization Masterclass that we offer a complete 100% money-back guarantee.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Attend the Masterclass</h4>
                      <p>Participate in the live session or watch the recording within 30 days of purchase.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Try the Techniques</h4>
                      <p>Apply what you've learned in your practice and see the results for yourself.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Not Satisfied? Get Your Money Back</h4>
                      <p>If you're not completely satisfied within 30 days, contact us for a full refund.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">What's Covered</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Full refund of the masterclass fee (€27 Early Bird Special or €97 regular price)</li>
                  <li>No questions asked policy - your satisfaction is our priority</li>
                  <li>Valid for 30 days from the date of purchase</li>
                  <li>Applies to both live attendance and recorded access</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">How to Request a Refund</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="mb-4">To request your refund, simply contact us using any of these methods:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <button 
                        onClick={() => window.location.href = 'mailto:DRsroitman@gmail.com'} 
                        className="text-primary hover:underline"
                      >
                        Email Support
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-blue-500" />
                      <span>Telegram: <a href="https://t.me/drroitman" className="text-primary hover:underline">@drroitman</a></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-purple-500" />
                      <span>Instagram: <a href="https://www.instagram.com/dr.roitman/" className="text-primary hover:underline">@dr.roitman</a></span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">Include your name, email used for registration, and the reason for your refund request (optional).</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Processing Time</h3>
                <p>Refunds are typically processed within 3-5 business days. You'll receive confirmation once the refund has been issued to your original payment method.</p>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Why We Offer This Guarantee</h4>
                <p>Dr. Roitman has trained over 2,000 dentists worldwide with a 98% success rate. We're confident that our proven techniques will transform your endodontic practice. This guarantee removes any risk from your investment in professional development.</p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Last updated: January 2025</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Me Modal */}
      {showAboutMe && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAboutMe(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">About Dr. Roitman</h2>
              <button 
                onClick={() => setShowAboutMe(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/3">
                  <img 
                    src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" 
                    alt="Dr. Roitman" 
                    className="w-64 h-64 rounded-2xl mx-auto brand-shadow object-cover"
                  />
                </div>
                <div className="lg:w-2/3 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">Dr. Roitman, DDS</h3>
                    <p className="text-lg text-primary font-semibold mb-4">Board Certified Endodontist • International Speaker • Published Author</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Dr. Roitman is a world-renowned endodontist with over 20 years of experience in the field. 
                      He has revolutionized canal localization techniques and has trained more than 10,000 dental 
                      professionals worldwide.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <h4 className="text-xl font-bold text-foreground">Education & Training</h4>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Harvard School of Dental Medicine</li>
                    <li>• Advanced Endodontic Residency</li>
                    <li>• Multiple board certifications</li>
                    <li>• Continuing education in microscopic endodontics</li>
                  </ul>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-accent" />
                    <h4 className="text-xl font-bold text-foreground">Achievements</h4>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 50+ published research papers</li>
                    <li>• Keynote speaker at 30+ international conferences</li>
                    <li>• Innovation awards in endodontics</li>
                    <li>• Developer of revolutionary canal location techniques</li>
                  </ul>
                </Card>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h4 className="text-xl font-bold text-foreground mb-4">Professional Experience</h4>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">2000-Present:</strong> Private Practice in Advanced Endodontics
                  </p>
                  <p>
                    <strong className="text-foreground">2005-Present:</strong> International Lecturer and Course Director
                  </p>
                  <p>
                    <strong className="text-foreground">2010-Present:</strong> Founder of LearnEndo.io Educational Platform
                  </p>
                  <p>
                    <strong className="text-foreground">2015-Present:</strong> Research Director for Canal Localization Studies
                  </p>
                </div>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                <h4 className="text-xl font-bold text-foreground mb-4">Philosophy & Mission</h4>
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "My mission is to eliminate the fear and uncertainty that dentists face when performing endodontic procedures. 
                  Through systematic education and proven techniques, every dentist can achieve predictable success in canal localization."
                </blockquote>
                <p className="text-muted-foreground">
                  Dr. Roitman believes that with the right knowledge and techniques, any dentist can master endodontics. 
                  His teaching philosophy focuses on practical, immediately applicable methods that build confidence and improve patient outcomes.
                </p>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-bold text-foreground mb-4">Connect with Dr. Roitman</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => window.open('https://t.me/drroitman', '_blank')}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Telegram
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => window.open('https://www.instagram.com/dr.roitman/', '_blank')}
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.location.href = 'mailto:DRsroitman@gmail.com'}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsConditions && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowTermsConditions(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Terms and Conditions</h2>
              <button 
                onClick={() => setShowTermsConditions(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h3>
                <p>By registering for and attending the Canal Localization Masterclass, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not register for the course.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">2. Course Registration and Payment</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Registration is confirmed upon receipt of payment</li>
                  <li>Early Bird pricing is subject to availability and time limits</li>
                  <li>All prices are in Euros and include applicable taxes</li>
                  <li>Payment is processed securely through our authorized payment providers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">3. Course Content and Access</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>The masterclass includes live instruction and Q&A session</li>
                  <li>Recorded version provided for lifetime access</li>
                  <li>Downloadable resources and materials included</li>
                  <li>CE credits provided upon completion</li>
                  <li>Content is for personal professional use only</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">4. Intellectual Property</h3>
                <p>All course materials, including but not limited to videos, presentations, handouts, and techniques, are the intellectual property of Dr. Roitman and LearnEndo.io. Reproduction, distribution, or commercial use without written permission is prohibited.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">5. Professional Use and Disclaimer</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Course content is for educational purposes only</li>
                  <li>Participants are responsible for ensuring techniques comply with local regulations</li>
                  <li>Professional judgment should always be exercised in clinical situations</li>
                  <li>No guarantee of specific clinical outcomes</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">6. Cancellation and Refund Policy</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>100% money-back guarantee within 30 days of purchase</li>
                  <li>Refunds processed within 3-5 business days</li>
                  <li>Force majeure events may result in course rescheduling</li>
                  <li>Technical issues will be resolved or full refunds provided</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">7. Privacy and Data Protection</h3>
                <p>We are committed to protecting your privacy. Registration information is used solely for course delivery and communication. We do not sell or share personal data with third parties except as necessary for course delivery (e.g., Calendly for scheduling).</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">8. Technical Requirements</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Stable internet connection required for live session</li>
                  <li>Compatible with major browsers and devices</li>
                  <li>Technical support provided for access issues</li>
                  <li>Recording available if technical problems prevent live attendance</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">9. Limitation of Liability</h3>
                <p>LearnEndo.io and Dr. Roitman shall not be liable for any indirect, incidental, special, or consequential damages arising from course participation. Total liability is limited to the course registration fee.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">10. Contact Information</h3>
                <p>For questions about these terms or the course, please use our contact form or reach out through our official social media channels. Contact information is available in the Contact Us section of our website.</p>
              </div>
              
              <div className="text-sm text-muted-foreground border-t border-border pt-4">
                <p>Last updated: January 2025</p>
                <p>These terms are governed by applicable law and any disputes shall be resolved through appropriate legal channels.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {showContactUs && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactUs(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <button 
                onClick={() => setShowContactUs(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Get in Touch with Dr. Roitman</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Have questions about the masterclass, endodontic techniques, or need professional guidance? 
                  We're here to help you succeed in your dental practice.
                </p>
              </div>

              {/* Quick Contact Options */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center hover:scale-105 transition-transform duration-300 border-primary/20">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Send className="w-8 h-8 text-blue-500" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">Telegram</h4>
                    <p className="text-muted-foreground text-sm">Fast response, typically within 2-4 hours</p>
                  </div>
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => window.open('https://t.me/drroitman', '_blank')}
                  >
                    Message on Telegram
                  </Button>
                </Card>

                <Card className="p-6 text-center hover:scale-105 transition-transform duration-300 border-primary/20">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Instagram className="w-8 h-8 text-purple-500" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">Instagram</h4>
                    <p className="text-muted-foreground text-sm">Follow for tips and direct messaging</p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => window.open('https://www.instagram.com/dr.roitman/', '_blank')}
                  >
                    Follow & Message
                  </Button>
                </Card>

                <Card className="p-6 text-center hover:scale-105 transition-transform duration-300 border-primary/20">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">Email Support</h4>
                    <p className="text-muted-foreground text-sm">Detailed inquiries and formal communication</p>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      const form = document.getElementById('contact-form-main');
                      form?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Send Email
                  </Button>
                </Card>
              </div>

              {/* Main Contact Form */}
              <div id="contact-form-main" className="max-w-2xl mx-auto">
                <Card className="p-8 border border-primary/20">
                  <h4 className="text-2xl font-bold text-foreground mb-6 text-center">Send Us a Message</h4>
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const subject = formData.get('subject');
                    const message = formData.get('message');
                    
                    // Create mailto link with form data
                    const emailSubject = encodeURIComponent(`${subject} - Canal Localization Masterclass Inquiry`);
                    const body = encodeURIComponent(`Hi Dr. Roitman,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Best regards,
${name}`);
                    
                    window.location.href = `mailto:DRsroitman@gmail.com?subject=${emailSubject}&body=${body}`;
                  }}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Dr. John Smith"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                      <select
                        name="subject"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        <option value="">Select a topic...</option>
                        <option value="Masterclass Question">Masterclass Question</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Refund Request">Refund Request</option>
                        <option value="Endodontic Technique Question">Endodontic Technique Question</option>
                        <option value="Partnership Inquiry">Partnership Inquiry</option>
                        <option value="Media Interview">Media Interview</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                      <textarea
                        name="message"
                        placeholder="Please describe your question or inquiry in detail..."
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <Button type="submit" size="lg" className="px-8 py-3 text-lg">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Response Time Information */}
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <h4 className="text-lg font-bold text-foreground mb-3">Response Times</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <strong className="text-foreground">Telegram:</strong> 2-4 hours
                  </div>
                  <div>
                    <strong className="text-foreground">Instagram:</strong> 4-8 hours
                  </div>
                  <div>
                    <strong className="text-foreground">Email:</strong> 24-48 hours
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  For urgent technical issues during the masterclass, please use Telegram for fastest response.
                </p>
              </div>

              {/* Office Hours */}
              <div className="text-center text-muted-foreground">
                <h4 className="text-lg font-bold text-foreground mb-3">Office Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM (CET)</p>
                <p>Weekend: Limited availability for urgent matters</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent Popup */}
      {showCookieConsent && (
        <div className="fixed bottom-4 right-4 bg-white border border-border shadow-lg rounded-lg z-50 p-4 max-w-sm">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                🍪
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Cookie Settings</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use cookies to improve your experience and analyze usage patterns to help dental professionals like you.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => handleCookieConsent(true)}
                className="w-full text-xs bg-primary hover:bg-primary/90"
                size="sm"
              >
                Accept All
              </Button>
              
              <Button 
                onClick={handleEssentialsConsent}
                variant="outline"
                className="w-full text-xs"
                size="sm"
              >
                Choose Only Essentials
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowCookiePolicy(true)}
                  className="flex-1 text-xs p-1 h-auto"
                  size="sm"
                >
                  Details
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    // Show additional decline options to make it more complex
                    const confirmDecline = confirm(
                      "Are you sure you want to decline cookies? This may limit website functionality and prevent us from improving your experience. You can change your preferences later in our Cookie Policy."
                    );
                    if (confirmDecline) {
                      const reallyDecline = confirm(
                        "Declining cookies means we can't:\n• Remember your preferences\n• Analyze what content helps dentists most\n• Provide personalized recommendations\n• Improve the masterclass experience\n\nContinue to decline?"
                      );
                      if (reallyDecline) {
                        handleCookieConsent(false);
                      }
                    }
                  }}
                  className="flex-1 text-xs p-1 h-auto text-muted-foreground"
                  size="sm"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>;
};

export default Index;