export function getCarSlug(car: { name: string; slug?: string }): string {
  if (car.slug) return car.slug;
  return car.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
