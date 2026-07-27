"use client";

import { Navbar } from "@/components/molecules/Navbar";
import { HeroSection } from "@/components/molecules/HeroSection";
import { ProjectsSection } from "@/components/molecules/ProjectsSection";
import { QuoteSection } from "@/components/molecules/QuoteSection";
import { StudioSection } from "@/components/molecules/StudioSection";
import { ApproachSection } from "@/components/molecules/ApproachSection";
import { JournalSection } from "@/components/molecules/JournalSection";
import { ContactSection } from "@/components/molecules/ContactSection";
import RunningCompanyLogo from "@/components/molecules/RunningCompanyLogo";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RunningCompanyLogo />
      <ProjectsSection />
      <QuoteSection />
      <StudioSection />
      <ApproachSection />
      <JournalSection />
      <ContactSection />
    </main>
  );
}