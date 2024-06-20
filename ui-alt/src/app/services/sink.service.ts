import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, EMPTY, expand, map, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrbPagination } from './interfaces/pagination.interface';
import { Sink } from './interfaces/sink.interface';

@Injectable({
  providedIn: 'root'
})
export class SinkService {

  constructor(
    private http: HttpClient,
  ) { }

  addSink(sink: Sink) {
    return this.http.post(environment.sinks, sink);
  }

  updateSink(sink: Sink) {
    const { id } = sink;
    return this.http.put(`${environment.sinks}/${id}`, sink);
  }

  getSinkById(id: string) {
    return this.http.get(`${environment.sinks}/${id}`);
  }

  getAllSinks() {
    let page = {order: 'name', dir: 'asc', limit: 100, offset: 0} as OrbPagination<Sink>;

    return this.getSinkPage(page)
      .pipe(
        expand(page => {
          return page.next ? this.getSinkPage(page.next) : EMPTY;
        }),
        delay(100),
        reduce((acc, value) => {
          acc.data = [...acc?.data || [], ...value?.data || []];
          acc.offset = 0;
          acc.total = acc.data.length;
          return acc;
        }, page),
        map(page => page.data),
      );
  }

  getSinkPage(page: OrbPagination<Sink>) {
    const {order, dir, offset, limit} = page;

    let params = new HttpParams()
      .set('order', order)
      .set('dir', dir)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get(`${environment.sinks}`, {params})
    .pipe(map((resp: any) => {
      const {order, dir, offset, limit, total, sinks} = resp;
      const next = offset + limit < total && {
        limit, order, dir,
        offset: (parseInt(offset, 10) + parseInt(limit, 10)).toString(),
      }
      return {order, dir, offset, limit, total, data: sinks, next} as OrbPagination<Sink>;
    }));
  }

  deleteSink(id: string) {
    return this.http.delete(`${environment.sinks}/${id}`);
  }

  getSinkBackends() {
    return this.http.get(environment.sinkBackends);
  }
}
