import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

function applyClass() {
  const theme = document.documentElement.getAttribute("data-theme");
  document.documentElement.classList.toggle(
    "pf-v6-theme-dark",
    theme === "dark",
  );
}

if (ExecutionEnvironment.canUseDOM) {
  applyClass();

  const observer = new MutationObserver(applyClass);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-theme-choice", "class"],
  });
}

export function onRouteDidUpdate() {
  applyClass();
}
