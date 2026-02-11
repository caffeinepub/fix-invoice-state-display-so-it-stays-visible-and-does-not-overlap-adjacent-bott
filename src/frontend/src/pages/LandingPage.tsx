import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, FileText, IndianRupee, Zap, Shield, Download, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-indian-green/10 text-indian-green hover:bg-indian-green/20">
              India's #1 Free GST Invoice Generator
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Generate{' '}
              <span className="bg-gradient-to-r from-indian-saffron to-indian-orange bg-clip-text text-transparent">
                GST-Compliant
              </span>{' '}
              Invoices in Seconds
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Perfect for Indian freelancers, small businesses, and shop owners. Create professional invoices with
              automatic CGST, SGST, and IGST calculations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/create-invoice">
                <Button size="lg" className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                  <FileText className="mr-2 h-5 w-5" />
                  Create Free Invoice
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  <IndianRupee className="mr-2 h-5 w-5" />
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for GST Invoicing</h2>
            <p className="text-muted-foreground">
              Powerful features designed specifically for Indian businesses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 hover:border-indian-orange/50 transition-colors">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indian-saffron/10">
                  <Zap className="h-6 w-6 text-indian-saffron" />
                </div>
                <CardTitle>Auto GST Calculation</CardTitle>
                <CardDescription>
                  Automatic CGST & SGST for intra-state, IGST for inter-state transactions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-indian-orange/50 transition-colors">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indian-green/10">
                  <Shield className="h-6 w-6 text-indian-green" />
                </div>
                <CardTitle>GST Compliant</CardTitle>
                <CardDescription>
                  All invoices follow GST regulations with proper GSTIN validation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-indian-orange/50 transition-colors">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indian-blue/10">
                  <Download className="h-6 w-6 text-indian-blue" />
                </div>
                <CardTitle>PDF Download</CardTitle>
                <CardDescription>
                  Download professional PDF invoices instantly, ready to send to clients
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-indian-orange/50 transition-colors">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indian-orange/10">
                  <FileText className="h-6 w-6 text-indian-orange" />
                </div>
                <CardTitle>Business Logo</CardTitle>
                <CardDescription>
                  Upload your business logo to create branded, professional invoices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-indian-orange/50 transition-colors">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indian-saffron/10">
                  <Users className="h-6 w-6 text-indian-saffron" />
                </div>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>
                  Save client details for quick invoice generation (Pro plan)
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-indian-orange/50 transition-colors">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indian-green/10">
                  <IndianRupee className="h-6 w-6 text-indian-green" />
                </div>
                <CardTitle>Free to Start</CardTitle>
                <CardDescription>
                  Generate up to 10 invoices per month absolutely free, no credit card required
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Free Plan</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>10 invoices per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>GST calculations (CGST, SGST, IGST)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>PDF download</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>Business logo upload</span>
                  </li>
                </ul>
                <Link to="/create-invoice" className="mt-6 block">
                  <Button className="w-full" variant="outline">
                    Start Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-indian-orange relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-indian-saffron to-indian-orange text-white px-4 py-1 text-sm font-medium">
                Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro Plan</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span className="font-medium">Unlimited invoices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>Remove branding watermark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>Save clients & products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>Invoice history & search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indian-green mt-0.5" />
                    <span>Export to CSV/Excel</span>
                  </li>
                </ul>
                <Link to="/pricing" className="mt-6 block">
                  <Button className="w-full bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center bg-gradient-to-br from-indian-saffron/10 to-indian-orange/10 rounded-2xl p-12 border-2 border-indian-orange/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your First Invoice?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of Indian businesses using GST Invoice Pro
            </p>
            <Link to="/create-invoice">
              <Button size="lg" className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                <FileText className="mr-2 h-5 w-5" />
                Create Free Invoice Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
