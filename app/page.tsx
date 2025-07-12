import { Separator } from "@/components/ui/separator";
import { 
  Navigation,
  HeroSection,
  FeatureCard,
  StatsSection,
  CTASection,
  Footer,
  UsersIcon, 
  TrophyIcon, 
  ZapIcon, 
  TargetIcon, 
  GlobeIcon, 
  ShieldIcon 
} from "@/components/custom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <HeroSection
        title="Quiz Together"
        subtitle="Multiplayer Quiz Platform"
        description="Challenge your friends in real-time multiplayer quizzes. Test your knowledge, compete for high scores, and have fun learning together in an engaging interactive environment."
        primaryAction={{
          label: "Start Playing",
          href: "/play"
        }}
        secondaryAction={{
          label: "Learn More",
          href: "/about"
        }}
        features={["Real-time", "Multiplayer", "Leaderboards", "Custom Quizzes"]}
      />

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Quiz Together?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the ultimate multiplayer quiz platform with cutting-edge features designed for learning and fun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<UsersIcon />}
              title="Real-time Multiplayer"
              description="Play with friends and family in real-time. See live scores, compete for the top spot, and enjoy the thrill of simultaneous competition."
              tags={["Live", "Multiplayer", "Real-time"]}
              variant="primary"
            />
            
            <FeatureCard
              icon={<TrophyIcon />}
              title="Leaderboards & Achievements"
              description="Track your progress with detailed leaderboards, earn achievements, and climb the ranks to become the ultimate quiz champion."
              tags={["Leaderboards", "Achievements", "Progress"]}
              variant="secondary"
            />
            
            <FeatureCard
              icon={<ZapIcon />}
              title="Lightning Fast"
              description="Built with modern technology for instant responses, smooth animations, and seamless gameplay experience across all devices."
              tags={["Fast", "Responsive", "Modern"]}
              variant="accent"
            />
            
            <FeatureCard
              icon={<TargetIcon />}
              title="Custom Quizzes"
              description="Create your own quizzes or choose from thousands of pre-made questions across various categories and difficulty levels."
              tags={["Custom", "Categories", "Difficulty"]}
              variant="primary"
            />
            
            <FeatureCard
              icon={<GlobeIcon />}
              title="Global Community"
              description="Join a worldwide community of quiz enthusiasts. Connect with players from around the globe and share your knowledge."
              tags={["Global", "Community", "Connect"]}
              variant="secondary"
            />
            
            <FeatureCard
              icon={<ShieldIcon />}
              title="Secure & Reliable"
              description="Your data is protected with enterprise-grade security. Enjoy worry-free gaming with our reliable infrastructure."
              tags={["Secure", "Reliable", "Protected"]}
              variant="accent"
            />
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Stats Section */}
      <section id="stats">
        <StatsSection
        title="Join the Quiz Revolution"
        subtitle="See what makes us the leading multiplayer quiz platform"
        stats={[
          {
            value: "10K+",
            label: "Active Players",
            description: "Daily active users"
          },
          {
            value: "50K+",
            label: "Quizzes Created",
            description: "User-generated content"
          },
          {
            value: "1M+",
            label: "Questions Answered",
            description: "Knowledge shared"
          },
          {
            value: "99.9%",
            label: "Uptime",
            description: "Reliable service"
          }
        ]}
        />
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Quiz Journey?"
        description="Join thousands of players worldwide and experience the most engaging multiplayer quiz platform. Create an account now and start competing with friends!"
        primaryAction={{
          label: "Get Started Free",
          href: "/signup"
        }}
        secondaryAction={{
          label: "Browse Quizzes",
          href: "/quizzes"
        }}
        badges={["No Credit Card Required", "Free Forever", "Instant Access"]}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
