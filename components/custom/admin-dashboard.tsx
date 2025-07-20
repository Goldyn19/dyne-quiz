import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AdminDashboard() {
  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground mt-1">
              +89 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Organization Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Organization Overview
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </CardTitle>
            <CardDescription>
              Monitor organization settings and member activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-muted-foreground">12 members online</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">Live</Badge>
                <p className="text-xs text-muted-foreground mt-1">Real-time</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Pending Invitations</p>
                <p className="text-sm text-muted-foreground">5 new members</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">5</Badge>
                <p className="text-xs text-muted-foreground mt-1">Awaiting</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Storage Usage</p>
                <p className="text-sm text-muted-foreground">2.4 GB / 10 GB</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">24%</Badge>
                <p className="text-xs text-muted-foreground mt-1">Used</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common admin tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              👥 Invite Members
            </Button>
            <Button className="w-full justify-start" variant="outline">
              📊 Generate Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              🔍 Monitor Sessions
            </Button>
            <Button className="w-full justify-start" variant="outline">
              📤 Export Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Quiz Management
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
          <CardDescription>
            Manage and monitor your organization&apos;s quizzes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">JavaScript Basics</p>
              <p className="text-sm text-muted-foreground">156 participants</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary">Active</Badge>
              <p className="text-xs text-muted-foreground mt-1">Avg: 82%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Math Challenge</p>
              <p className="text-sm text-muted-foreground">89 participants</p>
            </div>
            <div className="text-right">
              <Badge variant="outline">Draft</Badge>
              <p className="text-xs text-muted-foreground mt-1">Not published</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">History Quiz</p>
              <p className="text-sm text-muted-foreground">203 participants</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary">Active</Badge>
              <p className="text-xs text-muted-foreground mt-1">Avg: 76%</p>
            </div>
          </div>

          <Button className="w-full" variant="outline">
            + Create New Quiz
          </Button>
        </CardContent>
      </Card>

      {/* Analytics & Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest admin actions and system events
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New quiz created</p>
                <p className="text-xs text-muted-foreground">&quot;Python Fundamentals&quot; • 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Member invited</p>
                <p className="text-xs text-muted-foreground">jane.smith@company.com • 4 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Settings updated</p>
                <p className="text-xs text-muted-foreground">Quiz time limits changed • 1 day ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Report generated</p>
                <p className="text-xs text-muted-foreground">Monthly analytics report • 2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Monitoring</CardTitle>
            <CardDescription>
              Active user sessions and system status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Taking JavaScript Quiz</p>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  JS
                </div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-xs text-muted-foreground">Viewing Dashboard</p>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                  MJ
                </div>
                <div>
                  <p className="font-medium">Mike Johnson</p>
                  <p className="text-xs text-muted-foreground">Completed Math Quiz</p>
                </div>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comprehensive Analytics</CardTitle>
          <CardDescription>
            Detailed statistics for all quizzes and members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Quiz Name</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Participants</th>
                  <th className="text-left py-3 px-4 font-medium">Avg Score</th>
                  <th className="text-left py-3 px-4 font-medium">Completion Rate</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">JavaScript Basics</td>
                  <td className="py-3 px-4"><Badge variant="secondary">Active</Badge></td>
                  <td className="py-3 px-4">156</td>
                  <td className="py-3 px-4">82%</td>
                  <td className="py-3 px-4">94%</td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Math Challenge</td>
                  <td className="py-3 px-4"><Badge variant="outline">Draft</Badge></td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Edit</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">History Quiz</td>
                  <td className="py-3 px-4"><Badge variant="secondary">Active</Badge></td>
                  <td className="py-3 px-4">203</td>
                  <td className="py-3 px-4">76%</td>
                  <td className="py-3 px-4">87%</td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Python Fundamentals</td>
                  <td className="py-3 px-4"><Badge variant="secondary">Active</Badge></td>
                  <td className="py-3 px-4">89</td>
                  <td className="py-3 px-4">79%</td>
                  <td className="py-3 px-4">92%</td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
} 