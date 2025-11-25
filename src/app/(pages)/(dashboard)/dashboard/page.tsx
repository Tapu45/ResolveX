import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getCurrentUser, getCurrentOrganization } from "@/lib/clerk/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getCurrentUser();
  const organization = await getCurrentOrganization();

  return (
    <div
      className="container mx-auto py-8 px-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back, {user?.name || user?.email}!
        </p>
      </div>

      {organization ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "var(--card-foreground)" }}>
                Organization
              </CardTitle>
              <CardDescription>{organization.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {organization.workspaces.length} workspace
                {organization.workspaces.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "var(--card-foreground)" }}>
                Workspaces
              </CardTitle>
              <CardDescription>Manage your workspaces</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                <Link href="/dashboard/workspaces">View Workspaces</Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: "var(--card-foreground)" }}>
                Settings
              </CardTitle>
              <CardDescription>Configure your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/settings">Go to Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: "var(--card-foreground)" }}>
              No Organization
            </CardTitle>
            <CardDescription>
              You need to create or join an organization to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <Link href="/dashboard/organizations/new">
                Create Organization
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
