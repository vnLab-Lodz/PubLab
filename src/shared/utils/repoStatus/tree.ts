import { GitRepoTreeItem } from '../../types/api';

export function search(
  node: GitRepoTreeItem,
  isMatch: (node: GitRepoTreeItem) => Boolean
): GitRepoTreeItem[] {
  const matchedChildren = node.children.flatMap((child) =>
    search(child, isMatch)
  );
  const isNodeMatched = isMatch(node);
  return isNodeMatched ? [node, ...matchedChildren] : matchedChildren;
}
