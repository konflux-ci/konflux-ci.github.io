import type { ReactNode } from "react";
import { Title, Grid, GridItem, Flex, Content } from "@patternfly/react-core";
import type { ComparisonTable as ComparisonTableType } from "@site/src/types/content";
import "./ComparisonTable.css";

interface ComparisonTableProps {
  data: ComparisonTableType;
}

export default function ComparisonTable({
  data,
}: ComparisonTableProps): ReactNode {
  return (
    <Flex
      direction={{ default: "column" }}
      gap={{ default: "gapLg" }}
      className="comparison-table-container"
    >
      <Title headingLevel="h3" size="lg" className="comparison-table-heading">
        {data.heading}
      </Title>

      {/* Desktop table view */}
      <div className="comparison-table-desktop">
        <Grid hasGutter={false}>
          {/* Header row */}
          {data.columns.map((column) => (
            <GridItem
              key={column.key}
              span={4}
              className={`comparison-table-header-cell ${
                column.key !== "feature" ? "subtle" : ""
              }`}
            >
              {column.label}
            </GridItem>
          ))}

          {/* Data rows */}
          {data.rows.map((row, rowIndex) => (
            <>
              {data.columns.map((column, colIndex) => {
                const classNames = [
                  "comparison-table-cell",
                  column.key === "feature" ? "feature" : "",
                  rowIndex % 2 === 1 ? "striped" : "",
                  rowIndex < data.rows.length - 1 ? "border-bottom" : "",
                  colIndex < data.columns.length - 1 ? "border-right" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <GridItem
                    key={`${rowIndex}-${column.key}`}
                    span={4}
                    className={classNames}
                  >
                    {row[column.key]}
                  </GridItem>
                );
              })}
            </>
          ))}
        </Grid>
      </div>

      {/* Mobile card view */}
      <Flex
        direction={{ default: "column" }}
        gap={{ default: "gapMd" }}
        className="comparison-table-mobile"
      >
        {data.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="comparison-table-mobile-card">
            <Content component="p" className="comparison-table-mobile-feature">
              {row.feature}
            </Content>
            {data.columns.slice(1).map((column) => (
              <Flex
                key={column.key}
                gap={{ default: "gapSm" }}
                className="comparison-table-mobile-row"
              >
                <div className="comparison-table-mobile-label">
                  {column.label}:
                </div>
                <div className="comparison-table-mobile-value">
                  {row[column.key]}
                </div>
              </Flex>
            ))}
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
