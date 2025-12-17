import { TaskFlowLogo } from "@/components/custom-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Filter,
  ListTodo,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col animated-gradient relative">
      <div className="absolute inset-0 mesh-gradient"></div>
      <div className="relative z-10">
        <header className="border-b border-border bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-sm sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <TaskFlowLogo />
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="#features"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#about"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="lg">
                  Login
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32 lg:py-40">
            <div className="flex max-w-[64rem] flex-col items-center gap-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border-2 border-primary/20 shadow-lg backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Modern Task Management
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Manage Your Tasks with{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Style & Efficiency
                </span>
              </h1>
              <p className="text-pretty max-w-[42rem] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                A powerful and beautiful task management application that helps you organize, prioritize, and complete
                your work efficiently. Built with modern technologies for the best experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    className="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all text-lg px-8 h-14"
                  >
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-2 bg-transparent">
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Free forever
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-border bg-muted/30 py-20" id="features">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Everything you need to stay productive
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Powerful features designed to help you manage tasks efficiently and boost your productivity
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-2 hover:shadow-xl transition-all hover:border-primary/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-bl-full"></div>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary mb-4">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Complete Task Management</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Create, update, delete, and organize tasks with an intuitive interface. Track your progress in
                        real-time with visual indicators.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:shadow-xl transition-all hover:border-purple-500/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full"></div>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 mb-4">
                        <Filter className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Smart Filtering</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Filter by status, priority, and search through your tasks instantly. Find what you need in
                        seconds.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:shadow-xl transition-all hover:border-green-500/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full"></div>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 mb-4">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Secure Authentication</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Your data is protected with industry-standard security. Secure login and registration with email
                        verification.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:shadow-xl transition-all hover:border-yellow-500/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full"></div>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Priority Management</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Set priorities for your tasks and focus on what matters most. Visualize urgency with color-coded
                        badges.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:shadow-xl transition-all hover:border-blue-500/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full"></div>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 mb-4">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Due Date Tracking</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Never miss a deadline. Set due dates and get a clear overview of upcoming tasks and commitments.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:shadow-xl transition-all hover:border-secondary/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 gradient-info opacity-10 rounded-bl-full"></div>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-info mb-4">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Lightning Fast</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Built with the latest technologies for blazing fast performance. Responsive design works on all
                        devices.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="container py-20" id="about">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  About TaskFlow
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We're on a mission to help teams and individuals work smarter, not harder
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                <Card className="border-2 hover:shadow-xl transition-all bg-white">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary mb-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Our Mission</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      To empower individuals and teams with intuitive tools that simplify task management and boost
                      productivity across all industries.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-2 hover:shadow-xl transition-all bg-white">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Our Team</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      A passionate group of developers, designers, and productivity enthusiasts dedicated to creating
                      the best task management experience.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-2 hover:shadow-xl transition-all bg-white">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 mb-4">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Our Values</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Simplicity, security, and user experience are at the core of everything we build. Your success is
                      our success.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card className="border-2 bg-white overflow-hidden">
                <CardContent className="py-12 px-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Why Choose TaskFlow?</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        TaskFlow was built from the ground up with modern technologies and best practices. We understand
                        that task management isn't just about lists – it's about helping you achieve your goals
                        efficiently and with clarity.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Built with cutting-edge technology stack</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Enterprise-grade security and data protection</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Responsive design that works on any device</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Regular updates and new features</span>
                        </li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-xl gradient-primary text-white">
                        <div className="text-3xl font-bold mb-2">10K+</div>
                        <div className="text-sm opacity-90">Active Users</div>
                      </div>
                      <div className="p-6 rounded-xl bg-purple-500 text-white">
                        <div className="text-3xl font-bold mb-2">50K+</div>
                        <div className="text-sm opacity-90">Tasks Completed</div>
                      </div>
                      <div className="p-6 rounded-xl bg-green-500 text-white">
                        <div className="text-3xl font-bold mb-2">99.9%</div>
                        <div className="text-sm opacity-90">Uptime</div>
                      </div>
                      <div className="p-6 rounded-xl bg-yellow-500 text-white">
                        <div className="text-3xl font-bold mb-2">4.9/5</div>
                        <div className="text-sm opacity-90">User Rating</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="border-t border-border bg-muted/30 py-20" id="pricing">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Simple, Transparent Pricing
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose the plan that's right for you. Start free and upgrade as you grow.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  <Card className="border-2 hover:shadow-xl transition-all bg-white">
                    <CardHeader>
                      <CardTitle className="text-2xl">Free</CardTitle>
                      <CardDescription>Perfect for individuals</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$0</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Up to 50 tasks</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Basic filtering & search</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Email support</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Mobile responsive</span>
                        </li>
                      </ul>
                      <Link href="/auth/sign-up">
                        <Button variant="outline" className="w-full bg-transparent">
                          Get Started
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:shadow-xl transition-all bg-white relative overflow-hidden border-primary">
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1">
                      POPULAR
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">Pro</CardTitle>
                      <CardDescription>For growing teams</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$12</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Unlimited tasks</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Advanced filtering & analytics</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Priority support</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Team collaboration (up to 10)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Custom labels & tags</span>
                        </li>
                      </ul>
                      <Link href="/auth/sign-up">
                        <Button className="w-full gradient-primary text-white">Start Free Trial</Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:shadow-xl transition-all bg-white">
                    <CardHeader>
                      <CardTitle className="text-2xl">Enterprise</CardTitle>
                      <CardDescription>For large organizations</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">Custom</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Everything in Pro</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Unlimited team members</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Dedicated account manager</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Custom integrations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">99.9% SLA guarantee</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full bg-transparent">
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="container py-20" id="contact">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 bg-white">
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          placeholder="How can we help?"
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Tell us more..."
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                      </div>
                      <Button type="submit" className="w-full gradient-primary text-white">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-2 bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary flex-shrink-0">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-sm text-muted-foreground">support@taskflow.com</p>
                          <p className="text-sm text-muted-foreground">sales@taskflow.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 flex-shrink-0">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Phone</h3>
                          <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                          <p className="text-sm text-muted-foreground">Mon-Fri 9am-6pm EST</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 flex-shrink-0">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Office</h3>
                          <p className="text-sm text-muted-foreground">123 Business Street</p>
                          <p className="text-sm text-muted-foreground">San Francisco, CA 94102</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="container py-20">
            <Card className="border-2 overflow-hidden relative">
              <div className="absolute inset-0 gradient-primary opacity-5"></div>
              <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center relative z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-3">Ready to get organized?</h2>
                <p className="text-lg text-muted-foreground max-w-xl mb-8">
                  Join thousands of users who are already managing their tasks more efficiently with TaskFlow
                </p>
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    className="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all text-lg px-8 h-14"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className="border-t border-border py-8 bg-muted/30">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <ListTodo className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">TaskFlow</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">© 2025 TaskFlow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
