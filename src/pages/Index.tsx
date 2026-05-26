import {
  HeroSection,
  BenefitsMarquee,
  HowItWorksSection,
  PainSolutionSection,
  ConceptSection,
  ProductsComparisonSection,
  AgentShowcaseSection,
  AdvantagesSection,
  NumbersSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  BlogSection,
  CasesSection,
} from "@/components/home";

const Index = () => {
  return (
    <main className="flex-1">
      <HeroSection />
      <BenefitsMarquee />
      <HowItWorksSection />
      <PainSolutionSection />
      <ConceptSection />
      <ProductsComparisonSection />
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
