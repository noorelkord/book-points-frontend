export type PaginationMeta = { current_page:number; per_page:number; total:number; last_page:number };
export type PaginationLinks = { first:string; last:string; prev:string|null; next:string|null };
export type Paginated<T> = { data:T[]; links:PaginationLinks; meta:PaginationMeta };


