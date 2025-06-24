"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Eye,
  Star,
  Filter,
  Menu,
  ArrowUpDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchSuggestions } from "@/components/search-suggestions";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const categories = [
  { name: "All Software", count: 1247 },
  { name: "Office Tools", count: 156 },
  { name: "Design & Graphics", count: 234 },
  { name: "Utilities", count: 189 },
  { name: "Developer Tools", count: 145 },
  { name: "Media & Entertainment", count: 198 },
  { name: "Security", count: 87 },
  { name: "System Tools", count: 123 },
  { name: "Games", count: 115 },
];

const platforms = ["Windows", "macOS", "Linux", "Android", "iOS"];
const fileSizeRanges = [
  { label: "Under 10 MB", min: 0, max: 10 },
  { label: "10 MB - 100 MB", min: 10, max: 100 },
  { label: "100 MB - 500 MB", min: 100, max: 500 },
  { label: "500 MB - 1 GB", min: 500, max: 1000 },
  { label: "Over 1 GB", min: 1000, max: Number.POSITIVE_INFINITY },
];

const featuredSoftware = {
  title: "Adobe Photoshop 2024",
  description:
    "The world's best imaging and graphic design software with advanced AI features and cloud integration.",
  version: "25.1.0",
  image:
    "https://cdn.pixabay.com/photo/2020/01/12/13/22/photoshop-4759954_1280.jpg",
  tags: ["Windows", "macOS", "x64"],
  rating: 4.8,
  downloads: "2.3M",
};

const softwareList = [
  {
    id: 1,
    title: "Microsoft Office 365",
    version: "16.0.17126",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS"],
    rating: 4.7,
    downloads: "1.8M",
    downloadCount: 1800000,
    category: "Office Tools",
    dateAdded: "2024-01-15",
    platforms: ["Windows", "macOS"],
    fileSizeMB: 3200,
  },
  {
    id: 2,
    title: "Visual Studio Code",
    version: "1.85.2",
    image:
      "https://cdn-icons-png.freepik.com/512/15713/15713436.png?ga=GA1.1.1647617738.1750773758",
    tags: ["Windows", "macOS", "Linux"],
    rating: 4.9,
    downloads: "5.2M",
    downloadCount: 5200000,
    category: "Developer Tools",
    dateAdded: "2024-01-20",
    platforms: ["Windows", "macOS", "Linux"],
    fileSizeMB: 85,
  },
  {
    id: 3,
    title: "Figma Desktop",
    version: "116.16.8",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS"],
    rating: 4.6,
    downloads: "892K",
    downloadCount: 892000,
    category: "Design & Graphics",
    dateAdded: "2024-01-10",
    platforms: ["Windows", "macOS"],
    fileSizeMB: 156,
  },
  {
    id: 4,
    title: "CCleaner Professional",
    version: "6.19.10858",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows"],
    rating: 4.4,
    downloads: "3.1M",
    downloadCount: 3100000,
    category: "Utilities",
    dateAdded: "2024-01-05",
    platforms: ["Windows"],
    fileSizeMB: 28,
  },
  {
    id: 5,
    title: "Slack Desktop",
    version: "4.36.140",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS", "Linux"],
    rating: 4.3,
    downloads: "1.2M",
    downloadCount: 1200000,
    category: "Office Tools",
    dateAdded: "2024-01-18",
    platforms: ["Windows", "macOS", "Linux"],
    fileSizeMB: 142,
  },
  {
    id: 6,
    title: "OBS Studio",
    version: "30.0.2",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS", "Linux"],
    rating: 4.8,
    downloads: "2.7M",
    downloadCount: 2700000,
    category: "Media & Entertainment",
    dateAdded: "2024-01-12",
    platforms: ["Windows", "macOS", "Linux"],
    fileSizeMB: 312,
  },
  {
    id: 7,
    title: "Notion Desktop",
    version: "2.2.1",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS"],
    rating: 4.5,
    downloads: "967K",
    downloadCount: 967000,
    category: "Office Tools",
    dateAdded: "2024-01-08",
    platforms: ["Windows", "macOS"],
    fileSizeMB: 78,
  },
  {
    id: 8,
    title: "Malwarebytes Premium",
    version: "4.6.7.295",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS"],
    rating: 4.6,
    downloads: "1.5M",
    downloadCount: 1500000,
    category: "Security",
    dateAdded: "2024-01-22",
    platforms: ["Windows", "macOS"],
    fileSizeMB: 45,
  },
];

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState("All Software");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minRating, setMinRating] = useState([0]);
  const [selectedFileSizeRange, setSelectedFileSizeRange] =
    useState<string>("Any size");

  // Handle URL parameters for category filtering
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get("category");
      if (
        categoryParam &&
        categories.some((cat) => cat.name === categoryParam)
      ) {
        setSelectedCategory(categoryParam);
      }
    }
  }, []);

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Software");
    setSelectedPlatforms([]);
    setMinRating([0]);
    setSelectedFileSizeRange("Any size");
  };

  const getFileSizeLabel = (sizeMB: number) => {
    if (sizeMB < 1) return `${Math.round(sizeMB * 1000)} KB`;
    if (sizeMB < 1000) return `${Math.round(sizeMB)} MB`;
    return `${(sizeMB / 1000).toFixed(1)} GB`;
  };

  const handleSoftwareSelect = (software: any) => {
    router.push(`/software/${software.id}`);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredSoftware = softwareList
    .filter((software) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All Software" ||
        software.category === selectedCategory;

      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        software.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        software.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        software.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Platform filter
      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((platform) =>
          software.platforms.includes(platform)
        );

      // Rating filter
      const matchesRating = software.rating >= minRating[0];

      // File size filter
      const matchesFileSize = (() => {
        if (selectedFileSizeRange === "Any size") return true;
        const range = fileSizeRanges.find(
          (r) => r.label === selectedFileSizeRange
        );
        if (!range) return true;
        return (
          software.fileSizeMB >= range.min && software.fileSizeMB <= range.max
        );
      })();

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPlatform &&
        matchesRating &&
        matchesFileSize
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.downloadCount - a.downloadCount;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
        case "oldest":
          return (
            new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
          );
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const Sidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-muted/50 ${
                selectedCategory === category.name
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Platform Filter */}
      <div>
        <h4 className="font-semibold mb-3">Platform</h4>
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={`platform-${platform}`}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={(checked) =>
                  handlePlatformChange(platform, checked as boolean)
                }
              />
              <Label
                htmlFor={`platform-${platform}`}
                className="text-sm cursor-pointer"
              >
                {platform}
              </Label>
            </div>
          ))}
        </div>
      </div>


      <Separator />

      {/* File Size Filter */}
      <div>
        <h4 className="font-semibold mb-3">File Size</h4>
        <Select
          value={selectedFileSizeRange}
          onValueChange={setSelectedFileSizeRange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any size">Any size</SelectItem>
            {fileSizeRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {(selectedPlatforms.length > 0 ||
        minRating[0] > 0 ||
        selectedFileSizeRange !== "Any size") && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedPlatforms([]);
              setMinRating([0]);
              setSelectedFileSizeRange("Any size");
            }}
            className="w-full"
          >
            Clear Advanced Filters
          </Button>
        </>
      )}
    </div>
  );

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== "All Software" ? 1 : 0) +
    (selectedPlatforms.length > 0 ? 1 : 0) +
    (minRating[0] > 0 ? 1 : 0) +
    (selectedFileSizeRange !== "Any size" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClear={() => setSearchQuery("")}
        onSoftwareSelect={handleSoftwareSelect}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Software Banner */}
        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Featured</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {featuredSoftware.rating}
                      </span>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {featuredSoftware.title}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {featuredSoftware.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">v{featuredSoftware.version}</Badge>
                    {featuredSoftware.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <Button size="lg" className="gap-2">
                      <Download className="h-5 w-5" />
                      Download Now
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      {featuredSoftware.downloads} downloads
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px]">
                <Image
                  src={featuredSoftware.image || "/placeholder.svg"}
                  alt={featuredSoftware.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "All Software" && (
                  <Badge variant="secondary" className="gap-1">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All Software")}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedPlatforms.length > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    Platforms: {selectedPlatforms.join(", ")}
                    <button
                      onClick={() => setSelectedPlatforms([])}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {minRating[0] > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    Rating: {minRating[0]}+ stars
                    <button
                      onClick={() => setMinRating([0])}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedFileSizeRange !== "Any size" && (
                  <Badge variant="secondary" className="gap-1">
                    Size: {selectedFileSizeRange}
                    <button
                      onClick={() => setSelectedFileSizeRange("Any size")}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {searchQuery ? `Search Results` : selectedCategory}
                  <span className="text-muted-foreground text-lg ml-2">
                    ({filteredSoftware.length} items)
                  </span>
                </h2>
                {searchQuery && (
                  <p className="text-muted-foreground mt-1">
                    Showing results for "{searchQuery}"
                    {selectedCategory !== "All Software" &&
                      ` in ${selectedCategory}`}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden gap-2 relative"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                      {activeFiltersCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                        >
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Filter Software</h3>
                      <Sidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Software Grid */}
            {filteredSoftware.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {filteredSoftware.map((software) => (
                  <Card
                    key={software.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image
                            src={software.image || "/placeholder.svg"}
                            alt={software.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/software/${software.id}`}>
                            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors hover:text-primary cursor-pointer">
                              {software.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            v{software.version}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">
                              {software.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • {software.downloads}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getFileSizeLabel(software.fileSizeMB)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {software.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 gap-2">
                      <Link
                        href={`/software/${software.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      <Button size="sm" className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No software found
                </h3>
                <p className="text-muted-foreground mb-4">
                  No results match your current filters. Try adjusting your
                  search criteria.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredSoftware.length > 0 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">12</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
