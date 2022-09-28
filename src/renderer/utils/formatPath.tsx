import path from 'path';

export function formatPath(filepath: string, projectDir: string) {
  const split = path.relative(projectDir, filepath).split(path.sep);
  split[split.length - 1] = '';
  return `. / ${split.join(' / ')}`;
}
