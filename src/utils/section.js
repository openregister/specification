/**
 * @param [String]
 * @param [Array<Edge>] Expects a list of GraphQL Edges.
 */
export function findById(id, edges) {
  const node = edges.find(({node}) => node.frontmatter.id === id);

  return node ? node.node : null;
}
