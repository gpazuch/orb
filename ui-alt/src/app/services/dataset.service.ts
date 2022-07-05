import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, EMPTY, expand, map, Observable, of, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dataset } from './interfaces/dataset.interface';
import { OrbPagination } from './interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  constructor(private http: HttpClient) {}

  addDataset(dataset: Dataset) {
    return this.http.post(environment.datasets, dataset);
  }

  updateDataset(dataset: Dataset) {
    const { id } = dataset;
    return this.http.put(`${environment.datasets}/${id}`, dataset);
  }

  getDatasetById(id: string) {
    return this.http.get(`${environment.datasets}/${id}`);
  }

  getAllDatasets() {
    let page = {
      order: 'name',
      dir: 'asc',
      limit: 100,
      offset: 0,
    } as OrbPagination<Dataset>;

    return this.getDatasetPage(page).pipe(
      expand((page) => {
        return page.next ? this.getDatasetPage(page.next) : EMPTY;
      }),
      delay(100),
      reduce((acc, value) => {
        acc.data = [...(acc?.data || []), ...(value?.data || [])];
        acc.offset = 0;
        acc.total = acc.data.length;
        return acc;
      }, page),
      map((page) => page.data)
    );
  }

  getDatasetPage(page: OrbPagination<Dataset>) {
    const { order, dir, offset, limit } = page;

    let params = new HttpParams()
      .set('order', order)
      .set('dir', dir)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get(`${environment.datasets}`, { params }).pipe(
      map((resp: any) => {
        const { order, dir, offset, limit, total, datasets } = resp;
        const next = offset + limit < total && {
          limit,
          order,
          dir,
          offset: (parseInt(offset, 10) + parseInt(limit, 10)).toString(),
        };
        return {
          order,
          dir,
          offset,
          limit,
          total,
          data: datasets,
          next,
        } as OrbPagination<Dataset>;
      })
    );
  }

  deleteDataset(id: string) {
    return this.http.delete(`${environment.datasets}/${id}`);
  }
}
