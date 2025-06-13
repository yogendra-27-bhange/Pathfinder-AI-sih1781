
import Link from 'next/link';
import { Linkedin, Twitter, Github, BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2 mb-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-primary font-headline">PathFinder AI</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Guiding your career journey with AI.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-stretch text-sm">
            <h3 className="font-semibold mb-2 text-center md:text-left">Quick Links</h3>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors mb-1 text-center md:text-left">About Us</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors mb-1 text-center md:text-left">Contact</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-center md:text-left">Terms of Service</Link>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/in/yogendra-bhange-973185369/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="https://github.com/yogendra-27-bhange" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PathFinder AI. Developed by Yogendra Bhange. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
