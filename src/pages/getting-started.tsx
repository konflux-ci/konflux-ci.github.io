import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import GettingStartedPageContent from '@site/src/components/GettingStartedPage';
import gettingStartedData from '@site/data/getting-started.yaml';
import type { GettingStartedData } from '@site/src/types/content';

const data = gettingStartedData as unknown as GettingStartedData;

export default function GettingStarted(): ReactNode {
  return (
    <Layout
      title="Getting Started"
      description="Get your first secure CI/CD pipeline running in minutes with Konflux."
    >
      <GettingStartedPageContent data={data} />
    </Layout>
  );
}
