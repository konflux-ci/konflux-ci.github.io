import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HeroSection from "@site/src/components/Landing/HeroSection";
import WhyKonfluxSection from "@site/src/components/Landing/WhyKonfluxSection";
import TourFactorySection from "@site/src/components/Landing/TourFactorySection";
import LifecycleSection from "@site/src/components/Landing/LifecycleSection";
import BottomCTASection from "@site/src/components/Landing/BottomCTASection";
import landingData from "@site/data/landing.yaml";
import type { LandingData } from "@site/src/types/content";

const data = landingData as unknown as LandingData;

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Konflux — open-source Kubernetes-native CI/CD platform"
    >
      <HeroSection data={data.hero} />
      <TourFactorySection data={data.tourTheFactory} />
      <WhyKonfluxSection data={data.whyKonflux} />
      <LifecycleSection data={data.howItWorks} />
      <BottomCTASection data={data.bottomCTA} />
    </Layout>
  );
}
