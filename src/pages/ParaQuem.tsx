import {
  HeroSection,
  IdentificationSection,
  SimplicitySection,
  PositioningSection,
  PurposeSection,
  TestimonialsSection,
  CTASection,
} from "@/components/para-quem";

const ParaQuemPage = () => {
  return (
    <main className="flex-1">
      <HeroSection />
      <IdentificationSection />
      <SimplicitySection />
      <PositioningSection />
      <PurposeSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default ParaQuemPage;
