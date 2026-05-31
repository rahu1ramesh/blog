export const markdownModules = import.meta.glob('/contents/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const imageMap = import.meta.glob(
  '/contents/**/*.{png,jpg,jpeg,gif,webp,svg}',
  { query: '?url', import: 'default', eager: true }
) as Record<string, string>;