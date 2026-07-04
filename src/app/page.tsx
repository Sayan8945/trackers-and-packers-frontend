import TopHeader from "@/components/layout/TopHeader";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustStats from "@/components/sections/TrustStats";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CitySection from "@/components/sections/CitySection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-white">
      {/*
        TopHeader : fixed, ~36px tall, visible md+
        Navbar    : fixed below TopHeader

        Spacer compensates for the combined fixed bar height:
          mobile  : 72px  (navbar only — TopHeader is hidden md:block)
          md      : 108px (36px TopHeader + 72px navbar)
          lg      : 132px (36px TopHeader + 96px navbar)
      */}
      <TopHeader />
      <Navbar />
      <div className="h-16 md:h-[100px] lg:h-[116px]" aria-hidden="true" />

      <HeroSection />
      <TrustStats />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <ProcessTimeline />
      <CitySection />
      <FAQSection />
      <CTABanner />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
