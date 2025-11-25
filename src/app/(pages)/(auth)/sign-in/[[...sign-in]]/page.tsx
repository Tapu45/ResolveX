import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Welcome Back
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Sign in to your ProjectPulse account
          </p>
        </div>
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border rounded-md",
                formButtonPrimary:
                  "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
                footerActionLink: "text-[var(--primary)]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
