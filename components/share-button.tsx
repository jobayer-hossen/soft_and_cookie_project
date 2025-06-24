"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function ShareButton({
  url,
  title = "Check this out!",
  description = "",
  variant = "outline",
  size = "sm",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  // Get current URL if not provided
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast("Link copied!", {
        description: "The link has been copied to your clipboard.",
        duration: 2000,
        icon: <Check className="h-4 w-4 text-green-600" />,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast("Failed to copy", {
        description: "Please try copying the link manually.",
        duration: 2000,
      });
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={`gap-2 ${className}`}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="gap-2"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="gap-2"
        >
          <Twitter className="h-4 w-4 text-blue-400" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="gap-2"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShareWindow(shareLinks.email)}
          className="gap-2"
        >
          <Mail className="h-4 w-4 text-gray-600" />
          Share via Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyToClipboard} className="gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              Link Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
