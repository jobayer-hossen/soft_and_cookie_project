"use client";

import type React from "react";

import { useState } from "react";
import {
  Plus,
  BarChart3,
  Package,
  Cookie,
  Users,
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Mock data for existing software
const existingSoftware = [
  {
    id: 1,
    title: "Microsoft Office 365",
    version: "16.0.17126",
    category: "Office Tools",
    platforms: ["Windows", "macOS"],
    rating: 4.7,
    downloads: "1.8M",
    status: "Published",
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    title: "Visual Studio Code",
    version: "1.85.2",
    category: "Developer Tools",
    platforms: ["Windows", "macOS", "Linux"],
    rating: 4.9,
    downloads: "5.2M",
    status: "Published",
    dateAdded: "2024-01-20",
  },
  {
    id: 3,
    title: "Adobe Photoshop 2024",
    version: "25.1.0",
    category: "Design & Graphics",
    platforms: ["Windows", "macOS"],
    rating: 4.8,
    downloads: "2.3M",
    status: "Draft",
    dateAdded: "2024-01-22",
  },
];

// Mock data for existing cookies
const existingCookies = [
  {
    id: 1,
    name: "_ga",
    domain: "google-analytics.com",
    category: "Analytics",
    purpose: "Google Analytics tracking",
    duration: "2 years",
    essential: false,
    status: "Active",
    dateAdded: "2024-01-10",
  },
  {
    id: 2,
    name: "session_id",
    domain: "softhub.com",
    category: "Essential",
    purpose: "User session management",
    duration: "Session",
    essential: true,
    status: "Active",
    dateAdded: "2024-01-12",
  },
  {
    id: 3,
    name: "_fbp",
    domain: "facebook.com",
    category: "Marketing",
    purpose: "Facebook Pixel tracking",
    duration: "90 days",
    essential: false,
    status: "Inactive",
    dateAdded: "2024-01-18",
  },
];

const categories = [
  "Office Tools",
  "Design & Graphics",
  "Utilities",
  "Developer Tools",
  "Media & Entertainment",
  "Security",
  "System Tools",
  "Games",
];
const platforms = ["Windows", "macOS", "Linux", "Android", "iOS"];
const cookieCategories = [
  "Essential",
  "Analytics",
  "Marketing",
  "Functional",
  "Performance",
  "Targeting",
];
const difficulties = ["Easy", "Medium", "Hard"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingSoftware, setIsAddingSoftware] = useState(false);
  const [isAddingCookie, setIsAddingCookie] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Software form state
  const [softwareForm, setSoftwareForm] = useState({
    title: "",
    version: "",
    description: "",
    category: "",
    platforms: [] as string[],
    downloadUrl: "",
    fileSize: "",
    requirements: "",
    features: "",
    image: null as File | null,
  });

  // Cookie form state
  const [cookieForm, setCookieForm] = useState({
    name: "",
    domain: "",
    category: "",
    purpose: "",
    duration: "",
    dataCollected: "",
    thirdParty: false,
    essential: false,
    description: "",
  });

  const handleSoftwareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast("Software Added Successfully", {
        description: `${softwareForm.title} has been added to the database.`,
      });
      setIsAddingSoftware(false);
      setSoftwareForm({
        title: "",
        version: "",
        description: "",
        category: "",
        platforms: [],
        downloadUrl: "",
        fileSize: "",
        requirements: "",
        features: "",
        image: null,
      });
    }, 1000);
  };

  const handleCookieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast("Cookie Added Successfully", {
        description: `${cookieForm.name} has been added to the database.`,
      });
      setIsAddingCookie(false);
      setCookieForm({
        name: "",
        domain: "",
        category: "",
        purpose: "",
        duration: "",
        dataCollected: "",
        thirdParty: false,
        essential: false,
        description: "",
      });
    }, 1000);
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSoftwareForm((prev) => ({
        ...prev,
        platforms: [...prev.platforms, platform],
      }));
    } else {
      setSoftwareForm((prev) => ({
        ...prev,
        platforms: prev.platforms.filter((p) => p !== platform),
      }));
    }
  };

  const handleImageUpload = (file: File, type: "software" | "cookie") => {
    if (type === "software") {
      setSoftwareForm((prev) => ({ ...prev, image: file }));
    } else {
      setCookieForm((prev) => ({ ...prev, description: file.name }));
    }
    toast("Image Uploaded", {
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const filteredSoftware = existingSoftware.filter(
    (software) =>
      software.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      software.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCookies = existingCookies.filter(
    (cookie) =>
      cookie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cookie.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage software and cookie content
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="software" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Software
            </TabsTrigger>
            <TabsTrigger value="cookies" className="flex items-center gap-2">
              <Cookie className="h-4 w-4" />
              Web Cookies
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Software
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Web Cookies
                  </CardTitle>
                  <Cookie className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Downloads
                  </CardTitle>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45.2M</div>
                  <p className="text-xs text-muted-foreground">
                    +23% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Page Views
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892K</div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Software Uploads</CardTitle>
                  <CardDescription>
                    Latest software added to the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {existingSoftware.slice(0, 3).map((software) => (
                      <div
                        key={software.id}
                        className="flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{software.title}</p>
                          <p className="text-sm text-muted-foreground">
                            v{software.version}
                          </p>
                        </div>
                        <Badge
                          variant={
                            software.status === "Published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {software.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Web Cookies</CardTitle>
                  <CardDescription>
                    Latest cookies added to the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {existingCookies.slice(0, 3).map((cookie) => (
                      <div key={cookie.id} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Cookie className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{cookie.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {cookie.category}
                          </p>
                        </div>
                        <Badge
                          variant={
                            cookie.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {cookie.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Software Tab */}
          <TabsContent value="software" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Software Management</h2>
                <p className="text-muted-foreground">
                  Add, edit, and manage software entries
                </p>
              </div>
              <Dialog
                open={isAddingSoftware}
                onOpenChange={setIsAddingSoftware}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Software
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Software</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add new software to the platform
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSoftwareSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Software Title *</Label>
                        <Input
                          id="title"
                          value={softwareForm.title}
                          onChange={(e) =>
                            setSoftwareForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="e.g., Adobe Photoshop"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="version">Version *</Label>
                        <Input
                          id="version"
                          value={softwareForm.version}
                          onChange={(e) =>
                            setSoftwareForm((prev) => ({
                              ...prev,
                              version: e.target.value,
                            }))
                          }
                          placeholder="e.g., 2024.1.0"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={softwareForm.description}
                        onChange={(e) =>
                          setSoftwareForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe the software and its main features..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={softwareForm.category}
                          onValueChange={(value) =>
                            setSoftwareForm((prev) => ({
                              ...prev,
                              category: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fileSize">File Size</Label>
                        <Input
                          id="fileSize"
                          value={softwareForm.fileSize}
                          onChange={(e) =>
                            setSoftwareForm((prev) => ({
                              ...prev,
                              fileSize: e.target.value,
                            }))
                          }
                          placeholder="e.g., 2.5 GB"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Supported Platforms *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {platforms.map((platform) => (
                          <div
                            key={platform}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`platform-${platform}`}
                              checked={softwareForm.platforms.includes(
                                platform
                              )}
                              onCheckedChange={(checked) =>
                                handlePlatformChange(
                                  platform,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={`platform-${platform}`}
                              className="text-sm"
                            >
                              {platform}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downloadUrl">Download URL *</Label>
                      <Input
                        id="downloadUrl"
                        type="url"
                        value={softwareForm.downloadUrl}
                        onChange={(e) =>
                          setSoftwareForm((prev) => ({
                            ...prev,
                            downloadUrl: e.target.value,
                          }))
                        }
                        placeholder="https://example.com/download"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">System Requirements</Label>
                      <Textarea
                        id="requirements"
                        value={softwareForm.requirements}
                        onChange={(e) =>
                          setSoftwareForm((prev) => ({
                            ...prev,
                            requirements: e.target.value,
                          }))
                        }
                        placeholder="Minimum system requirements..."
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="features">Key Features</Label>
                      <Textarea
                        id="features"
                        value={softwareForm.features}
                        onChange={(e) =>
                          setSoftwareForm((prev) => ({
                            ...prev,
                            features: e.target.value,
                          }))
                        }
                        placeholder="List key features (one per line)..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Software Image</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, "software");
                        }}
                      />
                      {softwareForm.image && (
                        <p className="text-sm text-muted-foreground">
                          Selected: {softwareForm.image.name}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddingSoftware(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Software</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Software List</CardTitle>
                    <CardDescription>
                      Manage existing software entries
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search software..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Software</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Platforms</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSoftware.map((software) => (
                      <TableRow key={software.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{software.title}</p>
                            <p className="text-sm text-muted-foreground">
                              v{software.version}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{software.category}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {software.platforms.map((platform) => (
                              <Badge
                                key={platform}
                                variant="outline"
                                className="text-xs"
                              >
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{software.rating}</TableCell>
                        <TableCell>{software.downloads}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              software.status === "Published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {software.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cookies Tab */}
          <TabsContent value="cookies" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Web Cookie Management</h2>
                <p className="text-muted-foreground">
                  Add, edit, and manage cookie recipes
                </p>
              </div>
              <Dialog open={isAddingCookie} onOpenChange={setIsAddingCookie}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Cookie
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Web Cookie</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new cookie
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCookieSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cookieTitle">Cookie Name *</Label>
                      <Input
                        id="cookieTitle"
                        value={cookieForm.name}
                        onChange={(e) =>
                          setCookieForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., _ga"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cookieDomain">Domain *</Label>
                      <Input
                        id="cookieDomain"
                        value={cookieForm.domain}
                        onChange={(e) =>
                          setCookieForm((prev) => ({
                            ...prev,
                            domain: e.target.value,
                          }))
                        }
                        placeholder="e.g., google-analytics.com"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cookieCategory">Category *</Label>
                        <Select
                          value={cookieForm.category}
                          onValueChange={(value) =>
                            setCookieForm((prev) => ({
                              ...prev,
                              category: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {cookieCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration/Expiration</Label>
                        <Input
                          id="duration"
                          value={cookieForm.duration}
                          onChange={(e) =>
                            setCookieForm((prev) => ({
                              ...prev,
                              duration: e.target.value,
                            }))
                          }
                          placeholder="e.g., 2 years"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dataCollected">Data Collected</Label>
                        <Input
                          id="dataCollected"
                          value={cookieForm.dataCollected}
                          onChange={(e) =>
                            setCookieForm((prev) => ({
                              ...prev,
                              dataCollected: e.target.value,
                            }))
                          }
                          placeholder="e.g., User ID, IP Address"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cookieDescription">
                        Purpose/Description *
                      </Label>
                      <Textarea
                        id="cookieDescription"
                        value={cookieForm.purpose}
                        onChange={(e) =>
                          setCookieForm((prev) => ({
                            ...prev,
                            purpose: e.target.value,
                          }))
                        }
                        placeholder="Describe the purpose of the cookie..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="thirdParty"
                            checked={cookieForm.thirdParty}
                            onCheckedChange={(checked) =>
                              setCookieForm((prev) => ({
                                ...prev,
                                thirdParty: checked as boolean,
                              }))
                            }
                          />
                          <Label htmlFor="thirdParty" className="text-sm">
                            Third Party Cookie
                          </Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="essential"
                            checked={cookieForm.essential}
                            onCheckedChange={(checked) =>
                              setCookieForm((prev) => ({
                                ...prev,
                                essential: checked as boolean,
                              }))
                            }
                          />
                          <Label htmlFor="essential" className="text-sm">
                            Essential Cookie
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddingCookie(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Cookie</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Web Cookies</CardTitle>
                    <CardDescription>
                      Manage existing web cookies
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cookies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cookie Name</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Essential</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCookies.map((cookie) => (
                      <TableRow key={cookie.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{cookie.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {cookie.domain}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{cookie.domain}</TableCell>
                        <TableCell>{cookie.category}</TableCell>
                        <TableCell>{cookie.purpose}</TableCell>
                        <TableCell>{cookie.duration}</TableCell>
                        <TableCell>
                          {cookie.essential ? (
                            <Badge variant="default">Yes</Badge>
                          ) : (
                            <Badge variant="secondary">No</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              cookie.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {cookie.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Analytics & Reports</h2>
              <p className="text-muted-foreground">
                View detailed analytics and performance metrics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Downloads</CardTitle>
                  <CardDescription>
                    Most downloaded software this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Visual Studio Code</span>
                      <span className="text-sm font-medium">5.2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Adobe Photoshop</span>
                      <span className="text-sm font-medium">2.3M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Microsoft Office</span>
                      <span className="text-sm font-medium">1.8M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Categories</CardTitle>
                  <CardDescription>Most viewed categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Developer Tools</span>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Design & Graphics</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Office Tools</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Cookies</CardTitle>
                  <CardDescription>Most viewed web cookies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">_ga</span>
                      <span className="text-sm font-medium">12.5K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">session_id</span>
                      <span className="text-sm font-medium">8.2K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">_fbp</span>
                      <span className="text-sm font-medium">6.8K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
