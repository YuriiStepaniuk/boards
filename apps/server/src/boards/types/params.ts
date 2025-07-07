export interface FindAllParams {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  createdBefore?: Date;
  createdAfter?: Date;
}
