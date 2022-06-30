import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, EMPTY, expand, map, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrbPagination } from './interfaces/pagination.interface';
import { AgentPolicy } from './interfaces/policy.interface';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    private http: HttpClient,
  ) { }

  addPolicy(policy: AgentPolicy) {
    return this.http.post(environment.policies, policy);
  }

  updatePolicy(policy: AgentPolicy) {
    const { id } = policy;
    return this.http.put(`${environment.policies}/${id}`, policy);
  }

  getPolicyById(id: string) {
    return this.http.get(`${environment.policies}/${id}`);
  }

  getAllPolicies() {
    let page = {order: 'name', dir: 'asc', limit: 100, offset: 0} as OrbPagination<AgentPolicy>;

    return this.getPolicyPage(page)
      .pipe(
        expand(page => {
          return page.next ? this.getPolicyPage(page.next) : EMPTY;
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

  getPolicyPage(page: any) {
    const {order, dir, offset, limit} = page;

    let params = new HttpParams()
      .set('order', order)
      .set('dir', dir)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get(`${environment.policies}`, {params})
    .pipe(map((resp: any) => {
      const {order, dir, offset, limit, total, data} = resp;
      const next = offset + limit < total && {
        limit, order, dir,
        offset: (parseInt(offset, 10) + parseInt(limit, 10)).toString(),
      }
      return {order, dir, offset, limit, total, data, next} as OrbPagination<AgentPolicy>;
    }));
  }

  deletePolicy(id: string) {
    return this.http.delete(`${environment.policies}/${id}`);
  }

  duplicatePolicy(id: string) {
    return this.http.post(`${environment.policies}/${id}/duplicate`, {});
  }

  getAvailableBackends() {
    return this.http.get(environment.agentBackends);
  }

  getBackendConfig(route: string[]) {
    const final = route.join('/');
    return this.http.get(`${environment.agentBackends}/${final}`);
  }
}
