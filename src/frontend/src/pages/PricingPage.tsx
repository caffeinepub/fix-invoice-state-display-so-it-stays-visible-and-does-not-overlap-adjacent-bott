import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateCheckoutSession } from '../hooks/useQueries';
import type { ShoppingItem } from '../backend';

export default function PricingPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const createCheckoutSession = useCreateCheckoutSession();

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      const items: ShoppingItem[] = [
        {
          productName: 'GST Invoice Pro - Monthly Subscription',
          productDescription: 'Unlimited invoices, client management, and premium features',
          quantity: BigInt(1),
          priceInCents: BigInt(29900), // ₹299.00
          currency: 'INR',
        },
      ];

      const session = await createCheckoutSession.mutateAsync(items);
      window.location.href = session.url;
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-indian-green/10 text-indian-green hover:bg-indian-green/20">
            Simple Pricing
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you need more features
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold">₹0</span>
                <span className="text-muted-foreground text-lg">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span><strong>10 invoices per month</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>GST calculations (CGST, SGST, IGST)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>PDF download</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Business logo upload</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Basic invoice templates</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-xs">Includes watermark: "Generated using Free Invoice Generator"</span>
                </li>
              </ul>
              <Link to="/create-invoice" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Start Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-indian-orange relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-indian-saffron to-indian-orange text-white px-6 py-2 text-sm font-medium flex items-center gap-1">
              <Crown className="h-4 w-4" />
              Most Popular
            </div>
            <CardHeader className="pt-12">
              <CardTitle className="text-2xl flex items-center gap-2">
                Pro Plan
                <Crown className="h-6 w-6 text-indian-orange" />
              </CardTitle>
              <CardDescription>For growing businesses</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold">₹299</span>
                <span className="text-muted-foreground text-lg">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span><strong>Unlimited invoices</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span><strong>Remove branding watermark</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Save and manage clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Save product/service templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Invoice history with search</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Export invoices (CSV/Excel)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Editable invoice templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indian-green mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button
                onClick={handleUpgrade}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90"
                size="lg"
              >
                {isProcessing ? 'Processing...' : 'Upgrade to Pro'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade to Pro anytime. If you downgrade, you'll continue to have Pro access until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit and debit cards through our secure payment processor Stripe.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! All data is encrypted and stored securely on the Internet Computer blockchain. We never share your data with third parties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if I exceed the free limit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you reach 10 invoices in a month on the Free plan, you'll need to upgrade to Pro to create more invoices that month.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
