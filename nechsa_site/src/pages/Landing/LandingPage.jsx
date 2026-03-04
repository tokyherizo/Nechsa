import HeroSection from './sections/HeroSection'
import StatsSection from './sections/StatsSection'
import FeaturesSection from './sections/FeaturesSection'
import HowItWorksSection from './sections/HowItWorksSection'
import MatchingSection from './sections/MatchingSection'
import TestimonialsSection from './sections/TestimonialsSection'
import PricingSection from './sections/PricingSection'
import CTASection from './sections/CTASection'

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MatchingSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  )
}
