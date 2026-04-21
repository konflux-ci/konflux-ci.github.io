import { Badge, Label } from "@patternfly/react-core";
import { GithubIcon } from "@patternfly/react-icons";
import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";

const STARS_CACHE_KEY = "konflux-github-stars";
const GITHUB_API_URL = "https://api.github.com/repos/konflux-ci/konflux-ci";

function useGitHubStars(): string {
  const [stars, setStars] = useState(() => {
    if (typeof sessionStorage === "undefined") return "";
    return sessionStorage.getItem(STARS_CACHE_KEY) ?? "";
  });

  useEffect(() => {
    if (stars) return;

    fetch(GITHUB_API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.stargazers_count != null) {
          const formatted = formatStarCount(json.stargazers_count);
          sessionStorage.setItem(STARS_CACHE_KEY, formatted);
          setStars(formatted);
        }
      })
      .catch(() => {
        // Use fallback from YAML
      });
  }, [stars]);

  return stars;
}

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
}

export default function GitHubStars(): ReactNode {
  const stars = useGitHubStars();

  return (
    <Label
      variant="outline"
      href="https://github.com/konflux-ci/konflux-ci"
      icon={<GithubIcon />}
      style={{ marginInlineEnd: "var(--pf-t--global--spacer--md)" }}
    >
      <b>Star</b> <Badge isRead>{stars}</Badge>{" "}
    </Label>
  );
}
