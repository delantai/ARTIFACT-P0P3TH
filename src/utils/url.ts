export const getUrl = (
  base: string,
  searchParams?: Record<string, boolean | string | number | string[] | number[]>,
) => {
  const url = new URL(base);
  Object.entries(searchParams ?? []).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });
  return url;
};
