"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Ticket,
  Users,
  FolderOpen,
  BarChart3,
  Settings,
  Zap,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  Star,
  Clock,
  Plus,
} from "lucide-react";
import { useAuth as useAuthContext } from "@/hooks/useAuth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  subItems?: NavItem[];
}

interface SidebarCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
  showHeader?: boolean;
}

const getSidebarCategories = (role: string = "agent"): SidebarCategory[] => {
  const complaintItems: NavItem[] = [
    {
      label: "All Complaints",
      href: "/complaints",
      icon: <Ticket className="w-4 h-4" />,
    },
    {
      label: "My Assigned",
      href: "/complaints?filter=assigned",
      icon: <Users className="w-4 h-4" />,
      badge: 3,
    },
    {
      label: "By Priority",
      href: "/complaints?filter=priority",
      icon: <Ticket className="w-4 h-4" />,
    },
  ];

  const dashboardItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
  ];

  const roleBasedItems: Record<string, NavItem[]> = {
    owner: [
      {
        label: "Teams",
        href: "/teams",
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: <FolderOpen className="w-4 h-4" />,
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        label: "Settings",
        href: "/settings/organization",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        label: "Billing",
        href: "/settings/billing",
        icon: <Zap className="w-4 h-4" />,
      },
      {
        label: "Integrations",
        href: "/integrations",
        icon: <Zap className="w-4 h-4" />,
      },
    ],
    admin: [
      {
        label: "Teams",
        href: "/teams",
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: <FolderOpen className="w-4 h-4" />,
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        label: "Settings",
        href: "/settings/organization",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
    manager: [
      {
        label: "My Team",
        href: "/teams/my-team",
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: <FolderOpen className="w-4 h-4" />,
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: <BarChart3 className="w-4 h-4" />,
      },
    ],
    agent: [
      {
        label: "Projects",
        href: "/projects",
        icon: <FolderOpen className="w-4 h-4" />,
      },
    ],
    client: [],
    viewer: [],
  };

  const categories: SidebarCategory[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      items: dashboardItems,
      showHeader: false,
    },
    {
      id: "complaints",
      label: "Complaints",
      icon: <Ticket className="w-5 h-5" />,
      items: complaintItems,
      showHeader: true,
    },
    {
      id: "workspace",
      label: "Workspace",
      icon: <FolderOpen className="w-5 h-5" />,
      items: roleBasedItems[role] || [],
      showHeader: true,
    },
  ];

  return categories;
};

// Sub-component: Left Icon Navigation
const LeftIconNav = ({
  categories,
  activeCategory,
  onSelectCategory,
}: {
  categories: SidebarCategory[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}) => {
  return (
    <div className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-2">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg transition-all duration-200 mb-4"
      >
        <Ticket className="w-6 h-6 text-primary-foreground" />
      </Link>

      <div className="flex-1 flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
            title={category.label}
          >
            {category.icon}
          </button>
        ))}
      </div>

      {/* Profile at bottom */}
      <Link
        href="/profile"
        className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-sidebar-accent transition-colors duration-200 mt-auto"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
          <span className="text-white text-xs font-bold">U</span>
        </div>
      </Link>
    </div>
  );
};

// Sub-component: Right Content Panel
const RightContentPanel = ({
  category,
  pathname,
  onItemClick,
  organization,
  workspace,
  user,
}: {
  category: SidebarCategory | null;
  pathname: string;
  onItemClick?: () => void;
  organization: any;
  workspace: any;
  user: any;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  if (!category) {
    return (
      <div className="flex-1 bg-card border-r border-sidebar-border p-6 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Select a category</p>
      </div>
    );
  }

  const isItemActive = (item: NavItem): boolean => {
    return pathname === item.href || pathname.startsWith(item.href);
  };

  return (
    <div className="flex-1 bg-card border-r border-sidebar-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        {category.showHeader && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {organization?.name?.substring(0, 2).toUpperCase() || "ORG"}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {organization?.name || "Organization"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {workspace?.name || "Workspace"}
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-accent border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-200"
              />
            </div>
          </>
        )}

        {category.id === "dashboard" && (
          <h3 className="text-sm font-semibold text-foreground">Dashboard</h3>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {category.id === "complaints" && (
          <>
            {/* Starred */}
            <div className="px-3 py-3 border-b border-sidebar-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                Starred
              </p>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-accent transition-colors duration-200">
                <Star className="w-4 h-4 text-muted-foreground" />
                <span>Starred Items</span>
              </button>
            </div>

            {/* Recent */}
            <div className="px-3 py-3 border-b border-sidebar-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                Recent
              </p>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-accent transition-colors duration-200">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Recent Items</span>
              </button>
            </div>

            {/* Items */}
            <div className="px-3 py-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                Complaints
              </p>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isItemActive(item)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    }`}
                    onClick={onItemClick}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-destructive text-destructive-foreground rounded-full flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {category.id === "workspace" && (
          <div className="px-3 py-3 space-y-1">
            {category.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isItemActive(item)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={onItemClick}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-destructive text-destructive-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}

        {category.id === "dashboard" && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Welcome to Dashboard
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {category.showHeader && (
        <div className="px-3 py-3 border-t border-sidebar-border">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200">
            <Zap className="w-4 h-4" />
            <span>Manage folders</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Main Sidebar Component
export function Sidebar({ userRole = "agent" }: { userRole?: string }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("complaints");
  const { isLoading, organization, workspace } = useAuthContext();
  const { user } = useUser();
  const categories = getSidebarCategories(userRole);

  const activecat = categories.find((cat) => cat.id === activeCategory) || null;

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-accent lg:hidden"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 h-screen flex bg-sidebar transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isMobileOpen
            ? "translate-x-0 w-screen"
            : "-translate-x-full lg:w-auto"
        }`}
      >
        {/* Left Icon Navigation */}
        <LeftIconNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Right Content Panel */}
        <RightContentPanel
          category={activecat}
          pathname={pathname}
          onItemClick={closeMobileMenu}
          organization={organization}
          workspace={workspace}
          user={user}
        />
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
