import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function PaymentSuccess() {
  return (
    <div className="container py-20">
      <div className="mx-auto max-w-2xl">
        <Card className="border-indian-green/50 bg-indian-green/5">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indian-green/10">
              <CheckCircle2 className="h-10 w-10 text-indian-green" />
            </div>
            <CardTitle className="text-3xl">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">
              Welcome to GST Invoice Pro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              Your subscription has been activated successfully. You now have access to all Pro features including unlimited invoices, client management, and more.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/create-invoice">
                <Button size="lg" variant="outline">
                  Create Invoice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
