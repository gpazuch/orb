export interface OrbPagination<T> {
  limit: number;

  offset: number;

  order: string;

  dir: 'desc' | 'asc';

  data: T[];

  next?: any;

  total?: number;

  name?: string;

  tags?: string;

  filters?: any;
}
