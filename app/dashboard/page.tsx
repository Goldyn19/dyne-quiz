import { Navigation } from "@/components/custom/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome to your quiz dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Quizzes Taken
                  <Badge variant="secondary">24</Badge>
                </CardTitle>
                <CardDescription>
                  Total quizzes you&apos;ve participated in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">24</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Average Score
                  <Badge variant="secondary">85%</Badge>
                </CardTitle>
                <CardDescription>
                  Your average performance across all quizzes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">85%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Rank
                  <Badge variant="outline">#42</Badge>
                </CardTitle>
                <CardDescription>
                  Your current ranking among all players
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">#42</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Top 10% of players
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Completed &quot;JavaScript Basics&quot;</p>
                      <p className="text-sm text-muted-foreground">
                        Score: 92% • 2 hours ago
                      </p>
                    </div>
                    <Badge variant="secondary">92%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Joined &quot;Math Challenge&quot;</p>
                      <p className="text-sm text-muted-foreground">
                        Started • 1 day ago
                      </p>
                    </div>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Created &quot;History Quiz&quot;</p>
                      <p className="text-sm text-muted-foreground">
                        Published • 3 days ago
                      </p>
                    </div>
                    <Badge variant="secondary">Creator</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 