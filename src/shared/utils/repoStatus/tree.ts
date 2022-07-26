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
  { targetPathSeparator = path.sep, step = 0 } = {}
): GitRepoTreeItem | undefined {
  const target = path
    .relative(node.filepath, targetPath)
    .split(targetPathSeparator)[0];
  if (target === '') return node;
  const nextNode = node.children.find(
    (child) => path.basename(child.filepath) === target
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
  { targetPathSeparator = path.sep, step = 0 } = {}
): GitRepoTreeItem | undefined {
  const target = path
    .relative(node.filepath, payload.filepath)
    .split(targetPathSeparator)[0];
  if (target === '') return payload;
  const nextNodeIndex = node.children.findIndex(
    (child) => path.basename(child.filepath) === target
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
