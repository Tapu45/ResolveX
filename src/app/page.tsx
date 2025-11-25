import Hero from "@/components/home/Hero";
import DashboardPreview from "@/components/home/DashboardPreview";
import UseCases from "@/components/home/UseCases";
import Testimonial from "@/components/home/Testimonial";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="w-full bg-[color:var(--background)] dark:bg-[color:var(--background)]">
      {/* Hero Section */}
      <Hero />

      {/* Dashboard Preview Section */}
      <DashboardPreview />

      {/* Use Cases Section */}
      <UseCases />

      {/* Testimonials Section */}
      <Testimonial />

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
