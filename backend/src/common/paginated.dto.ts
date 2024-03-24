export class PaginatedQueryDto {
  page: number = 1;
  take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

interface Metadata {
  page: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}

export class PaginatedResponseDto<V> {
  data: V[];
  _metadata: Metadata;

  constructor(data: V[], _metadata?: Omit<Metadata, "pageCount">) {
    this.data = data;
    this._metadata = _metadata
      ? {
          ..._metadata,
          pageCount: Math.ceil(_metadata.totalCount / _metadata.pageSize),
        }
      : {
          page: 1,
          pageSize: this.data.length,
          pageCount: 1,
          totalCount: this.data.length,
        };
  }
}
