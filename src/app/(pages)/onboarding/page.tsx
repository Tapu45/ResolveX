"use client";

import { motion, cubicBezier, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Upload,
  CheckCircle,
  Sparkle,
  Building,
  Globe,
  X,
  ImageSquare,
} from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { Mail } from "lucide-react";

interface FormData {
  name: string;
  slug: string;
  domain: string;
  billingEmail: string;
  logoUrl: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    slug: "",
    domain: "",
    billingEmail: "",
    logoUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.34, 1.56, 0.64, 1),
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.34, 1.56, 0.64, 1),
      },
    },
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!userId) {
      router.push("/sign-up");
    }
  }, [userId, router]);

  // Generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
  };

  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        logoUrl: "Please upload an image file",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        logoUrl: "File size must be less than 5MB",
      }));
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploadingLogo(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("uploadType", "avatar");

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setFormData((prev) => ({
            ...prev,
            logoUrl: response.data.url,
          }));
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.logoUrl;
            return newErrors;
          });
          setUploadingLogo(false);
          setUploadProgress(0);
        }
      });

      xhr.addEventListener("error", () => {
        setErrors((prev) => ({
          ...prev,
          logoUrl: "Failed to upload logo",
        }));
        setUploadingLogo(false);
        setUploadProgress(0);
      });

      xhr.open("POST", "/api/upload");
      xhr.send(formDataToSend);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        logoUrl: "Failed to upload logo",
      }));
      setUploadingLogo(false);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required";
    } else if (formData.name.length > 255) {
      newErrors.name = "Organization name must be less than 255 characters";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
    } else if (formData.slug.length > 100) {
      newErrors.slug = "Slug must be less than 100 characters";
    }

    if (formData.domain && !isValidUrl(formData.domain)) {
      newErrors.domain = "Please enter a valid URL";
    }

    if (formData.billingEmail && !isValidEmail(formData.billingEmail)) {
      newErrors.billingEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          domain: formData.domain || undefined,
          billingEmail: formData.billingEmail || undefined,
          logoUrl: formData.logoUrl || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          const newErrors: FormErrors = {};
          data.details.forEach((detail: any) => {
            newErrors[detail.path] = detail.message;
          });
          setErrors(newErrors);
        } else {
          setErrors({ submit: data.error || "Failed to create organization" });
        }
        setLoading(false);
        return;
      }

      setSuccessMessage("Organization created successfully!");
      setStep(2);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push(`/dashboard/${data.data.id}`);
      }, 2000);
    } catch (error) {
      setErrors({
        submit: "An error occurred. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[color:var(--background)] via-[color:var(--card)] to-[color:var(--background)] dark:from-[color:var(--background)] dark:via-[color:var(--card)] dark:to-[color:var(--background)]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-40 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.1,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
            transition: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-7xl">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              >
                {/* Left Side - Engaging Content */}
                <motion.div
                  className="flex flex-col justify-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Illustration */}
                  <motion.div
                    variants={itemVariants}
                    className="mb-8 relative h-80 rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] opacity-10" />

                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] mb-6"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Building
                            size={48}
                            weight="fill"
                            className="text-white"
                          />
                        </motion.div>

                        <p className="text-sm font-semibold text-[color:var(--foreground)] max-w-xs">
                          Set up your organization and start managing complaints
                          in minutes
                        </p>
                      </div>
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute top-6 right-6 w-12 h-12 rounded-lg bg-[color:var(--card)] border border-[color:var(--border)] flex items-center justify-center"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkle
                        size={24}
                        weight="fill"
                        className="text-[color:var(--primary)]"
                      />
                    </motion.div>

                    <motion.div
                      className="absolute bottom-6 left-6 w-10 h-10 rounded-lg bg-[color:var(--card)] border border-[color:var(--border)] flex items-center justify-center"
                      animate={{
                        y: [0, 10, 0],
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    >
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-[color:var(--secondary)]"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Features List */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="text-2xl font-bold text-[color:var(--foreground)] mb-6">
                      What you'll get:
                    </h3>

                    {[
                      {
                        icon: CheckCircle,
                        text: "Dedicated workspace for your team",
                      },
                      {
                        icon: Sparkle,
                        text: "AI-powered complaint management",
                      },
                      {
                        icon: Globe,
                        text: "Enterprise-grade security & compliance",
                      },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.3 + idx * 0.1,
                          duration: 0.5,
                        }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[color:var(--primary)] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                          <feature.icon
                            size={20}
                            weight="fill"
                            className="text-[color:var(--primary)]"
                          />
                        </div>
                        <span className="text-sm font-medium text-[color:var(--foreground)]">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 grid grid-cols-2 gap-4"
                  >
                    {[
                      { value: "500+", label: "Organizations" },
                      { value: "2.5M+", label: "Complaints Managed" },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg bg-[color:var(--card)] border border-[color:var(--border)]"
                      >
                        <p className="text-2xl font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                          {stat.value}
                        </p>
                        <p className="text-xs text-[color:var(--muted-foreground)] mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                  className="flex flex-col justify-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <h1 className="text-4xl font-bold text-[color:var(--foreground)] mb-3">
                      Create Your
                      <br />
                      <span className="bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                        Organization
                      </span>
                    </h1>
                    <p className="text-[color:var(--muted-foreground)]">
                      Set up your workspace in just a few minutes. You can
                      always update these details later.
                    </p>
                  </motion.div>

                  {/* Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    variants={containerVariants}
                  >
                    {/* Error Message */}
                    <AnimatePresence>
                      {errors.submit && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 rounded-lg bg-[color:var(--destructive)] bg-opacity-10 border border-[color:var(--destructive)] border-opacity-50 text-[color:var(--destructive)] text-sm"
                        >
                          {errors.submit}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Organization Name */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-[color:var(--foreground)] mb-2">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="e.g., Acme Corporation"
                        className={`w-full px-4 py-3 rounded-lg bg-[color:var(--input)] border ${
                          errors.name
                            ? "border-[color:var(--destructive)]"
                            : "border-[color:var(--border)]"
                        } text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-20 transition-all`}
                      />
                      {errors.name && (
                        <p className="mt-2 text-xs text-[color:var(--destructive)]">
                          {errors.name}
                        </p>
                      )}
                    </motion.div>

                    {/* Slug */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-[color:var(--foreground)] mb-2">
                        Organization Slug *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            slug: e.target.value,
                          }));
                          if (errors.slug)
                            setErrors((prev) => ({ ...prev, slug: "" }));
                        }}
                        placeholder="acme-corporation"
                        className={`w-full px-4 py-3 rounded-lg bg-[color:var(--input)] border ${
                          errors.slug
                            ? "border-[color:var(--destructive)]"
                            : "border-[color:var(--border)]"
                        } text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-20 transition-all`}
                      />
                      <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                        Used in URLs • lowercase, numbers and hyphens only
                      </p>
                      {errors.slug && (
                        <p className="mt-2 text-xs text-[color:var(--destructive)]">
                          {errors.slug}
                        </p>
                      )}
                    </motion.div>

                    {/* Logo Upload */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-[color:var(--foreground)] mb-2">
                        Organization Logo
                      </label>
                      <div className="relative">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />

                        {logoPreview || formData.logoUrl ? (
                          <div className="relative h-32 rounded-lg overflow-hidden border-2 border-[color:var(--border)] group cursor-pointer">
                            <Image
                              src={logoPreview || formData.logoUrl}
                              alt="Logo preview"
                              fill
                              className="object-cover"
                            />

                            {uploadingLogo && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-12 h-12 rounded-full border-4 border-[color:var(--primary)] border-t-transparent animate-spin mx-auto mb-2" />
                                  <p className="text-white text-sm font-medium">
                                    {uploadProgress}%
                                  </p>
                                </div>
                              </div>
                            )}

                            {!uploadingLogo && (
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="flex items-center gap-2 px-4 py-2 bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-lg opacity-0 group-hover:opacity-100 transition-all text-sm font-medium"
                                >
                                  <Upload size={16} weight="bold" />
                                  Change
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <motion.button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-32 rounded-lg border-2 border-dashed border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 bg-[color:var(--card)] bg-opacity-50 hover:bg-opacity-80 transition-all flex flex-col items-center justify-center group"
                          >
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <ImageSquare
                                size={32}
                                weight="fill"
                                className="text-[color:var(--muted-foreground)] group-hover:text-[color:var(--primary)] transition-colors mb-2"
                              />
                            </motion.div>
                            <span className="text-sm font-medium text-[color:var(--foreground)]">
                              Click to upload
                            </span>
                            <span className="text-xs text-[color:var(--muted-foreground)]">
                              PNG, JPG up to 5MB
                            </span>
                          </motion.button>
                        )}
                      </div>

                      {uploadingLogo && (
                        <p className="mt-2 text-xs text-[color:var(--primary)]">
                          Uploading... {uploadProgress}%
                        </p>
                      )}

                      {errors.logoUrl && (
                        <p className="mt-2 text-xs text-[color:var(--destructive)]">
                          {errors.logoUrl}
                        </p>
                      )}
                    </motion.div>

                    {/* Domain */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-[color:var(--foreground)] mb-2">
                        Domain (Optional)
                      </label>
                      <div className="flex items-center gap-2">
                        <Globe
                          size={16}
                          className="text-[color:var(--muted-foreground)]"
                        />
                        <input
                          type="text"
                          value={formData.domain}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              domain: e.target.value,
                            }));
                            if (errors.domain)
                              setErrors((prev) => ({ ...prev, domain: "" }));
                          }}
                          placeholder="https://www.acme.com"
                          className={`flex-1 px-4 py-3 rounded-lg bg-[color:var(--input)] border ${
                            errors.domain
                              ? "border-[color:var(--destructive)]"
                              : "border-[color:var(--border)]"
                          } text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-20 transition-all`}
                        />
                      </div>
                      {errors.domain && (
                        <p className="mt-2 text-xs text-[color:var(--destructive)]">
                          {errors.domain}
                        </p>
                      )}
                    </motion.div>

                    {/* Billing Email */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-[color:var(--foreground)] mb-2">
                        Billing Email (Optional)
                      </label>
                      <div className="flex items-center gap-2">
                        <Mail
                          size={16}
                          className="text-[color:var(--muted-foreground)]"
                        />
                        <input
                          type="email"
                          value={formData.billingEmail}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              billingEmail: e.target.value,
                            }));
                            if (errors.billingEmail)
                              setErrors((prev) => ({
                                ...prev,
                                billingEmail: "",
                              }));
                          }}
                          placeholder="billing@acme.com"
                          className={`flex-1 px-4 py-3 rounded-lg bg-[color:var(--input)] border ${
                            errors.billingEmail
                              ? "border-[color:var(--destructive)]"
                              : "border-[color:var(--border)]"
                          } text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-20 transition-all`}
                        />
                      </div>
                      {errors.billingEmail && (
                        <p className="mt-2 text-xs text-[color:var(--destructive)]">
                          {errors.billingEmail}
                        </p>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || uploadingLogo}
                      className="w-full px-6 py-4 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold flex items-center justify-center gap-2 group hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-[color:var(--primary-foreground)] border-t-transparent animate-spin" />
                          Creating Organization...
                        </>
                      ) : (
                        <>
                          Create Organization
                          <ArrowRight
                            size={18}
                            weight="bold"
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </motion.button>

                    {/* Info Text */}
                    <p className="text-xs text-[color:var(--muted-foreground)] text-center">
                      By creating an organization, you agree to our{" "}
                      <a
                        href="/terms"
                        className="text-[color:var(--primary)] hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-[color:var(--primary)] hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </motion.form>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center text-center max-w-md mx-auto"
              >
                <motion.div
                  animate={{
                    scale: [0, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 rounded-full bg-[color:var(--secondary)] bg-opacity-20 border-2 border-[color:var(--secondary)] flex items-center justify-center">
                    <CheckCircle
                      size={40}
                      weight="fill"
                      className="text-[color:var(--secondary)]"
                    />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-[color:var(--foreground)] mb-3"
                >
                  Organization Created!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[color:var(--muted-foreground)] mb-8"
                >
                  {successMessage} Redirecting to your dashboard...
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full h-1 bg-[color:var(--border)] rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
