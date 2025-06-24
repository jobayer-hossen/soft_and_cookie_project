"use client";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { ShareButton } from "@/components/share-button";
import { Navbar } from "@/components/navbar";

// Mock database of cookie articles
const cookieArticles = {
  1: {
    id: 1,
    title: "Netflix Cookies: How They Enhance Your Streaming Experience",
    platform: "Netflix",
    description:
      "Discover how Netflix uses cookies to personalize your viewing experience, remember your preferences, and provide seamless streaming across devices.",
    image: "/placeholder.svg?height=400&width=800",
    readTime: "5 min read",
    publishDate: "2024-01-15",
    category: "Streaming",
    author: "Privacy Expert",
    authorImage: "/placeholder.svg?height=40&width=40",
    content: `
# Understanding Netflix's Cookie Strategy

Netflix, the world's leading streaming platform, relies heavily on cookies to deliver a personalized and seamless viewing experience. In this comprehensive guide, we'll explore how Netflix uses various types of cookies and what this means for your privacy.

## What Are Netflix Cookies?

Netflix uses several types of cookies to enhance your streaming experience:

### 1. Essential Cookies
These cookies are necessary for the basic functionality of the Netflix platform:
- **Session Management**: Keeps you logged in during your browsing session
- **Security**: Protects against unauthorized access and fraud
- **Load Balancing**: Ensures optimal server performance

### 2. Functional Cookies
These cookies remember your preferences and settings:
- **Language Preferences**: Remembers your preferred language and subtitle settings
- **Playback Quality**: Stores your video quality preferences
- **Audio Settings**: Maintains your audio and subtitle preferences
- **Parental Controls**: Remembers your content filtering settings

### 3. Analytics Cookies
Netflix uses these to understand user behavior:
- **Viewing Patterns**: Tracks what you watch and when
- **Device Information**: Collects data about your streaming devices
- **Performance Metrics**: Monitors streaming quality and buffering issues
- **Feature Usage**: Tracks which Netflix features you use most

## How Netflix Uses Your Cookie Data

### Personalized Recommendations
Netflix's recommendation algorithm relies heavily on cookie data to suggest content you might enjoy. The system analyzes:
- Your viewing history
- Time spent watching different genres
- Shows you've added to your list
- Content you've rated or reviewed

### Cross-Device Synchronization
Cookies help Netflix sync your experience across multiple devices:
- Resume watching from where you left off
- Maintain consistent preferences across devices
- Sync your "My List" across platforms
- Keep parental control settings consistent

### Content Delivery Optimization
Netflix uses cookies to optimize streaming performance:
- Select the best content delivery network (CDN) server
- Adjust video quality based on your connection
- Preload content you're likely to watch
- Optimize bandwidth usage

## Privacy Implications

While Netflix's use of cookies enhances user experience, it's important to understand the privacy implications:

### Data Collection
Netflix collects extensive data about your viewing habits, including:
- What you watch and for how long
- When you pause, rewind, or fast-forward
- What devices you use to stream
- Your location and time zone

### Data Retention
Netflix retains cookie data for varying periods:
- Session cookies are deleted when you close your browser
- Persistent cookies may last up to 2 years
- Some analytics data is kept for longer periods for business analysis

### Third-Party Sharing
Netflix may share anonymized cookie data with:
- Content creators and studios
- Marketing partners
- Analytics providers
- Technology vendors

## Managing Netflix Cookies

You have several options for managing Netflix cookies:

### Browser Settings
- Clear cookies regularly through your browser settings
- Use incognito/private browsing mode
- Disable third-party cookies
- Use browser extensions that block tracking cookies

### Netflix Account Settings
- Review and adjust your privacy settings
- Manage viewing activity and recommendations
- Control data sharing preferences
- Set up separate profiles for different family members

### Alternative Approaches
- Use a VPN to mask your location
- Regularly clear your viewing history
- Create multiple profiles to separate viewing preferences
- Use different browsers for different types of content

## The Future of Netflix Cookies

As privacy regulations evolve, Netflix continues to adapt its cookie practices:

### Compliance with Regulations
- GDPR compliance in Europe
- CCPA compliance in California
- Ongoing updates to privacy policies
- Enhanced user control over data

### Technical Innovations
- Improved anonymization techniques
- Better user consent mechanisms
- Enhanced data security measures
- More granular privacy controls

## Conclusion

Netflix's use of cookies is integral to providing a personalized streaming experience. While these cookies enhance functionality and user experience, it's important to understand what data is being collected and how it's used. By staying informed and actively managing your privacy settings, you can enjoy Netflix's services while maintaining control over your personal data.

Remember that you always have the right to:
- Access your personal data
- Request data deletion
- Opt out of certain data collection
- Update your privacy preferences

Stay informed about Netflix's privacy practices by regularly reviewing their privacy policy and terms of service.
    `,
    tags: ["Netflix", "Streaming", "Privacy", "Cookies", "Personalization"],
    relatedArticles: [
      { id: 2, title: "YouTube's Cookie Strategy", platform: "YouTube" },
      { id: 6, title: "Spotify's Music Cookies", platform: "Spotify" },
      { id: 7, title: "Crunchyroll Cookies", platform: "Crunchyroll" },
    ],
  },
  2: {
    id: 2,
    title: "YouTube's Cookie Strategy: Personalization and Analytics",
    platform: "YouTube",
    description:
      "Learn about YouTube's comprehensive cookie system that powers recommendations, tracks viewing habits, and optimizes video delivery.",
    image: "/placeholder.svg?height=400&width=800",
    readTime: "7 min read",
    publishDate: "2024-01-12",
    category: "Video Platform",
    author: "Tech Analyst",
    authorImage: "/placeholder.svg?height=40&width=40",
    content: `
# YouTube's Cookie Ecosystem: A Deep Dive

YouTube, owned by Google, operates one of the most sophisticated cookie systems on the internet. This comprehensive guide explores how YouTube uses cookies to deliver personalized content and what it means for user privacy.

## The YouTube Cookie Framework

YouTube employs multiple types of cookies across its platform:

### Authentication Cookies
- **Login State**: Maintains your signed-in status
- **Account Security**: Protects against unauthorized access
- **Two-Factor Authentication**: Manages security verification

### Preference Cookies
- **Video Quality**: Remembers your preferred resolution settings
- **Playback Speed**: Stores your preferred playback speed
- **Autoplay Settings**: Maintains your autoplay preferences
- **Theater Mode**: Remembers your viewing mode preferences

### Analytics and Tracking Cookies
- **Watch History**: Tracks videos you've watched
- **Search History**: Records your search queries
- **Engagement Metrics**: Monitors likes, comments, and shares
- **Time Spent**: Measures how long you watch videos

## How YouTube Uses Cookie Data

### The Recommendation Algorithm
YouTube's recommendation system relies heavily on cookie data:
- **Viewing Patterns**: Analyzes what types of content you watch
- **Session Duration**: Tracks how long you stay on the platform
- **Click-Through Rates**: Measures which thumbnails you click
- **Engagement Signals**: Considers likes, comments, and shares

### Content Personalization
Cookies enable YouTube to personalize your experience:
- **Homepage Recommendations**: Customizes your homepage feed
- **Trending Content**: Shows trending videos relevant to your interests
- **Subscription Feed**: Organizes content from channels you follow
- **Playlist Suggestions**: Recommends playlists based on your taste

### Advertising Optimization
YouTube uses cookies for targeted advertising:
- **Ad Personalization**: Shows ads based on your interests
- **Frequency Capping**: Limits how often you see the same ad
- **Conversion Tracking**: Measures ad effectiveness
- **Audience Segmentation**: Groups users for targeted campaigns

## Privacy Considerations

### Data Collection Scope
YouTube collects extensive data through cookies:
- **Video Consumption**: What you watch and for how long
- **Search Behavior**: What you search for and when
- **Device Information**: Details about your devices and browsers
- **Location Data**: Your approximate geographic location

### Cross-Platform Tracking
As part of Google's ecosystem, YouTube cookies can be linked to:
- **Google Search**: Your search history and preferences
- **Gmail**: Email interactions and interests
- **Google Maps**: Location and travel patterns
- **Android Devices**: App usage and device behavior

### Data Retention Policies
YouTube retains cookie data for varying periods:
- **Activity Data**: Up to 18 months by default
- **Ad Data**: Up to 2 years for advertising purposes
- **Account Data**: Until you delete your account
- **Legal Requirements**: Longer if required by law

## Managing YouTube Cookies

### YouTube-Specific Controls
- **Watch History**: Turn off watch history tracking
- **Search History**: Disable search history recording
- **Ad Personalization**: Opt out of personalized ads
- **Data Download**: Request a copy of your data

### Browser-Level Management
- **Cookie Blocking**: Use browser settings to block cookies
- **Incognito Mode**: Browse without saving cookies
- **Extensions**: Use privacy-focused browser extensions
- **Regular Clearing**: Periodically clear cookies and data

### Account Settings
- **Privacy Checkup**: Review and adjust privacy settings
- **Activity Controls**: Manage what data Google collects
- **Ad Settings**: Control ad personalization
- **Data & Privacy**: Access comprehensive privacy controls

## The Impact on Content Creators

YouTube's cookie system also affects content creators:

### Analytics for Creators
- **Audience Insights**: Demographics and viewing patterns
- **Performance Metrics**: Views, engagement, and retention
- **Revenue Tracking**: Ad revenue and monetization data
- **Growth Analytics**: Subscriber and view growth patterns

### Content Optimization
- **Algorithm Understanding**: How cookies affect video reach
- **Audience Retention**: Using data to improve content
- **Thumbnail Testing**: A/B testing based on cookie data
- **Upload Timing**: Optimizing upload times for audience

## Future Developments

### Privacy-First Initiatives
YouTube is adapting to privacy changes:
- **Cookieless Tracking**: Developing alternatives to third-party cookies
- **Enhanced Consent**: Improved consent mechanisms
- **Data Minimization**: Collecting only necessary data
- **Transparency Reports**: Regular privacy updates

### Technical Innovations
- **Machine Learning**: Advanced algorithms for recommendations
- **Edge Computing**: Faster content delivery
- **Privacy-Preserving Analytics**: Anonymized data analysis
- **User Control**: More granular privacy controls

## Best Practices for Users

### Protecting Your Privacy
1. **Regular Reviews**: Check your privacy settings monthly
2. **Data Audits**: Review what data YouTube has collected
3. **Selective Sharing**: Be mindful of what you watch and search
4. **Multiple Accounts**: Use separate accounts for different purposes

### Optimizing Your Experience
1. **Curate Your Feed**: Actively manage your subscriptions
2. **Use Playlists**: Organize content you want to watch
3. **Provide Feedback**: Use thumbs up/down to improve recommendations
4. **Clear History**: Periodically clear watch and search history

## Conclusion

YouTube's cookie system is a double-edged sword: it enables personalized experiences but raises privacy concerns. Understanding how these cookies work empowers you to make informed decisions about your digital privacy while still enjoying YouTube's vast content library.

The key is finding the right balance between personalization and privacy that works for your needs and comfort level.
    `,
    tags: ["YouTube", "Google", "Video", "Analytics", "Recommendations"],
    relatedArticles: [
      { id: 1, title: "Netflix Cookies", platform: "Netflix" },
      { id: 5, title: "Google Analytics Cookies", platform: "Google" },
      { id: 10, title: "TikTok Algorithm Cookies", platform: "TikTok" },
    ],
  },
  // Add more articles as needed...
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CookieDetailPage({ params }: PageProps) {
  // Get article data based on ID

  const { id } = React.use(params); // ✅ unwrap params
  const articleId = Number.parseInt(id);
  const article = cookieArticles[articleId as keyof typeof cookieArticles];

  // If article not found, show error
  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/cookies">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cookie Insights
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar showSearch={false} />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/cookies">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <ShareButton
              title={article.title}
              description={article.description}
            />
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            <Badge variant="outline">{article.platform}</Badge>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {article.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Image
                src={article.authorImage || "/placeholder.svg"}
                alt={article.author}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(article.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="whitespace-pre-line leading-relaxed">
            {article.content}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Related Articles */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {article.relatedArticles.map((related) => (
              <Card
                key={related.id}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs mb-2">
                    {related.platform}
                  </Badge>
                  <h4 className="font-semibold mb-2 leading-tight">
                    {related.title}
                  </h4>
                  <Link href={`/cookies/${related.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      Read Article
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want to Learn More About Web Privacy?
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore more articles about cookies, privacy, and how to protect
              your data online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cookies">
                <Button size="lg">More Cookie Articles</Button>
              </Link>
              <Button variant="outline" size="lg">
                Privacy Tools
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
