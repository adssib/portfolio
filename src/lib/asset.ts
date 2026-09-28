// Files in /public are served under the Pages base path (/portfolio) in the
// static build, so local asset URLs need the prefix. External URLs pass through.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${base}${path}` : path;
}
