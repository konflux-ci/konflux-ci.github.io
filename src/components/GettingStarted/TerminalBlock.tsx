import React from "react";
import { Card, CardBody, CodeBlock, CodeBlockCode } from "@patternfly/react-core";
import type { GettingStartedData } from "@site/src/types/content";
import SafeLink from "@site/src/components/ui/SafeLink";

interface TerminalBlockProps {
  data: GettingStartedData["terminalBlock"];
}

export default function TerminalBlock({ data }: TerminalBlockProps) {
  return (
    <Card
      isCompact
      style={{
        marginTop: "var(--pf-t--global--spacer--lg)",
      }}
    >
      <CardBody style={{ padding: 0 }}>
        <div
          style={{
            backgroundColor: "#1b1d21",
            borderRadius:
              "var(--pf-t--global--border--radius--medium) var(--pf-t--global--border--radius--medium) 0 0",
            padding:
              "var(--pf-t--global--spacer--sm) var(--pf-t--global--spacer--md)",
            display: "flex",
            gap: "var(--pf-t--global--spacer--xs)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
        </div>
        <CodeBlock>
          <CodeBlockCode>{data.commands}</CodeBlockCode>
        </CodeBlock>
        <div
          style={{
            padding:
              "var(--pf-t--global--spacer--sm) var(--pf-t--global--spacer--md)",
          }}
        >
          <SafeLink
            href={data.linkHref}
            style={{
              color: "var(--pf-t--global--color--brand--default)",
              fontSize: "var(--pf-t--global--font--size--sm)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {data.linkLabel}
          </SafeLink>
        </div>
      </CardBody>
    </Card>
  );
}
