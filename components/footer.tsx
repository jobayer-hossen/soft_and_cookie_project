import Link from "next/link";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Facebook,
  Linkedin,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SoftHub</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted source for downloading the latest software. We
              provide safe, verified downloads for Windows, macOS, and Linux
              platforms.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/windows"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Windows
              </Link>
              <Link
                href="/macos"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                macOS
              </Link>
              <Link
                href="/cookies"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookies
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <nav className="space-y-2">
              <Link
                href="/?category=Office%20Tools"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Office Tools
              </Link>
              <Link
                href="/?category=Developer%20Tools"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Developer Tools
              </Link>
              <Link
                href="/?category=Design%20%26%20Graphics"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Design & Graphics
              </Link>
              <Link
                href="/?category=Utilities"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Utilities
              </Link>
              <Link
                href="/?category=Security"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Security
              </Link>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest software releases and
              updates.
            </p>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button size="sm">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Safe Downloads
              </h4>
              <p className="text-xs text-muted-foreground">
                All software is scanned for viruses and malware before being
                made available for download.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Regular Updates
              </h4>
              <p className="text-xs text-muted-foreground">
                We keep our software library updated with the latest versions
                and security patches.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">24/7 Support</h4>
              <p className="text-xs text-muted-foreground">
                Our support team is available around the clock to help with any
                download issues.
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} SoftHub. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>for developers and users worldwide</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/dmca"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              DMCA
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
