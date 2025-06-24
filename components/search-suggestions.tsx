"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Software {
  id: number
  title: string
  category: string
  rating: number
  downloads: string
  image: string
  tags: string[]
}

interface SearchSuggestionsProps {
  placeholder?: string
  className?: string
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  softwareList: Software[]
  onSoftwareSelect?: (software: Software) => void
  onCategorySelect?: (category: string) => void
}

const popularSearches = [
  "Visual Studio Code",
  "Microsoft Office",
  "Adobe Photoshop",
  "Chrome Browser",
  "Zoom",
  "Slack",
  "Discord",
  "Figma",
]

const categories = [
  "Office Tools",
  "Developer Tools",
  "Design & Graphics",
  "Media & Entertainment",
  "Utilities",
  "Security",
  "Games",
  "System Tools",
]

export function SearchSuggestions({
  placeholder = "Search software...",
  className = "",
  value,
  onChange,
  onClear,
  softwareList,
  onSoftwareSelect,
  onCategorySelect,
}: SearchSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter suggestions based on search query
  const getSuggestions = () => {
    if (!value.trim()) {
      return {
        software: [],
        categories: [],
        popular: popularSearches.slice(0, 4),
      }
    }

    const query = value.toLowerCase()

    // Filter software
    const softwareSuggestions = softwareList
      .filter(
        (software) =>
          software.title.toLowerCase().includes(query) ||
          software.category.toLowerCase().includes(query) ||
          software.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
      .slice(0, 5)

    // Filter categories
    const categorySuggestions = categories.filter((category) => category.toLowerCase().includes(query)).slice(0, 3)

    return {
      software: softwareSuggestions,
      categories: categorySuggestions,
      popular: [],
    }
  }

  const suggestions = getSuggestions()
  const totalSuggestions = suggestions.software.length + suggestions.categories.length + suggestions.popular.length

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev + 1) % totalSuggestions)
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev - 1 + totalSuggestions) % totalSuggestions)
          break
        case "Enter":
          e.preventDefault()
          handleSelectSuggestion(highlightedIndex)
          break
        case "Escape":
          setIsOpen(false)
          setHighlightedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, highlightedIndex, totalSuggestions])

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectSuggestion = (index: number) => {
    let currentIndex = 0

    // Check software suggestions
    if (index < suggestions.software.length) {
      const software = suggestions.software[index]
      onSoftwareSelect?.(software)
      setIsOpen(false)
      return
    }
    currentIndex += suggestions.software.length

    // Check category suggestions
    if (index < currentIndex + suggestions.categories.length) {
      const categoryIndex = index - currentIndex
      const category = suggestions.categories[categoryIndex]
      onCategorySelect?.(category)
      onChange(category)
      setIsOpen(false)
      return
    }
    currentIndex += suggestions.categories.length

    // Check popular searches
    if (index < currentIndex + suggestions.popular.length) {
      const popularIndex = index - currentIndex
      const popular = suggestions.popular[popularIndex]
      onChange(popular)
      setIsOpen(false)
      return
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const renderSuggestionItem = (content: React.ReactNode, index: number, onClick: () => void) => (
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
  )

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          className="pl-10 pr-10"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {value && onClear && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              onClear()
              setIsOpen(false)
              setHighlightedIndex(-1)
            }}
          >
            ×
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (totalSuggestions > 0 || value.trim()) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg dark:shadow-2xl z-50 max-h-96 overflow-y-auto scrollbar-thin">
          {/* Software Suggestions */}
          {suggestions.software.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 dark:bg-muted/50">
                Software
              </div>
              {suggestions.software.map((software, index) =>
                renderSuggestionItem(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded overflow-hidden bg-muted shrink-0">
                      <Image
                        src={software.image || "/placeholder.svg"}
                        alt={software.title}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{software.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{software.category}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{software.rating}</span>
                        </div>
                        <span>• {software.downloads}</span>
                      </div>
                    </div>
                  </div>,
                  index,
                  () => onSoftwareSelect?.(software),
                ),
              )}
            </div>
          )}

          {/* Category Suggestions */}
          {suggestions.categories.length > 0 && (
            <div>
              {suggestions.software.length > 0 && <div className="border-t dark:border-border" />}
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 dark:bg-muted/50">
                Categories
              </div>
              {suggestions.categories.map((category, index) =>
                renderSuggestionItem(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{category}</div>
                      <div className="text-xs text-muted-foreground">Browse category</div>
                    </div>
                  </div>,
                  suggestions.software.length + index,
                  () => onCategorySelect?.(category),
                ),
              )}
            </div>
          )}

          {/* Popular Searches */}
          {suggestions.popular.length > 0 && (
            <div>
              {(suggestions.software.length > 0 || suggestions.categories.length > 0) && (
                <div className="border-t dark:border-border" />
              )}
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
                      <div className="text-xs text-muted-foreground">Popular search</div>
                    </div>
                  </div>,
                  suggestions.software.length + suggestions.categories.length + index,
                  () => onChange(popular),
                ),
              )}
            </div>
          )}

          {/* No Results */}
          {value.trim() && totalSuggestions === 0 && (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">No results found for "{value}"</div>
              <div className="text-xs mt-1">Try adjusting your search terms</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}