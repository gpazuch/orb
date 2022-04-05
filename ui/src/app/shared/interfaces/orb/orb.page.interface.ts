export interface OrbPage<T> {
  limit: number;

  offset: number;

  order: string;

  total?: number;

  name?: string;

  tags?: string;

  dir?: 'desc' | 'asc';

  data: T[];

  next?: any;
}
