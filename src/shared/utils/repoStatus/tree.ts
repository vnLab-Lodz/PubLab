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
  { targetPathSeparator = '/', step = 0 } = {}
): GitRepoTreeItem | undefined {
  const target = targetPath.split(targetPathSeparator)[step];
  if (target === undefined) return node;
  const nextNode = node.children.find(
    (child) => child.filepath.split('/')[step] === target
  );
  if (!nextNode) return undefined;
  return findByPath(nextNode, targetPath, {
    targetPathSeparator,
    step: step + 1,
  });
}

export function replaceChildNode(
  node: GitRepoTreeItem,
  payload: GitRepoTreeItem,
  { targetPathSeparator = '/', step = 0 } = {}
): GitRepoTreeItem | undefined {
  const target = payload.filepath.split(targetPathSeparator)[step];
  if (target === undefined) return payload;
  const nextNodeIndex = node.children.findIndex(
    (child) => child.filepath.split('/')[step] === target
  );
  const nextNode = replaceChildNode(node.children[nextNodeIndex], payload, {
    targetPathSeparator,
    step: step + 1,
  });
  if (!nextNode) return undefined;
  const output = { ...node };
  output.children[nextNodeIndex] = nextNode;
  return output;
}
