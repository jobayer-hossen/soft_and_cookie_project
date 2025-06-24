"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Search,
  TrendingUp,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { ShareButton } from "@/components/share-button";
import { Navbar } from "@/components/navbar";

const cookiesData = [
  {
    id: 1,
    title: "Netflix Cookies: How They Enhance Your Streaming Experience",
    platform: "Netflix",
    description:
      "Discover how Netflix uses cookies to personalize your viewing experience, remember your preferences, and provide seamless streaming across devices.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min read",
    publishDate: "2024-01-15",
    category: "Streaming",
  },
  {
    id: 2,
    title: "YouTube's Cookie Strategy: Personalization and Analytics",
    platform: "YouTube",
    description:
      "Learn about YouTube's comprehensive cookie system that powers recommendations, tracks viewing habits, and optimizes video delivery.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "7 min read",
    publishDate: "2024-01-12",
    category: "Video Platform",
  },
  {
    id: 3,
    title: "Amazon Shopping Cookies: Your Cart and Preferences",
    platform: "Amazon",
    description:
      "Understand how Amazon uses cookies to maintain your shopping cart, remember preferences, and provide personalized product recommendations.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min read",
    publishDate: "2024-01-10",
    category: "E-commerce",
  },
  {
    id: 4,
    title: "Facebook Pixel: The Cookie That Tracks Everything",
    platform: "Facebook",
    description:
      "Deep dive into Facebook's tracking pixel and how it uses cookies to build detailed user profiles for targeted advertising.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "8 min read",
    publishDate: "2024-01-08",
    category: "Social Media",
  },
  {
    id: 5,
    title: "Google Analytics Cookies: Website Tracking Explained",
    platform: "Google",
    description:
      "Explore how Google Analytics cookies work, what data they collect, and how websites use this information to improve user experience.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min read",
    publishDate: "2024-01-05",
    category: "Analytics",
  },
  {
    id: 6,
    title: "Spotify's Music Cookies: Personalizing Your Playlist",
    platform: "Spotify",
    description:
      "Learn how Spotify uses cookies to remember your music preferences, create personalized playlists, and sync across devices.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min read",
    publishDate: "2024-01-03",
    category: "Music Streaming",
  },
  {
    id: 7,
    title: "Crunchyroll Cookies: Anime Streaming and Subscriptions",
    platform: "Crunchyroll",
    description:
      "Discover how Crunchyroll manages user sessions, subscription status, and viewing preferences through their cookie system.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "4 min read",
    publishDate: "2024-01-01",
    category: "Anime Streaming",
  },
  {
    id: 8,
    title: "Twitter's Engagement Cookies: Social Media Tracking",
    platform: "Twitter",
    description:
      "Understand how Twitter uses cookies to track user engagement, personalize content, and deliver targeted advertisements.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min read",
    publishDate: "2023-12-28",
    category: "Social Media",
  },
  {
    id: 9,
    title: "Instagram Stories Cookies: Behind the Scenes",
    platform: "Instagram",
    description:
      "Explore how Instagram uses cookies to manage stories viewing, interaction preferences, and content personalization.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min read",
    publishDate: "2023-12-25",
    category: "Social Media",
  },
  {
    id: 10,
    title: "TikTok Algorithm Cookies: The For You Page Mystery",
    platform: "TikTok",
    description:
      "Uncover how TikTok's cookies power the famous For You page algorithm and track user behavior for content recommendations.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "7 min read",
    publishDate: "2023-12-22",
    category: "Social Media",
  },
  {
    id: 11,
    title: "Discord Server Cookies: Gaming Community Tracking",
    platform: "Discord",
    description:
      "Learn about Discord's cookie usage for server management, user preferences, and community features in gaming environments.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min read",
    publishDate: "2023-12-20",
    category: "Gaming",
  },
  {
    id: 12,
    title: "LinkedIn Professional Cookies: Career Network Tracking",
    platform: "LinkedIn",
    description:
      "Discover how LinkedIn uses cookies to enhance professional networking, job recommendations, and career development features.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min read",
    publishDate: "2023-12-18",
    category: "Professional Network",
  },
];

const popularSearches = [
  "Netflix cookies",
  "Google Analytics",
  "Facebook tracking",
  "YouTube recommendations",
  "Amazon shopping",
  "Social media cookies",
  "Streaming platforms",
  "Privacy settings",
];

const recentSearches = [
  "Instagram cookies",
  "TikTok algorithm",
  "Spotify tracking",
  "Discord privacy",
];

// Cookie Search Suggestions Component
function CookieSearchSuggestions({
  value,
  onChange,
  onClear,
  onArticleSelect,
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onArticleSelect: (article: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on search query
  const getSuggestions = () => {
    if (!value.trim()) {
      return {
        articles: [],
        platforms: [],
        categories: [],
        popular: popularSearches.slice(0, 4),
        recent: recentSearches.slice(0, 3),
      };
    }

    const query = value.toLowerCase();

    // Filter articles
    const articleSuggestions = cookiesData
      .filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.platform.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
      )
      .slice(0, 4);

    // Filter platforms
    const platforms = [
      ...new Set(cookiesData.map((article) => article.platform)),
    ];
    const platformSuggestions = platforms
      .filter((platform) => platform.toLowerCase().includes(query))
      .slice(0, 3);

    // Filter categories
    const categories = [
      ...new Set(cookiesData.map((article) => article.category)),
    ];
    const categorySuggestions = categories
      .filter((category) => category.toLowerCase().includes(query))
      .slice(0, 3);

    return {
      articles: articleSuggestions,
      platforms: platformSuggestions,
      categories: categorySuggestions,
      popular: [],
      recent: [],
    };
  };

  const suggestions = getSuggestions();
  const totalSuggestions =
    suggestions.articles.length +
    suggestions.platforms.length +
    suggestions.categories.length +
    suggestions.popular.length +
    suggestions.recent.length;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % totalSuggestions);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(
            (prev) => (prev - 1 + totalSuggestions) % totalSuggestions
          );
          break;
        case "Enter":
          e.preventDefault();
          handleSelectSuggestion(highlightedIndex);
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, totalSuggestions]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (index: number) => {
    let currentIndex = 0;

    // Check article suggestions
    if (index < suggestions.articles.length) {
      const article = suggestions.articles[index];
      onArticleSelect(article);
      setIsOpen(false);
      return;
    }
    currentIndex += suggestions.articles.length;

    // Check platform suggestions
    if (index < currentIndex + suggestions.platforms.length) {
      const platformIndex = index - currentIndex;
      const platform = suggestions.platforms[platformIndex];
      onChange(platform);
      setIsOpen(false);
      return;
    }
    currentIndex += suggestions.platforms.length;

    // Check category suggestions
    if (index < currentIndex + suggestions.categories.length) {
      const categoryIndex = index - currentIndex;
      const category = suggestions.categories[categoryIndex];
      onChange(category);
      setIsOpen(false);
      return;
    }
    currentIndex += suggestions.categories.length;

    // Check popular searches
    if (index < currentIndex + suggestions.popular.length) {
      const popularIndex = index - currentIndex;
      const popular = suggestions.popular[popularIndex];
      onChange(popular);
      setIsOpen(false);
      return;
    }
    currentIndex += suggestions.popular.length;

    // Check recent searches
    if (index < currentIndex + suggestions.recent.length) {
      const recentIndex = index - currentIndex;
      const recent = suggestions.recent[recentIndex];
      onChange(recent);
      setIsOpen(false);
      return;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const renderSuggestionItem = (
    content: React.ReactNode,
    index: number,
    onClick: () => void
  ) => (
    <button
      key={index}
      className={`w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors ${
        highlightedIndex === index ? "bg-muted/50" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setHighlightedIndex(index)}
    >
      {content}
    </button>
  );

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search cookie articles..."
          className="pl-10 pr-10"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              onClear();
              setIsOpen(false);
              setHighlightedIndex(-1);
            }}
          >
            ×
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (totalSuggestions > 0 || value.trim()) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg dark:shadow-2xl z-50 max-h-96 overflow-y-auto scrollbar-thin">
          {/* Article Suggestions */}
          {suggestions.articles.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 dark:bg-muted/50">
                Articles
              </div>
              {suggestions.articles.map((article, index) =>
                renderSuggestionItem(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded overflow-hidden bg-muted shrink-0">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {article.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{article.platform}</span>
                        <span>• {article.readTime}</span>
                      </div>
                    </div>
                  </div>,
                  index,
                  () => onArticleSelect(article)
                )
              )}
            </div>
          )}

          {/* Platform Suggestions */}
          {suggestions.platforms.length > 0 && (
            <div>
              {suggestions.articles.length > 0 && (
                <div className="border-t dark:border-border" />
              )}
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 dark:bg-muted/50">
                Platforms
              </div>
              {suggestions.platforms.map((platform, index) =>
                renderSuggestionItem(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{platform}</div>
                      <div className="text-xs text-muted-foreground">
                        Browse platform articles
                      </div>
                    </div>
                  </div>,
                  suggestions.articles.length + index,
                  () => onChange(platform)
                )
              )}
            </div>
          )}

          {/* Category Suggestions */}
          {suggestions.categories.length > 0 && (
            <div>
              {(suggestions.articles.length > 0 ||
                suggestions.platforms.length > 0) && (
                <div className="border-t dark:border-border" />
              )}
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 dark:bg-muted/50">
                Categories
              </div>
              {suggestions.categories.map((category, index) =>
                renderSuggestionItem(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{category}</div>
                      <div className="text-xs text-muted-foreground">
                        Browse category
                      </div>
                    </div>
                  </div>,
                  suggestions.articles.length +
                    suggestions.platforms.length +
                    index,
                  () => onChange(category)
                )
              )}
            </div>
          )}

          {/* Popular Searches */}
          {suggestions.popular.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 dark:bg-muted/50">
                Popular Searches
              </div>
              {suggestions.popular.map((popular, index) =>
                renderSuggestionItem(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{popular}</div>
                      <div className="text-xs text-muted-foreground">
                        Popular search
                      </div>
                    </div>
                  </div>,
                  suggestions.articles.length +
                    suggestions.platforms.length +
                    suggestions.categories.length +
                    index,
                  () => onChange(popular)
                )
              )}
            </div>
          )}

          {/* Recent Searches */}
          {suggestions.recent.length > 0 && (
            <div>
              {suggestions.popular.length > 0 && (
                <div className="border-t dark:border-border" />
              )}
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 dark:bg-muted/50">
                Recent Searches
              </div>
              {suggestions.recent.map((recent, index) =>
                renderSuggestionItem(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{recent}</div>
                      <div className="text-xs text-muted-foreground">
                        Recent search
                      </div>
                    </div>
                  </div>,
                  suggestions.articles.length +
                    suggestions.platforms.length +
                    suggestions.categories.length +
                    suggestions.popular.length +
                    index,
                  () => onChange(recent)
                )
              )}
            </div>
          )}

          {/* No Results */}
          {value.trim() && totalSuggestions === 0 && (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">No results found for "{value}"</div>
              <div className="text-xs mt-1">
                Try adjusting your search terms
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CookiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter cookies based on search query
  const filteredCookies = cookiesData.filter((cookie) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      cookie.title.toLowerCase().includes(query) ||
      cookie.platform.toLowerCase().includes(query) ||
      cookie.description.toLowerCase().includes(query) ||
      cookie.category.toLowerCase().includes(query)
    );
  });

  const handleArticleSelect = (article: any) => {
    // Navigate to article or set search to article title
    setSearchQuery(article.title);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <Navbar showSearch={false} />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <CookieSearchSuggestions
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              onArticleSelect={handleArticleSelect}
            />
            <ShareButton
              title="Cookie Insights - Learn About Website Cookies"
              description="Explore how popular websites use cookies to enhance user experience, personalize content, and track user behavior."
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Cookies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCookies.map((cookie) => (
            <Card
              key={cookie.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={cookie.image || "/placeholder.svg"}
                  alt={cookie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur"
                  >
                    {cookie.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {cookie.platform}
                  </Badge>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {cookie.readTime}
                  </span>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {cookie.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cookie.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(cookie.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Link href={`/cookies/${cookie.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      Read Details
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCookies.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              No articles match your search for "{searchQuery}". Try different
              keywords.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Want to Learn More About Web Privacy?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Understanding cookies is just the beginning. Explore our
            comprehensive guides on web privacy, data protection, and how to
            manage your digital footprint effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Privacy Guide</Button>
            <Button variant="outline" size="lg">
              Cookie Management Tools
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
