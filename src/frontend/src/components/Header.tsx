import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indian-saffron to-indian-orange">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-indian-saffron to-indian-orange bg-clip-text text-transparent">
            GST Invoice Pro
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/create-invoice"
            className="text-sm font-medium transition-colors hover:text-indian-orange"
          >
            Create Invoice
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors hover:text-indian-orange"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/pricing"
            className="text-sm font-medium transition-colors hover:text-indian-orange"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleAuth}
            disabled={isLoggingIn}
            variant={isAuthenticated ? 'outline' : 'default'}
            className={!isAuthenticated ? 'bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90' : ''}
          >
            {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              to="/create-invoice"
              className="text-sm font-medium transition-colors hover:text-indian-orange"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Invoice
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-sm font-medium transition-colors hover:text-indian-orange"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/pricing"
              className="text-sm font-medium transition-colors hover:text-indian-orange"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
