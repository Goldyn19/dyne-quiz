import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  badges?: string[];
}

export function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  badges = [],
}: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {title}
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="px-8 py-3 text-lg">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
            {secondaryAction && (
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            )}
          </div>
          
          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 