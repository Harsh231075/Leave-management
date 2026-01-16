import { Link } from "react-router-dom";
import { Building2, Users, Calendar, Clock, ChevronRight, Shield, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Leave Management",
      description: "Easily apply for leaves, track balances, and manage approvals"
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description: "Mark daily attendance and view comprehensive attendance history"
    },
    {
      icon: Users,
      title: "Employee Directory",
      description: "Access complete employee profiles and organizational data"
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Get insights with detailed reports and visual dashboards"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure access control for employees and administrators"
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Instant notifications for leave approvals and status changes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HR Portal</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="gradient-primary text-primary-foreground">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Streamline Your HR Operations
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Employee Leave & Attendance{" "}
            <span className="text-primary">Management System</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive HR solution to manage employee leaves, track attendance, 
            and streamline administrative tasks with ease.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/employee">
              <Button size="lg" className="gradient-primary text-primary-foreground px-8">
                Employee Portal
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="px-8">
                Admin Portal
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Everything You Need</h2>
            <p className="mt-3 text-muted-foreground">
              Powerful features to manage your workforce efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              Ready to streamline your HR operations?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Get started today and experience the difference
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="px-8">
                  Create Account
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">HR Portal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HR Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
