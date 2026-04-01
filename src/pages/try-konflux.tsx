import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import TryKonfluxPage from "@site/src/components/TryKonfluxPage";
import tryKonfluxData from "@site/data/try-konflux.yaml";
import type { TryKonfluxData } from "@site/src/types/content";

const data = tryKonfluxData as unknown as TryKonfluxData;

export default function TryKonflux(): ReactNode {
  return (
    <Layout
      title="Try Konflux"
      description="Get Konflux running on your own cluster in minutes. Choose between local installation with Kind or Kubernetes deployment."
    >
      <TryKonfluxPage data={data} />
    </Layout>
  );
}
