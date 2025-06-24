"use client";

import type React from "react";

import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Bug,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@softhub.com",
    action: "mailto:support@softhub.com",
    available: "24/7",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
    available: "Mon-Fri, 9AM-6PM PST",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with us in real-time",
    contact: "Available on website",
    action: "#",
    available: "Mon-Fri, 9AM-6PM PST",
  },
  {
    icon: MapPin,
    title: "Office Location",
    description: "Visit our headquarters",
    contact: "123 Tech Street, San Francisco, CA 94105",
    action: "https://maps.google.com/?q=123+Tech+Street+San+Francisco+CA",
    available: "Mon-Fri, 9AM-5PM PST",
  },
];

const inquiryTypes = [
  { value: "general", label: "General Inquiry", icon: HelpCircle },
  { value: "support", label: "Technical Support", icon: MessageSquare },
  { value: "bug", label: "Bug Report", icon: Bug },
  { value: "feature", label: "Feature Request", icon: Lightbulb },
  { value: "business", label: "Business Partnership", icon: Mail },
  { value: "press", label: "Press & Media", icon: Mail },
];

const faqs = [
  {
    question: "How do I download software safely?",
    answer:
      "All software on SoftHub is scanned for viruses and malware. Always download from our official links and avoid third-party mirrors.",
  },
  {
    question: "Are the software downloads free?",
    answer:
      "We offer both free and premium software. Free software is clearly marked, while premium software will redirect you to the official purchase page.",
  },
  {
    question: "How often is software updated?",
    answer:
      "We update our software library daily and notify users of new versions through our newsletter and website notifications.",
  },
  {
    question: "Can I request specific software?",
    answer:
      "Yes! Use our contact form to request specific software, and we'll do our best to add it to our library if it meets our quality standards.",
  },
  {
    question: "Do you offer technical support for downloaded software?",
    answer:
      "We provide download support, but for software-specific issues, please contact the original software developer's support team.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      inquiryType: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.subject &&
    formData.message &&
    formData.inquiryType;

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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our software downloads? Need technical support?
            We're here to help you find the perfect software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Methods</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              {method.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {method.description}
                            </p>
                            <div className="space-y-1">
                              <a
                                href={method.action}
                                className="text-sm font-medium text-primary hover:underline block"
                                target={
                                  method.action.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  method.action.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {method.contact}
                              </a>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {method.available}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email Support</span>
                  <Badge variant="secondary">{"< 24 hours"}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Live Chat</span>
                  <Badge variant="secondary">{"< 5 minutes"}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phone Support</span>
                  <Badge variant="secondary">Immediate</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) =>
                        handleInputChange("inquiryType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => {
                          const IconComponent = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your inquiry..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e: any) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions about our software
              downloads and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">
                Email support is available 24/7 with responses within 24 hours.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Self-Help Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/help"
                className="block text-sm text-primary hover:underline"
              >
                → Help Center & Guides
              </Link>
              <Link
                href="/downloads"
                className="block text-sm text-primary hover:underline"
              >
                → Download Instructions
              </Link>
              <Link
                href="/troubleshooting"
                className="block text-sm text-primary hover:underline"
              >
                → Troubleshooting Guide
              </Link>
              <Link
                href="/system-requirements"
                className="block text-sm text-primary hover:underline"
              >
                → System Requirements
              </Link>
              <Link
                href="/security"
                className="block text-sm text-primary hover:underline"
              >
                → Security & Safety Tips
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Community Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/forum"
                className="block text-sm text-primary hover:underline"
              >
                → Community Forum
              </Link>
              <Link
                href="/discord"
                className="block text-sm text-primary hover:underline"
              >
                → Discord Server
              </Link>
              <Link
                href="/reddit"
                className="block text-sm text-primary hover:underline"
              >
                → Reddit Community
              </Link>
              <Link
                href="/feedback"
                className="block text-sm text-primary hover:underline"
              >
                → Submit Feedback
              </Link>
              <Link
                href="/feature-requests"
                className="block text-sm text-primary hover:underline"
              >
                → Feature Requests
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                  Emergency Support
                </h3>
                <p className="text-sm text-red-700 dark:text-red-200 mb-3">
                  For critical security issues or urgent technical problems that
                  affect your system's safety, contact our emergency support
                  line.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Phone className="h-4 w-4" />
                    Emergency: +1 (555) 911-HELP
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Mail className="h-4 w-4" />
                    urgent@softhub.com
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
