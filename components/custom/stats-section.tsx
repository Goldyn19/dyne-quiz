import { Card, CardContent } from "@/components/ui/card";

interface StatItem {
  value: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  title: string;
  subtitle: string;
  stats: StatItem[];
}

export function StatsSection({ title, subtitle, stats }: StatsSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-light/10 to-secondary-light/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-card">
              <CardContent className="p-6">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-card-foreground mb-1">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 