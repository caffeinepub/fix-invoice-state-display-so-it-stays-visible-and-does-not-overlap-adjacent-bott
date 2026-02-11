import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025. Built with <Heart className="inline h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indian-orange hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl">
            GST Invoice Pro helps Indian freelancers and small businesses generate GST-compliant invoices easily.
            All calculations are automated for CGST, SGST, and IGST based on state selection.
          </p>
        </div>
      </div>
    </footer>
  );
}
