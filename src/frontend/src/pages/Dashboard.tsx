import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Users, Package, Crown, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please login to access your dashboard
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your invoices, clients, and subscription
          </p>
        </div>

        {/* Subscription Status */}
        <Alert className="mb-6 border-indian-orange/50 bg-indian-orange/5">
          <Crown className="h-4 w-4 text-indian-orange" />
          <AlertDescription className="flex items-center justify-between">
            <span>You are currently on the <strong>Free Plan</strong> (3/10 invoices used this month)</span>
            <Link to="/pricing">
              <Button size="sm" className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                Upgrade to Pro
              </Button>
            </Link>
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">Pro feature</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">Pro feature</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Your recently generated invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">No invoices yet</p>
              <Link to="/create-invoice">
                <Button className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                  Create Your First Invoice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Pro Features Teaser */}
        <Card className="mt-6 border-indian-orange/50 bg-gradient-to-br from-indian-saffron/5 to-indian-orange/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-indian-orange" />
              Unlock Pro Features
            </CardTitle>
            <CardDescription>
              Upgrade to Pro for unlimited invoices and advanced features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indian-orange" />
                <span>Unlimited invoice generation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indian-orange" />
                <span>Remove branding watermark</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indian-orange" />
                <span>Save clients and products</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indian-orange" />
                <span>Invoice history and search</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indian-orange" />
                <span>Export to CSV/Excel</span>
              </li>
            </ul>
            <Link to="/pricing">
              <Button className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                Upgrade Now - ₹299/month
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
