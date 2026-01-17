import { Link, useNavigate } from "react-router-dom";
import { Building2, Users, Calendar, Clock, ChevronRight, Shield, Zap, BarChart3, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { toast } = useToast();
  const features = [
    {
      icon: Calendar,
      title: "Leave Management",
      description: "Easily apply for leaves, track balances, and manage approvals",
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description: "Mark daily attendance and view comprehensive attendance history",
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Users,
      title: "Employee Directory",
      description: "Access complete employee profiles and organizational data",
      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Get insights with detailed reports and visual dashboards",
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure access control for employees and administrators",
      gradient: "from-indigo-500/10 to-blue-500/10"
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Instant notifications for leave approvals and status changes",
      gradient: "from-yellow-500/10 to-orange-500/10"
    }
  ];

  const stats = [
    { label: "Active Users", value: "500+", icon: Users },
    { label: "Leaves Processed", value: "10k+", icon: CheckCircle2 },
    { label: "Time Saved", value: "80%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-border/50 bg-card/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">HR Portal</span>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="hover:bg-primary/5">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                    Get Started
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary text-sm font-medium mb-8 hover:scale-105 transition-transform duration-300">
              <Zap className="h-4 w-4" />
              Streamline Your HR Operations
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight max-w-5xl mx-auto">
              Employee Leave & Attendance{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Management System
              </span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive HR solution to manage employee leaves, track attendance,
              and streamline administrative tasks with ease.
            </p>
            {/* Portal buttons removed per request */}

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Everything You Need</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features to manage your workforce efficiently
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 sm:p-16 text-center shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                  Ready to streamline your HR operations?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                  Get started today and experience the difference with our modern HR management platform
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" variant="secondary" className="px-8 bg-white hover:bg-white/90 text-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Create Account
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="ghost" className="px-8 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all duration-300">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">HR Portal</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground">
                <a href="https://hrms.harshbaghel.me" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Live Demo
                </a>
                <span className="hidden sm:inline">•</span>
                <p>
                  © 2024 HR Portal. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
