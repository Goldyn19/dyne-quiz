import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
  variant?: "default" | "primary" | "secondary" | "accent";
}

export function FeatureCard({
  icon,
  title,
  description,
  tags = [],
  variant = "default",
}: FeatureCardProps) {
  const variantStyles = {
    default: "border-border hover:border-primary/50",
    primary: "border-primary/20 bg-primary/5 hover:border-primary/50",
    secondary: "border-secondary/20 bg-secondary/5 hover:border-secondary/50",
    accent: "border-accent/20 bg-accent/5 hover:border-accent/50",
  };

  const iconStyles = {
    default: "text-primary",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${variantStyles[variant]}`}>
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconStyles[variant]} bg-card border`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold text-card-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 