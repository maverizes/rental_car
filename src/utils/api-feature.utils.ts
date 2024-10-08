type SortOrderType = 'ASC' | 'DESC';

export declare interface FilterOptionsInterface {
  table: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: SortOrderType;
  fields?: string[];
  filters?: Record<string, any>;
}

export class ApiFeature {
  #_queryString: string | null = null;
  #_filterOptions: FilterOptionsInterface;

  constructor(tableName: string) {
    this.#_filterOptions = {
      table: tableName,
      page: 1,
      limit: 10,
      sort: 'id',
      sortOrder: 'ASC',
      fields: ['*'],
      filters: {},
    };
  }

  paginate(page: number = 1, limit: number = 10) {
    this.#_filterOptions.limit = limit;
    this.#_filterOptions.page = page;

    return this;
  }
  
  setFilters(filters: Record<string, any>) {
    this.#_filterOptions.filters = filters;
    return this;
  }

  filter() {}

  limitFields(selectedFields: string[]) {
    this.#_filterOptions.fields = selectedFields;

    return this;
  }

  sort(sortField: string, sortOrder: SortOrderType = 'ASC') {
    this.#_filterOptions.sort = sortField;
    this.#_filterOptions.sortOrder = sortOrder;

    return this;
  }
  getQuery(): {
    queryString: string;
    limit: number;
    page: number;
  } {
    // Ensure that fields is an array, even if it's empty
    const selectedFields = this.#_filterOptions.fields?.length 
      ? this.#_filterOptions.fields.join(', ') 
      : '*';
  
    const offset = (this.#_filterOptions.page - 1) * this.#_filterOptions.limit;
  
    let filterQuery: string = Object.entries(this.#_filterOptions.filters).length
      ? ' WHERE '
      : '';
  
    Object.entries(this.#_filterOptions.filters).forEach((fl, i, arr) => {
      if (arr.length - 1 == i) {
        filterQuery += `${fl[0]} ${fl[1]} `;
      } else {
        filterQuery += `${fl[0]} ${fl[1]} AND `;
      }
    });
  
    this.#_queryString = `SELECT ${selectedFields} FROM ${this.#_filterOptions.table} ${filterQuery}
    ORDER BY ${this.#_filterOptions.sort} ${this.#_filterOptions.sortOrder}
    LIMIT ${this.#_filterOptions.limit} 
    OFFSET ${offset};`;
  
    return {
      queryString: this.#_queryString,
      limit: this.#_filterOptions.limit,
      page: this.#_filterOptions.page,
    };
  }
}  