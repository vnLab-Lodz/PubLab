import path from 'path';
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

export function findByPath(
  node: GitRepoTreeItem,
  targetPath: string,
  step: number = 0
): GitRepoTreeItem | undefined {
  const target = targetPath.split(path.sep)[step];
  if (target === undefined) return node;
  const nextNode = node.children.find(
    (child) => child.filepath.split('/')[step] === target
  );
  if (!nextNode) return undefined;
  return findByPath(nextNode, targetPath, step + 1);
}
