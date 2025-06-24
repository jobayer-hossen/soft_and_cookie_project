"use client"

import { useState } from "react"
import { Download, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SearchSuggestions } from "@/components/search-suggestions"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock software list for search functionality
const softwareList = [
  {
    id: 1,
    title: "Microsoft Office 365",
    category: "Office Tools",
    rating: 4.7,
    downloads: "1.8M",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS"],
  },
  {
    id: 2,
    title: "Visual Studio Code",
    category: "Developer Tools",
    rating: 4.9,
    downloads: "5.2M",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS", "Linux"],
  },
  {
    id: 3,
    title: "Figma Desktop",
    category: "Design & Graphics",
    rating: 4.6,
    downloads: "892K",
    image: "/placeholder.svg?height=120&width=120",
    tags: ["Windows", "macOS"],
  },
]

interface NavbarProps {
  showSearch?: boolean
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onSearchClear?: () => void
  onSoftwareSelect?: (software: any) => void
  onCategorySelect?: (category: string) => void
}

export function Navbar({
  showSearch = true,
  searchQuery = "",
  onSearchChange,
  onSearchClear,
  onSoftwareSelect,
  onCategorySelect,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Windows", href: "/windows" },
    { name: "macOS", href: "/macos" },
    { name: "Cookies", href: "/cookies" },
    { name: "Contact", href: "/contact" },
  ]

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Download className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">SoftHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActiveLink(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {showSearch && (
            <SearchSuggestions
              placeholder="Search software..."
              className="w-64"
              value={searchQuery}
              onChange={onSearchChange || (() => {})}
              onClear={onSearchClear || (() => {})}
              softwareList={softwareList}
              onSoftwareSelect={onSoftwareSelect}
              onCategorySelect={onCategorySelect}
            />
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SoftHub</span>
              </Link>

              {showSearch && (
                <SearchSuggestions
                  placeholder="Search software..."
                  value={searchQuery}
                  onChange={onSearchChange || (() => {})}
                  onClear={onSearchClear || (() => {})}
                  softwareList={softwareList}
                  onSoftwareSelect={onSoftwareSelect}
                  onCategorySelect={onCategorySelect}
                />
              )}

              <div className="flex justify-center">
                <ThemeToggle />
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-muted ${
                      isActiveLink(item.href) ? "bg-muted text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}