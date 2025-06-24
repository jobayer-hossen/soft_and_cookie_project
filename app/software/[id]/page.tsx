"use client";

import { useState } from "react";
import * as React from "react";
import {
  ArrowLeft,
  Download,
  Eye,
  Star,
  Calendar,
  Monitor,
  Share2,
  Heart,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb } from "@/components/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

// Mock database of software details
const softwareDatabase = {
  1: {
    id: 1,
    title: "Microsoft Office 365",
    version: "16.0.17126",
    developer: "Microsoft Corporation",
    category: "Office Tools",
    description:
      "Microsoft Office 365 is a comprehensive suite of productivity applications including Word, Excel, PowerPoint, and more. Perfect for business and personal use with cloud integration.",
    longDescription: `Microsoft Office 365 is the world's most popular productivity suite, offering a comprehensive set of applications designed to help you create, collaborate, and communicate more effectively.

The suite includes Word for document creation, Excel for spreadsheets and data analysis, PowerPoint for presentations, Outlook for email and calendar management, and many other powerful tools. With cloud integration, you can access your files from anywhere and collaborate in real-time with others.

Office 365 also includes advanced features like AI-powered writing assistance, advanced data analysis tools, and seamless integration with Microsoft's cloud services.`,
    rating: 4.7,
    totalRatings: 89234,
    downloads: "1.8M",
    downloadCount: 1800000,
    platforms: ["Windows", "macOS"],
    fileSizeMB: 3200,
    dateAdded: "2024-01-15",
    lastUpdated: "2024-01-15",
    license: "Commercial License",
    website: "https://office.microsoft.com",
    tags: ["Office Suite", "Productivity", "Microsoft", "Business"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    systemRequirements: {
      windows: {
        os: "Windows 10 version 1909 or higher",
        processor: "1.6 GHz or faster processor",
        memory: "4 GB RAM",
        storage: "4 GB available space",
      },
      macos: {
        os: "macOS 10.15 or higher",
        processor: "Intel or Apple Silicon processor",
        memory: "4 GB RAM",
        storage: "4 GB available space",
      },
    },
    features: [
      "Word processing with advanced formatting",
      "Excel with powerful data analysis",
      "PowerPoint with designer templates",
      "Outlook email and calendar",
      "OneDrive cloud storage",
      "Real-time collaboration",
      "AI-powered writing assistance",
      "Cross-platform compatibility",
    ],
    changelog: [
      {
        version: "16.0.17126",
        date: "2024-01-15",
        changes: [
          "Improved performance across all applications",
          "New collaboration features in Word",
          "Enhanced security updates",
          "Bug fixes and stability improvements",
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Business User",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-01-10",
        comment:
          "Essential for any business. The integration between apps is seamless and the cloud features are fantastic.",
      },
      {
        id: 2,
        author: "Student",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2024-01-08",
        comment:
          "Great for school work. Word and PowerPoint are my go-to applications for assignments.",
      },
    ],
    relatedSoftware: [
      {
        id: 2,
        title: "Google Workspace",
        image: "/placeholder.svg?height=60&width=60",
        rating: 4.5,
        category: "Office Tools",
      },
      {
        id: 7,
        title: "LibreOffice",
        image: "/placeholder.svg?height=60&width=60",
        rating: 4.3,
        category: "Office Tools",
      },
    ],
  },
  2: {
    id: 2,
    title: "Visual Studio Code",
    version: "1.85.2",
    developer: "Microsoft Corporation",
    category: "Developer Tools",
    description:
      "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages and runtimes.",
    longDescription: `Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications. Visual Studio Code is free and available on your favorite platform - Linux, macOS, and Windows.

Visual Studio Code has support for many languages, including Python, Java, C++, C#, PHP, Go, .NET, Unity, and more through the use of extensions. VS Code also supports debugging, embedded Git control and GitHub, syntax highlighting, intelligent code completion, snippets, and code refactoring.

The editor includes support for debugging, embedded Git control and GitHub, syntax highlighting, intelligent code completion, snippets, and code refactoring. It is also customizable, so users can change the editor's theme, keyboard shortcuts, and preferences.`,
    rating: 4.9,
    totalRatings: 125847,
    downloads: "5.2M",
    downloadCount: 5200000,
    platforms: ["Windows", "macOS", "Linux"],
    fileSizeMB: 85,
    dateAdded: "2024-01-20",
    lastUpdated: "2024-01-20",
    license: "MIT License",
    website: "https://code.visualstudio.com",
    tags: ["Code Editor", "IDE", "Development", "Microsoft", "Open Source"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    systemRequirements: {
      windows: {
        os: "Windows 10 version 1909 or higher",
        processor: "1.6 GHz or faster processor",
        memory: "1 GB RAM",
        storage: "200 MB available space",
      },
      macos: {
        os: "macOS 10.15 or higher",
        processor: "Intel or Apple Silicon processor",
        memory: "1 GB RAM",
        storage: "200 MB available space",
      },
      linux: {
        os: "Ubuntu 18.04+, Debian 10+, RHEL 8+, Fedora 32+",
        processor: "1.6 GHz or faster processor",
        memory: "1 GB RAM",
        storage: "200 MB available space",
      },
    },
    features: [
      "IntelliSense code completion",
      "Built-in Git integration",
      "Debugging support",
      "Extensions marketplace",
      "Integrated terminal",
      "Multi-cursor editing",
      "Code folding and minimap",
      "Customizable themes",
    ],
    changelog: [
      {
        version: "1.85.2",
        date: "2024-01-20",
        changes: [
          "Fixed issue with extension host crashing",
          "Improved performance for large files",
          "Updated built-in themes",
          "Bug fixes and stability improvements",
        ],
      },
      {
        version: "1.85.1",
        date: "2024-01-15",
        changes: [
          "Added new debugging features",
          "Enhanced Git integration",
          "Performance optimizations",
          "Security updates",
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "John Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-01-18",
        comment:
          "Absolutely fantastic code editor! The extension ecosystem is incredible and it's so lightweight yet powerful. Been using it for 3 years now and couldn't be happier.",
      },
      {
        id: 2,
        author: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-01-15",
        comment:
          "Best code editor I've ever used. The IntelliSense is amazing and the Git integration saves me so much time. Highly recommended for any developer.",
      },
    ],
    relatedSoftware: [
      {
        id: 3,
        title: "Sublime Text",
        image: "/placeholder.svg?height=60&width=60",
        rating: 4.7,
        category: "Developer Tools",
      },
      {
        id: 4,
        title: "Atom",
        image: "/placeholder.svg?height=60&width=60",
        rating: 4.5,
        category: "Developer Tools",
      },
    ],
  },
  // Add more software entries as needed
  3: {
    id: 3,
    title: "Figma Desktop",
    version: "116.16.8",
    developer: "Figma Inc.",
    category: "Design & Graphics",
    description:
      "Figma is a collaborative interface design tool that runs in the browser and desktop. Perfect for UI/UX design, prototyping, and team collaboration.",
    longDescription: `Figma is the leading collaborative design tool for building meaningful products. Teams use Figma to brainstorm, design, and build better products — from start to finish.

Design and prototype in one place with Figma's powerful design tools. Create interactive prototypes that feel real, with advanced animations and micro-interactions. Share your work and get feedback from stakeholders with ease.

Figma's real-time collaboration features make it easy for teams to work together, no matter where they are. With version control, design systems, and developer handoff tools, Figma streamlines the entire design process.`,
    rating: 4.6,
    totalRatings: 45678,
    downloads: "892K",
    downloadCount: 892000,
    platforms: ["Windows", "macOS"],
    fileSizeMB: 156,
    dateAdded: "2024-01-10",
    lastUpdated: "2024-01-10",
    license: "Freemium",
    website: "https://figma.com",
    tags: ["Design", "UI/UX", "Prototyping", "Collaboration"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    systemRequirements: {
      windows: {
        os: "Windows 10 or higher",
        processor: "Intel Core i3 or equivalent",
        memory: "4 GB RAM",
        storage: "500 MB available space",
      },
      macos: {
        os: "macOS 10.14 or higher",
        processor: "Intel or Apple Silicon processor",
        memory: "4 GB RAM",
        storage: "500 MB available space",
      },
    },
    features: [
      "Real-time collaboration",
      "Vector graphics editing",
      "Interactive prototyping",
      "Design systems and components",
      "Developer handoff tools",
      "Version history",
      "Team libraries",
      "Plugin ecosystem",
    ],
    changelog: [
      {
        version: "116.16.8",
        date: "2024-01-10",
        changes: [
          "Improved performance for large files",
          "New animation features",
          "Enhanced collaboration tools",
          "Bug fixes and improvements",
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "UI Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-01-05",
        comment:
          "Game-changer for design teams. The collaboration features are unmatched and the prototyping is incredibly smooth.",
      },
    ],
    relatedSoftware: [
      {
        id: 2,
        title: "Adobe XD",
        image: "/placeholder.svg?height=60&width=60",
        rating: 4.4,
        category: "Design & Graphics",
      },
      {
        id: 5,
        title: "Sketch",
        image: "/placeholder.svg?height=60&width=60",
        rating: 4.5,
        category: "Design & Graphics",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SoftwareDetailPage({ params }: PageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get software data based on ID
  const { id } = React.use(params); // ✅ unwrap params
  const softwareId = Number.parseInt(id);
  const softwareDetail =
    softwareDatabase[softwareId as keyof typeof softwareDatabase];

  // If software not found, show error
  if (!softwareDetail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Software Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The software you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getFileSizeLabel = (sizeMB: number) => {
    if (sizeMB < 1) return `${Math.round(sizeMB * 1000)} KB`;
    if (sizeMB < 1000) return `${Math.round(sizeMB)} MB`;
    return `${(sizeMB / 1000).toFixed(1)} GB`;
  };

  const getRatingDistribution = () => {
    // Mock rating distribution based on the software rating
    const rating = softwareDetail.rating;
    return [
      {
        stars: 5,
        count: Math.floor(softwareDetail.totalRatings * 0.7),
        percentage: 70,
      },
      {
        stars: 4,
        count: Math.floor(softwareDetail.totalRatings * 0.2),
        percentage: 20,
      },
      {
        stars: 3,
        count: Math.floor(softwareDetail.totalRatings * 0.06),
        percentage: 6,
      },
      {
        stars: 2,
        count: Math.floor(softwareDetail.totalRatings * 0.03),
        percentage: 3,
      },
      {
        stars: 1,
        count: Math.floor(softwareDetail.totalRatings * 0.01),
        percentage: 1,
      },
    ];
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % softwareDetail.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + softwareDetail.images.length) % softwareDetail.images.length
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar showSearch={false} />
      <div className="container mx-auto px-4 py-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: softwareDetail.category,
              href: `/?category=${encodeURIComponent(softwareDetail.category)}`,
            },
            { label: softwareDetail.title, current: true },
          ]}
        />

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              <Image
                src={
                  softwareDetail.images[currentImageIndex] || "/placeholder.svg"
                }
                alt={`${softwareDetail.title} screenshot ${
                  currentImageIndex + 1
                }`}
                fill
                className="object-cover"
              />
              {softwareDetail.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {softwareDetail.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {softwareDetail.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {softwareDetail.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={150}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{softwareDetail.category}</Badge>
                <Badge variant="outline">v{softwareDetail.version}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {softwareDetail.title}
              </h1>
              <p className="text-muted-foreground mb-4">
                by {softwareDetail.developer}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{softwareDetail.rating}</span>
                  <span className="text-muted-foreground">
                    ({softwareDetail.totalRatings.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {softwareDetail.description}
              </p>

              <div className="space-y-4">
                <Button size="lg" className="w-full gap-2">
                  <Download className="h-5 w-5" />
                  Download Now ({getFileSizeLabel(softwareDetail.fileSizeMB)})
                </Button>
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  Preview Online
                </Button>
              </div>
            </div>

            <Separator />

            {/* Quick Info */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Downloads</span>
                <span className="font-medium">{softwareDetail.downloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Size</span>
                <span className="font-medium">
                  {getFileSizeLabel(softwareDetail.fileSizeMB)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">
                  {new Date(softwareDetail.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">License</span>
                <span className="font-medium">{softwareDetail.license}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Platforms</span>
                <div className="flex gap-1">
                  {softwareDetail.platforms.map((platform) => (
                    <Badge
                      key={platform}
                      variant="secondary"
                      className="text-xs"
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {softwareDetail.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {softwareDetail.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {softwareDetail.longDescription}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {softwareDetail.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(softwareDetail.systemRequirements).map(
                ([platform, requirements]) => (
                  <Card key={platform}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 capitalize">
                        <Monitor className="h-5 w-5" />
                        {platform}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">
                          Operating System:
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {requirements.os}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Processor:</span>
                        <p className="text-sm text-muted-foreground">
                          {requirements.processor}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Memory:</span>
                        <p className="text-sm text-muted-foreground">
                          {requirements.memory}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Storage:</span>
                        <p className="text-sm text-muted-foreground">
                          {requirements.storage}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="changelog" className="space-y-4">
            {softwareDetail.changelog.map((version, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Version {version.version}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {new Date(version.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {version.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {change}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {/* Rating Overview */}
            <Card>
              <CardHeader>
                <CardTitle>User Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {softwareDetail.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(softwareDetail.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      {softwareDetail.totalRatings.toLocaleString()} reviews
                    </p>
                  </div>
                  <div className="space-y-2">
                    {getRatingDistribution().map((rating) => (
                      <div
                        key={rating.stars}
                        className="flex items-center gap-3"
                      >
                        <span className="text-sm w-6">{rating.stars}★</span>
                        <Progress
                          value={rating.percentage}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-12">
                          {rating.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {softwareDetail.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.author}
                        />
                        <AvatarFallback>
                          {review.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="related" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Software</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {softwareDetail.relatedSoftware.map((software) => (
                    <Link key={software.id} href={`/software/${software.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                        <Image
                          src={software.image || "/placeholder.svg"}
                          alt={software.title}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {software.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {software.category}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{software.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to download {softwareDetail.title}?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join over {softwareDetail.downloads} users who trust this software
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Download Now
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a
                  href={softwareDetail.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Official Website
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
