import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function PaymentFailure() {
  return (
    <div className="container py-20">
      <div className="mx-auto max-w-2xl">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-3xl">Payment Failed</CardTitle>
            <CardDescription className="text-lg">
              We couldn't process your payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              Your payment was not successful. This could be due to insufficient funds, incorrect card details, or a network issue. Please try again or contact your bank for more information.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/pricing">
                <Button size="lg" className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                  Try Again
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
