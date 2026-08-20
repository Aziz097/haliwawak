import { revalidateTag } from 'next/cache';

export function invalidateSpeciesCache() {
  revalidateTag('species');
}

export function invalidateArticlesCache() {
  revalidateTag('articles');
}

export function invalidateStaticPagesCache() {
  revalidateTag('static-pages');
}
