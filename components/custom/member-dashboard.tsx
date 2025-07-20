import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MemberDashboard() {
  return (
    <>
      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quizzes Taken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,420</div>
            <p className="text-xs text-muted-foreground mt-1">
              +120 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#1</div>
            <p className="text-xs text-muted-foreground mt-1">
              Top performer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Available Quizzes & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Available Quizzes
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
            <CardDescription>
              Quizzes you can take right now
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">JavaScript Basics</p>
                <p className="text-sm text-muted-foreground">20 questions • 30 min</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">Available</Badge>
                <p className="text-xs text-muted-foreground mt-1">Not taken</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Python Fundamentals</p>
                <p className="text-sm text-muted-foreground">25 questions • 45 min</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">Available</Badge>
                <p className="text-xs text-muted-foreground mt-1">Not taken</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Data Science</p>
                <p className="text-sm text-muted-foreground">30 questions • 60 min</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">Locked</Badge>
                <p className="text-xs text-muted-foreground mt-1">Complete JS first</p>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              Browse All Quizzes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest quiz activities and achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed &quot;Math Challenge&quot;</p>
                <p className="text-xs text-muted-foreground">Score: 96% • 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Earned &quot;Speed Demon&quot; badge</p>
                <p className="text-xs text-muted-foreground">Completed quiz in 15 min • 1 day ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Moved to #1 on leaderboard</p>
                <p className="text-xs text-muted-foreground">JavaScript category • 2 days ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Unlocked &quot;History Expert&quot;</p>
                <p className="text-xs text-muted-foreground">Perfect score on History Quiz • 3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Your quiz performance over time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">JavaScript</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  <span className="text-sm font-bold">96%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Python</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-sm font-bold">88%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Math</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-bold">92%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">History</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm font-bold">100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>
              Badges and accomplishments earned
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">🏆</span>
                </div>
                <p className="text-sm font-medium">Top Performer</p>
                <p className="text-xs text-muted-foreground">#1 on leaderboard</p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <p className="text-sm font-medium">Speed Demon</p>
                <p className="text-xs text-muted-foreground">Fast completion</p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">🎯</span>
                </div>
                <p className="text-sm font-medium">Perfect Score</p>
                <p className="text-xs text-muted-foreground">100% accuracy</p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">📚</span>
                </div>
                <p className="text-sm font-medium">Scholar</p>
                <p className="text-xs text-muted-foreground">10+ quizzes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboards & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              Top performers in your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  You
                </div>
                <div>
                  <p className="font-medium">You (John Doe)</p>
                  <p className="text-xs text-muted-foreground">94% average</p>
                </div>
              </div>
              <Badge variant="secondary">#1</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  JS
                </div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-xs text-muted-foreground">91% average</p>
                </div>
              </div>
              <Badge variant="outline">#2</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                  MJ
                </div>
                <div>
                  <p className="font-medium">Mike Johnson</p>
                  <p className="text-xs text-muted-foreground">88% average</p>
                </div>
              </div>
              <Badge variant="outline">#3</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Tracking</CardTitle>
            <CardDescription>
              Your learning journey and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quizzes Completed</span>
                <span className="text-sm font-bold">15 / 20</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Categories Mastered</span>
                <span className="text-sm font-bold">3 / 5</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Achievement Rate</span>
                <span className="text-sm font-bold">80%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">Next Milestone</p>
              <p className="text-xs text-muted-foreground">
                Complete 5 more quizzes to unlock &quot;Quiz Master&quot; badge
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz History */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz History</CardTitle>
          <CardDescription>
            Your recent quiz attempts and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Quiz Name</th>
                  <th className="text-left py-3 px-4 font-medium">Score</th>
                  <th className="text-left py-3 px-4 font-medium">Time Spent</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Math Challenge</td>
                  <td className="py-3 px-4"><Badge variant="secondary">96%</Badge></td>
                  <td className="py-3 px-4">18 min</td>
                  <td className="py-3 px-4">2 hours ago</td>
                  <td className="py-3 px-4"><Badge variant="outline">Completed</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">History Quiz</td>
                  <td className="py-3 px-4"><Badge variant="secondary">100%</Badge></td>
                  <td className="py-3 px-4">25 min</td>
                  <td className="py-3 px-4">1 day ago</td>
                  <td className="py-3 px-4"><Badge variant="outline">Completed</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">JavaScript Basics</td>
                  <td className="py-3 px-4"><Badge variant="secondary">94%</Badge></td>
                  <td className="py-3 px-4">22 min</td>
                  <td className="py-3 px-4">3 days ago</td>
                  <td className="py-3 px-4"><Badge variant="outline">Completed</Badge></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Python Fundamentals</td>
                  <td className="py-3 px-4"><Badge variant="secondary">88%</Badge></td>
                  <td className="py-3 px-4">35 min</td>
                  <td className="py-3 px-4">1 week ago</td>
                  <td className="py-3 px-4"><Badge variant="outline">Completed</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
} 