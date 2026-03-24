import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import LocaleDropdownNavbarItem from "@theme/NavbarItem/LocaleDropdownNavbarItem";
import SearchNavbarItem from "@theme/NavbarItem/SearchNavbarItem";
import HtmlNavbarItem from "@theme/NavbarItem/HtmlNavbarItem";
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem";
import DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem";
import DocsVersionNavbarItem from "@theme/NavbarItem/DocsVersionNavbarItem";
import DocsVersionDropdownNavbarItem from "@theme/NavbarItem/DocsVersionDropdownNavbarItem";

// Custom navbar items - PatternFly based
import DefaultNavbarItem from "@site/src/components/NavbarItems/DefaultNavbarItem";
import GitHubStars from "@site/src/components/NavbarItems/GitHubStars";

import type { ComponentTypesObject } from "@theme/NavbarItem/ComponentTypes";

const ComponentTypes: ComponentTypesObject = {
  default: DefaultNavbarItem, // Custom PatternFly Button-based default item
  localeDropdown: LocaleDropdownNavbarItem,
  search: SearchNavbarItem,
  dropdown: DropdownNavbarItem,
  html: HtmlNavbarItem,
  doc: DocNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  docsVersionDropdown: DocsVersionDropdownNavbarItem,
  // Custom types
  "custom-githubStars": GitHubStars,
};

export default ComponentTypes;
