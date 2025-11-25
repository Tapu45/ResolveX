"use client";

import { useUser } from "@clerk/nextjs";
import {
  useCallback,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react";
import { createLogger } from "@/lib/logger";

const logger = createLogger("AuthProvider");

export interface AuthContextType {
  user: any;
  organization: any | null;
  workspace: any | null;
  isLoading: boolean;
  error: string | null;
  switchOrganization: (orgId: string) => Promise<void>;
  switchWorkspace: (wsId: string) => Promise<void>;
  refetchAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user: clerkUser, isLoaded } = useUser();
  const [organization, setOrganization] = useState<any>(null);
  const [workspace, setWorkspace] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============ FETCH ORGANIZATIONS ============
  const fetchOrganizations = useCallback(async () => {
    if (!clerkUser) {
      logger.debug("No Clerk user, skipping org fetch");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      logger.debug("Fetching organizations for user", { userId: clerkUser.id });

      const response = await fetch("/api/organizations");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch organizations");
      }

      const data = await response.json();
      const organizations = data.data || [];

      logger.debug("Organizations fetched", { count: organizations.length });

      if (organizations.length === 0) {
        logger.warn("User has no organizations");
        setOrganization(null);
        setWorkspace(null);
        setIsLoading(false);
        return;
      }

      // Get first organization (or from localStorage if exists)
      const savedOrgId = localStorage.getItem("currentOrgId");
      const currentOrg =
        organizations.find((org: any) => org.id === savedOrgId) ||
        organizations[0];

      logger.success("Organization set", {
        organizationId: currentOrg.id,
        name: currentOrg.name,
      });

      setOrganization(currentOrg);
      localStorage.setItem("currentOrgId", currentOrg.id);

      // Fetch workspaces for this organization
      await fetchWorkspaces(currentOrg.id);
    } catch (err) {
      logger.error("Error fetching organizations", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch organizations";
      setError(errorMessage);
      setIsLoading(false);
    }
  }, [clerkUser]);

  // ============ FETCH WORKSPACES ============
  const fetchWorkspaces = useCallback(async (orgId: string) => {
    try {
      logger.debug("Fetching workspaces", { organizationId: orgId });

      const response = await fetch(`/api/workspaces?organizationId=${orgId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch workspaces");
      }

      const data = await response.json();
      const workspaces = data.data || [];

      logger.debug("Workspaces fetched", { count: workspaces.length });

      if (workspaces.length === 0) {
        logger.warn("Organization has no workspaces");
        setWorkspace(null);
        setIsLoading(false);
        return;
      }

      // Get first workspace or from localStorage
      const savedWsId = localStorage.getItem("currentWsId");
      const currentWs =
        workspaces.find((ws: any) => ws.id === savedWsId) || workspaces[0];

      logger.success("Workspace set", {
        workspaceId: currentWs.id,
        name: currentWs.name,
      });

      setWorkspace(currentWs);
      localStorage.setItem("currentWsId", currentWs.id);
      setIsLoading(false);
    } catch (err) {
      logger.error("Error fetching workspaces", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch workspaces";
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  // ============ SWITCH ORGANIZATION ============
  const switchOrganization = useCallback(
    async (orgId: string) => {
      try {
        logger.debug("Switching organization", { organizationId: orgId });
        setIsLoading(true);
        setError(null);

        localStorage.setItem("currentOrgId", orgId);

        const response = await fetch("/api/organizations");
        if (!response.ok) {
          throw new Error("Failed to fetch organizations");
        }

        const data = await response.json();
        const orgs = data.data || [];
        const org = orgs.find((o: any) => o.id === orgId);

        if (!org) {
          throw new Error("Organization not found");
        }

        setOrganization(org);
        await fetchWorkspaces(orgId);

        logger.success("Organization switched", { organizationId: orgId });
      } catch (err) {
        logger.error("Error switching organization", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to switch organization";
        setError(errorMessage);
        setIsLoading(false);
      }
    },
    [fetchWorkspaces]
  );

  // ============ SWITCH WORKSPACE ============
  const switchWorkspace = useCallback(
    async (wsId: string) => {
      try {
        logger.debug("Switching workspace", { workspaceId: wsId });
        setError(null);

        if (!organization?.id) {
          throw new Error("No organization selected");
        }

        localStorage.setItem("currentWsId", wsId);

        const response = await fetch(
          `/api/workspaces?organizationId=${organization.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workspaces");
        }

        const data = await response.json();
        const workspaces = data.data || [];
        const ws = workspaces.find((w: any) => w.id === wsId);

        if (!ws) {
          throw new Error("Workspace not found");
        }

        setWorkspace(ws);

        logger.success("Workspace switched", { workspaceId: wsId });
      } catch (err) {
        logger.error("Error switching workspace", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to switch workspace";
        setError(errorMessage);
      }
    },
    [organization?.id]
  );

  // ============ REFETCH AUTH ============
  const refetchAuth = useCallback(async () => {
    logger.debug("Refetching auth data");
    await fetchOrganizations();
  }, [fetchOrganizations]);

  // ============ INITIAL FETCH ============
  useEffect(() => {
    if (isLoaded && clerkUser) {
      logger.debug("Clerk user loaded, fetching organizations");
      fetchOrganizations();
    }
  }, [isLoaded, clerkUser, fetchOrganizations]);

  // ============ PROVIDE CONTEXT ============
  const value: AuthContextType = {
    user: clerkUser,
    organization,
    workspace,
    isLoading,
    error,
    switchOrganization,
    switchWorkspace,
    refetchAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
