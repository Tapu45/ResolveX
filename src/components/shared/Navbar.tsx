"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronRight,
  Command,
  X,
  LogOut,
  Settings,
  Zap,
} from "lucide-react";

interface NavbarProps {
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

// Sub-component: Breadcrumb
const Breadcrumb = ({
  breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Complaints", href: "/complaints" },
    { label: "High Priority Issues" },
  ],
}: {
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}) => {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center gap-1">
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-sm text-foreground font-medium">
              {crumb.label}
            </span>
          )}
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          )}
        </div>
      ))}
    </nav>
  );
};

// Sub-component: Search Bar
const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const recentSearches = [
    { id: 1, query: "Payment issue", category: "Complaints" },
    { id: 2, query: "Login problem", category: "Complaints" },
    { id: 3, query: "Billing inquiry", category: "Complaints" },
  ];

  const suggestions = [
    {
      id: 1,
      title: "Complaint #1234",
      description: "Payment processing failed",
      category: "Complaint",
    },
    {
      id: 2,
      title: "User: John Doe",
      description: "Support Manager",
      category: "User",
    },
    {
      id: 3,
      title: "Project: E-commerce",
      description: "Active project",
      category: "Project",
    },
  ];

  return (
    <div className="relative hidden sm:block w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search complaints, users, projects..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:block text-xs font-semibold text-muted-foreground px-2 py-1 bg-muted rounded border border-border">
          <Command className="w-3 h-3 inline mr-1" />K
        </kbd>
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {!searchQuery ? (
            <div className="p-4">
              {/* Recent Searches */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Recent Searches
                </p>
                <div className="space-y-2">
                  {recentSearches.map((search) => (
                    <button
                      key={search.id}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground group-hover:text-primary">
                          {search.query}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {search.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              {/* Search Results */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Results for "{searchQuery}"
              </p>
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion.id}
                    href="#"
                    className="block px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary">
                          {suggestion.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {suggestion.description}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {suggestion.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View all results */}
              <Link
                href="/search"
                className="mt-4 block w-full px-3 py-2 text-center text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
              >
                View all results →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Search Overlay Close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

// Sub-component: Theme Toggle
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-accent transition-colors duration-200 text-muted-foreground hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

// Sub-component: Notifications Dropdown
const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount] = useState(5);

  const notifications = [
    {
      id: 1,
      type: "complaint",
      title: "New Complaint Assigned",
      description: "Complaint #5678 assigned to you",
      timestamp: "5 mins ago",
      isRead: false,
      icon: "🎯",
    },
    {
      id: 2,
      type: "comment",
      title: "New Comment on Complaint",
      description: "Client commented on complaint #5612",
      timestamp: "15 mins ago",
      isRead: false,
      icon: "💬",
    },
    {
      id: 3,
      type: "resolved",
      title: "Complaint Resolved",
      description: "Complaint #5600 has been resolved",
      timestamp: "1 hour ago",
      isRead: true,
      icon: "✅",
    },
    {
      id: 4,
      type: "escalation",
      title: "High Priority Alert",
      description: "Complaint #5598 escalated to urgent",
      timestamp: "2 hours ago",
      isRead: true,
      icon: "⚠️",
    },
    {
      id: 5,
      type: "team",
      title: "Team Update",
      description: "John joined your team",
      timestamp: "3 hours ago",
      isRead: true,
      icon: "👥",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-accent transition-colors duration-200 text-muted-foreground hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 max-h-96 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {unreadCount} New
              </span>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                href="#"
                className={`px-4 py-3 border-b border-border hover:bg-accent transition-colors duration-200 flex gap-3 last:border-b-0 ${
                  !notification.isRead ? "bg-primary/5" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="text-xl flex-shrink-0">{notification.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {notification.timestamp}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                )}
              </Link>
            ))}
          </div>

          {/* Footer */}
          <Link
            href="/notifications"
            className="px-4 py-3 text-center text-sm font-medium text-primary hover:bg-accent transition-colors duration-200 border-t border-border"
          >
            View all notifications →
          </Link>
        </div>
      )}

      {/* Close overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

// Sub-component: Quick Menu
const QuickMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-accent transition-colors duration-200 text-muted-foreground hover:text-foreground"
        aria-label="Quick menu"
      >
        <Zap className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-2 space-y-1">
            <Link
              href="/settings/account"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200 text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200 text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </Link>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

// Main Navbar Component
export function Navbar({ breadcrumbs }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
      <div className="px-4 py-3 lg:px-6 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Breadcrumb */}
          <Breadcrumb breadcrumbs={breadcrumbs} />

          {/* Center: Search */}
          <div className="flex-1 flex justify-center px-4">
            <SearchBar />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationsDropdown />
            <QuickMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
