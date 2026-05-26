import {
  HeroSection,
  HowItWorksSection,
  PainSolutionSection,
  ConceptSection,
  AgentShowcaseSection,
  AdvantagesSection,
  NumbersSection,
  PricingSection,
  TestimonialsSection,
  CasesSection,
  FAQSection,
  BlogSection,
} from "@/components/home";

const Index = () => {
  return (
    <main className="flex-1">
      <HeroSection />
      <HowItWorksSection />
      <PainSolutionSection />
      <ConceptSection />
      <AgentShowcaseSection />
      <AdvantagesSection />
      <NumbersSection />
      <PricingSection />
      <TestimonialsSection />
      <CasesSection />
      <FAQSection />
      <BlogSection />
    </main>
  );
};

export default Index;
