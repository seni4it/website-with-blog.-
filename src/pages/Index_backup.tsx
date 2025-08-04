import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import toothLogo from "@/assets/tooth-logo.png";
import drRoitman from "@/assets/dr-roitman.png";
import toothQuestion from "/lovable-uploads/78edbdfc-906b-4b3f-b44f-5bcedbf2144c.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Clock, Users, Video, RotateCcw, CheckCircle, Award, Target, AlertTriangle, Microscope, GraduationCap, FileText, Phone, Timer, Shield, TrendingUp, Star, ArrowRight, Play, Zap } from "lucide-react";
import CalendlyWidget from "@/components/CalendlyWidget";
import { ToothLocationIcon, ToothSettingsIcon, ToothKeyIcon, ToothCareIcon } from "@/components/DentalIcons";
const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 4,
    minutes: 32,
    seconds: 15
  });

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

      {/* Hero Section - Completely Redesigned */}
      <section className="gradient-hero py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Logo Left */}
        <div className="absolute top-8 left-8 z-20">
          <img src="/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png" alt="Company Logo" className="h-16 w-auto" />
        </div>
        
        {/* Logo Right */}
        <div className="absolute top-8 right-8 z-20">
          <img src="/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png" alt="Company Logo" className="h-16 w-auto" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <Badge 
                className="mb-6 bg-accent text-accent-foreground border-accent px-6 py-3 text-base font-bold animate-pulse-glow cursor-pointer hover:bg-accent/90 transition-colors"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
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
                <p className="text-2xl lg:text-3xl text-white font-bold mb-4">STOP fearing ENDO Master the canal localization today!!</p>
                <p className="text-xl text-white/90 mb-6">
                  Eliminate missed canals • Prevent perforations • Boost confidence
                </p>
              </div>
              
              {/* Value Proposition Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-12 h-12 text-accent mx-auto mb-3" />
                     <p className="font-bold text-lg">98% Success Rate</p>
                     <p className="text-white/80 text-sm">Among participants</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-accent mx-auto mb-3" />
                     <p className="font-bold text-lg">2,000+ Dentists</p>
                     <p className="text-white/80 text-sm">Already trained</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <Award className="w-12 h-12 text-accent mx-auto mb-3" />
                     <p className="font-bold text-lg">4.9/5 Rating</p>
                     <p className="text-white/80 text-sm">Average satisfaction</p>
                  </CardContent>
                </Card>
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
                
                <Button variant="cta" size="xl" className="w-full text-lg font-bold animate-pulse-glow mb-4" onClick={() => document.getElementById('booking')?.scrollIntoView({
                behavior: 'smooth'
              })}>
                  <Zap className="w-5 h-5 mr-2" />
                  <span>SECURE YOUR SPOT NOW</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                {/* Enhanced Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-white/90">
                  <div className="flex items-center gap-2 justify-center p-3 bg-white/10 rounded-lg">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="font-semibold">100% Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center p-3 bg-accent/20 rounded-lg border border-accent/30">
                    <Video className="w-4 h-4 text-accent" />
                    <span className="font-bold">RECORDING INCLUDED</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center p-3 bg-white/10 rounded-lg">
                    <RotateCcw className="w-4 h-4 text-accent" />
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
               <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-5xl font-bold mb-8 text-foreground">
                 Are You Tired of...
               </EditableText>
                <div className="space-y-6">
                  <Card className="border-l-4 border-l-destructive bg-destructive/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                           <EditableText isEditing={isEditing} as="h3" className="font-bold text-lg mb-2 text-foreground">Missing canals during treatment?</EditableText>
                           <EditableText isEditing={isEditing} as="p" className="text-muted-foreground">Leading to failed treatments and unhappy patients</EditableText>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-destructive bg-destructive/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                           <EditableText isEditing={isEditing} as="h3" className="font-bold text-lg mb-2 text-foreground">Fear of perforations?</EditableText>
                           <EditableText isEditing={isEditing} as="p" className="text-muted-foreground">Hesitating during canal exploration due to perforation anxiety</EditableText>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-destructive bg-destructive/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                          <EditableText isEditing={isEditing} as="h3" className="font-bold text-lg mb-2 text-foreground">Referring easy cases?</EditableText>
                          <EditableText isEditing={isEditing} as="p" className="text-muted-foreground">Lost revenue from referring cases you could handle yourself</EditableText>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="scroll-animate">
                 <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-5xl font-bold mb-8 text-primary">
                   Here's the Solution!
                 </EditableText>
                <div className="space-y-6">
                  <Card className="border-l-4 border-l-primary bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ToothLocationIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" color="hsl(var(--primary))" />
                        <div>
                          <EditableText isEditing={isEditing} as="h3" className="font-bold text-lg mb-2 text-foreground">Locate EVERY canal with confidence</EditableText>
                          <EditableText isEditing={isEditing} as="p" className="text-muted-foreground">Our proven 3-step system works every time</EditableText>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-primary bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ToothCareIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" color="hsl(var(--primary))" />
                        <div>
                          <EditableText isEditing={isEditing} as="h3" className="font-bold text-lg mb-2 text-foreground">Prevent perforations completely</EditableText>
                          <EditableText isEditing={isEditing} as="p" className="text-muted-foreground">Learn the warning signs and prevention techniques</EditableText>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-primary bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ToothKeyIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" color="hsl(var(--primary))" />
                        <div>
                          <EditableText isEditing={isEditing} as="h3" className="font-bold text-lg mb-2 text-foreground">Keep more cases in-house</EditableText>
                          <EditableText isEditing={isEditing} as="p" className="text-muted-foreground">Increase revenue by handling your own endodontics</EditableText>
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
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Meet Your <span className="text-primary">Expert Instructor</span>
              </EditableText>
              <EditableText isEditing={isEditing} as="p" className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn from a world-renowned endodontist with 20+ years of experience
              </EditableText>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <EditableImage src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" alt="Dr. Roitman - Expert Endodontist" className="w-80 h-80 rounded-2xl mx-auto lg:mx-0 brand-shadow object-cover" isEditing={isEditing} />
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
                  <EditableText isEditing={isEditing} as="h3" className="text-3xl font-bold text-foreground mb-4">Dr. Roitman, DDS</EditableText>
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
                  <EditableText isEditing={isEditing} as="p" className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Dr. Roitman has trained over 10,000 dental professionals worldwide and is recognized as one of the leading experts in canal localization. His innovative techniques have revolutionized how dentists approach complex endodontic cases.
                  </EditableText>
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
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Success Stories from <span className="text-primary">Real Dentists</span>
              </EditableText>
              <EditableText isEditing={isEditing} as="p" className="text-xl text-muted-foreground">
                See how our masterclass has transformed dental practices worldwide
              </EditableText>
            </div>
            
            {/* Stats Row */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <EditableText isEditing={isEditing} as="div" className="text-4xl font-black text-primary mb-2">2,000+</EditableText>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground font-medium">Dentists Trained</EditableText>
              </Card>
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <EditableText isEditing={isEditing} as="div" className="text-4xl font-black text-primary mb-2">98%</EditableText>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground font-medium">Success Rate</EditableText>
              </Card>
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <EditableText isEditing={isEditing} as="div" className="text-4xl font-black text-primary mb-2">15+</EditableText>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground font-medium">Countries</EditableText>
              </Card>
              <Card className="p-6 text-center brand-shadow hover:scale-105 transition-all duration-300">
                <EditableText isEditing={isEditing} as="div" className="text-4xl font-black text-primary mb-2">4.9/5</EditableText>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground font-medium">Average Rating</EditableText>
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
                    <EditableText isEditing={isEditing} as="p" className="font-bold text-foreground">Dr. Sarah Martinez</EditableText>
                    <EditableText isEditing={isEditing} as="p" className="text-sm text-muted-foreground">General Dentist, Spain</EditableText>
                  </div>
                </div>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground italic mb-4">
                  "My success rate went from 78% to 96% in just 30 days! I've eliminated missed canals completely and my confidence has skyrocketed. Best investment I've made for my practice."
                </EditableText>
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
                    <EditableText isEditing={isEditing} as="p" className="font-bold text-foreground">Dr. Michael Wong</EditableText>
                    <EditableText isEditing={isEditing} as="p" className="text-sm text-muted-foreground">Endodontist, Canada</EditableText>
                  </div>
                </div>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground italic mb-4">
                  "Dr. Roitman's techniques for calcified canals are game-changing. I now handle cases I used to consider impossible. My referral income has increased by 60%."
                </EditableText>
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
                    <EditableText isEditing={isEditing} as="p" className="font-bold text-foreground">Dr. Lisa Patel</EditableText>
                    <EditableText isEditing={isEditing} as="p" className="text-sm text-muted-foreground">General Dentist, Australia</EditableText>
                  </div>
                </div>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground italic mb-4">
                  "I was nervous about endodontics before this course. Now I confidently locate MB2 canals and haven't had a single perforation in 6 months. Patients notice the difference!"
                </EditableText>
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
                    <EditableText isEditing={isEditing} as="p" className="font-bold text-foreground">Dr. Ahmed Rahman</EditableText>
                    <EditableText isEditing={isEditing} as="p" className="text-sm text-muted-foreground">Endodontist, India</EditableText>
                  </div>
                </div>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground italic mb-4">
                  "The systematic approach taught in this masterclass is brilliant. My treatment time has decreased by 40% while my success rate has improved dramatically."
                </EditableText>
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
                    <EditableText isEditing={isEditing} as="p" className="font-bold text-foreground">Dr. Giovanni Rossi</EditableText>
                    <EditableText isEditing={isEditing} as="p" className="text-sm text-muted-foreground">General Dentist, Italy</EditableText>
                  </div>
                </div>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground italic mb-4">
                  "Exceptional training! The perforation prevention techniques alone saved me thousands in potential complications. Worth every penny and more."
                </EditableText>
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
                    <EditableText isEditing={isEditing} as="p" className="font-bold text-foreground">Dr. Emma Johnson</EditableText>
                    <EditableText isEditing={isEditing} as="p" className="text-sm text-muted-foreground">Dental Resident, UK</EditableText>
                  </div>
                </div>
                <EditableText isEditing={isEditing} as="p" className="text-muted-foreground italic mb-4">
                  "As a recent graduate, this masterclass gave me the confidence I needed. The techniques are clear, practical, and immediately applicable. Highly recommended!"
                </EditableText>
                <div className="flex text-yellow-500 text-lg">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This Course For Section - NEW */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Who Is This <span className="text-primary">Course For?</span>
              </EditableText>
              <EditableText isEditing={isEditing} as="p" className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our proven system works for dentists at every stage of their career
              </EditableText>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Dental Students */}
              <Card className="p-8 text-center hover:scale-105 transition-all duration-300 brand-shadow bg-gradient-to-b from-primary/5 to-primary/10">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                  <EditableText isEditing={isEditing} as="h3" className="text-2xl font-bold text-foreground mb-4">Dental Students</EditableText>
                  <EditableText isEditing={isEditing} as="p" className="text-muted-foreground leading-relaxed">
                    About to start practicing and want to build confidence in endodontics from day one. Get the foundation you need to succeed.
                  </EditableText>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Build confidence early</EditableText>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Learn proper techniques</EditableText>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Avoid common mistakes</EditableText>
                  </div>
                </div>
              </Card>

              {/* Beginner Dentists */}
              <Card className="p-8 text-center hover:scale-105 transition-all duration-300 brand-shadow bg-gradient-to-b from-accent/5 to-accent/10">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-accent" />
                  </div>
                  <EditableText isEditing={isEditing} as="h3" className="text-2xl font-bold text-foreground mb-4">Beginner Dentists</EditableText>
                  <EditableText isEditing={isEditing} as="p" className="text-muted-foreground leading-relaxed">
                    In your first 5 years of practice and want to master endodontics quickly. Perfect your technique and boost your confidence.
                  </EditableText>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Accelerate your learning</EditableText>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Reduce treatment time</EditableText>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Increase success rates</EditableText>
                  </div>
                </div>
              </Card>

              {/* Experienced Dentists */}
              <Card className="p-8 text-center hover:scale-105 transition-all duration-300 brand-shadow bg-gradient-to-b from-primary/5 to-primary/10">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                  <EditableText isEditing={isEditing} as="h3" className="text-2xl font-bold text-foreground mb-4">Experienced Dentists</EditableText>
                  <EditableText isEditing={isEditing} as="p" className="text-muted-foreground leading-relaxed">
                    Many years of experience but using older techniques. Ready to modernize your approach and reduce stress in your practice.
                  </EditableText>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Modern techniques</EditableText>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Reduce stress</EditableText>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <EditableText isEditing={isEditing} as="span">Stay current</EditableText>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Redesigned */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Master the <span className="text-primary">3-Step System</span>
              </EditableText>
              <EditableText isEditing={isEditing} as="p" className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn the exact techniques that have helped 2,000+ dentists eliminate missed canals forever
              </EditableText>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <Card className="p-8 border-l-4 border-l-primary bg-primary/5 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <EditableText isEditing={isEditing} as="h3" className="text-xl font-bold mb-3 text-foreground">Systematic Canal Location</EditableText>
                      <EditableText isEditing={isEditing} as="p" className="text-muted-foreground leading-relaxed">
                        Master the proven 3-step approach to locate every canal, including the challenging MB2. Never miss a canal again with our systematic methodology.
                      </EditableText>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 border-l-4 border-l-accent bg-accent/5 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <EditableText isEditing={isEditing} as="h3" className="text-xl font-bold mb-3 text-foreground">Perforation Prevention</EditableText>
                      <EditableText isEditing={isEditing} as="p" className="text-muted-foreground leading-relaxed">
                        Learn to recognize early warning signs and implement proven prevention strategies. Eliminate the fear of perforations once and for all.
                      </EditableText>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 border-l-4 border-l-primary bg-primary/5 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div>
                      <EditableText isEditing={isEditing} as="h3" className="text-xl font-bold mb-3 text-foreground">Calcification Management</EditableText>
                      <EditableText isEditing={isEditing} as="p" className="text-muted-foreground leading-relaxed">
                        Advanced techniques for navigating the most challenging calcified canals and complex anatomical variations with confidence.
                      </EditableText>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="text-center">
                <div className="relative">
                  <EditableImage src="https://d1yei2z3i6k35z.cloudfront.net/11922468/687672e4434d1_version4-min.png" alt="Dr. Roitman teaching endodontics" className="rounded-2xl brand-shadow max-w-full h-auto" isEditing={isEditing} />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-20 h-20 bg-primary/90 hover:bg-primary text-primary-foreground animate-pulse-glow">
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                  
                  {/* Instructor Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 brand-shadow">
                    <div className="flex items-center gap-3">
                      <EditableImage src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" alt="Dr. Roitman" className="w-12 h-12 rounded-full" isEditing={isEditing} />
                      <div>
                        <EditableText isEditing={isEditing} as="p" className="font-bold text-foreground">Dr. Roitman</EditableText>
                        <EditableText isEditing={isEditing} as="p" className="text-sm text-primary">Live Training</EditableText>
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
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Frequently Asked <span className="text-primary">Questions</span>
              </EditableText>
              <EditableText isEditing={isEditing} as="p" className="text-xl text-muted-foreground">
                Everything you need to know about the masterclass
              </EditableText>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="experience" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <EditableText isEditing={isEditing} as="span">What level of experience is required for this masterclass?</EditableText>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <EditableText isEditing={isEditing} as="span">This masterclass is designed for dentists of all experience levels. Whether you're a recent graduate or an experienced practitioner, you'll learn valuable techniques. The content is structured to be accessible for beginners while providing advanced insights for experienced dentists.</EditableText>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="credits" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <EditableText isEditing={isEditing} as="span">Will I receive CE credits for attending?</EditableText>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <EditableText isEditing={isEditing} as="span">Yes! This masterclass provides 1.5 hours of continuing education credits. You'll receive your CE certificate immediately after completing the session. The course is approved by major dental education bodies.</EditableText>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="recording" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <EditableText isEditing={isEditing} as="span">What if I can't attend the live session?</EditableText>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <EditableText isEditing={isEditing} as="span">No problem! Every session is recorded and you'll have lifetime access to the recording. You can watch at your own pace and refer back to the material whenever needed. The recording will be available within 24 hours of the live session.</EditableText>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="equipment" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <EditableText isEditing={isEditing} as="span">What equipment or materials do I need?</EditableText>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <EditableText isEditing={isEditing} as="span">You just need a computer, tablet, or smartphone with internet access to join the Zoom session. We'll provide downloadable resources including procedure checklists, reference guides, and step-by-step protocols that you can use in your practice.</EditableText>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="questions" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <EditableText isEditing={isEditing} as="span">Can I ask questions during the masterclass?</EditableText>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <EditableText isEditing={isEditing} as="span">Absolutely! The last 30 minutes are dedicated to Q&A where Dr. Roitman personally answers your questions. You can submit questions throughout the presentation via chat, and there will be opportunities for live discussion.</EditableText>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="guarantee" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  <EditableText isEditing={isEditing} as="span">Is there a money-back guarantee?</EditableText>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  <EditableText isEditing={isEditing} as="span">Yes! We offer a 100% satisfaction guarantee. If you're not completely satisfied with the masterclass content, contact us within 30 days for a full refund. We're confident you'll find tremendous value in Dr. Roitman's proven techniques.</EditableText>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
              
              <EditableText isEditing={isEditing} as="h2" className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Don't Miss This
                <span className="block text-accent-glow">Opportunity!</span>
              </EditableText>
              
              <div className="max-w-3xl mx-auto mb-12">
                <EditableText isEditing={isEditing} as="p" className="text-xl lg:text-2xl text-white font-medium mb-6">
                  Join 2,000+ dentists who have transformed their practice with our proven system
                </EditableText>
                
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md mx-auto mb-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Timer className="w-6 h-6 text-accent" />
                      <EditableText isEditing={isEditing} as="span" className="text-white font-bold">Only 47 spots remaining!</EditableText>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-2xl text-white/60 line-through">€97</span>
                      <span className="text-5xl font-black text-accent-glow">€27</span>
                    </div>
                    <EditableText isEditing={isEditing} as="p" className="text-white/90 font-medium">Early Bird Special Ends Soon!</EditableText>
                  </div>
                  
                  <div className="space-y-3 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <EditableText isEditing={isEditing} as="span">60-minute live masterclass</EditableText>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <EditableText isEditing={isEditing} as="span">30-minute Q&A session</EditableText>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <EditableText isEditing={isEditing} as="span">Lifetime access to recording</EditableText>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <EditableText isEditing={isEditing} as="span">Downloadable resources</EditableText>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <EditableText isEditing={isEditing} as="span">CE credits included</EditableText>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                      <EditableText isEditing={isEditing} as="span">100% money-back guarantee</EditableText>
                    </div>
                  </div>
                </div>
                
                <EditableText isEditing={isEditing} as="p" className="text-2xl lg:text-3xl text-white font-bold">
                  Select your preferred time slot below and secure your spot now!
                </EditableText>
              </div>
            </div>
            
            {/* Calendly Widget */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white/95 backdrop-blur-sm border border-white/20">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    <EditableText isEditing={isEditing} as="span">Choose Your Time Slot</EditableText>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    <EditableText isEditing={isEditing} as="span">Select the time that works best for your schedule</EditableText>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendlyWidget url="https://calendly.com/endoclub/new-meeting-1" className="min-h-[700px] w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <EditableImage src="https://d1yei2z3i6k35z.cloudfront.net/11922468/67ec02d73e2cb_459061577_884924966845685_6646581295662297536_n.jpg" alt="LearnEndo.io Logo" className="w-12 h-12 rounded-full" isEditing={isEditing} />
                <EditableText isEditing={isEditing} as="span" className="text-2xl font-bold text-foreground">LearnEndo.io</EditableText>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <a href="#" className="hover:text-primary transition-colors">
                  <EditableText isEditing={isEditing} as="span">Privacy Policy</EditableText>
                </a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  <EditableText isEditing={isEditing} as="span">Cookie Policy</EditableText>
                </a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  <EditableText isEditing={isEditing} as="span">Terms and Conditions</EditableText>
                </a>
              </div>
              
              <div className="text-center text-muted-foreground">
                <EditableText isEditing={isEditing} as="p" className="mb-2">© 2025 LearnEndo.io. All rights reserved.</EditableText>
                <EditableText isEditing={isEditing} as="p" className="text-sm">Transforming dental education worldwide</EditableText>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;