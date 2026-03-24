// Allow importing YAML files as modules.
// The yaml-loader webpack plugin parses them into JS objects at build time.
declare module '*.yaml' {
  const data: Record<string, unknown>;
  export default data;
}
