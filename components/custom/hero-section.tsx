import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  features?: string[];
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  features = [],
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 via-secondary/10 to-accent/5 py-20 pt-32">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-background"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-enhanced-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl animate-enhanced-pulse animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl animate-enhanced-pulse animation-delay-4000"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-sm">
            {subtitle}
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary via-accent to-primary bg-clip-text text-transparent mb-6 animate-pulse">
            {title}
          </h1>
          
          <p className="text-xl text-neutral-dark mb-8 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
            {secondaryAction && (
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300">
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            )}
          </div>
          
                      {features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-accent text-accent-foreground">
                    {feature}
                  </Badge>
                ))}
              </div>
            )}
        </div>
      </div>
    </section>
  );
} 