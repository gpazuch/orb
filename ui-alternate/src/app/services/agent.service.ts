import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, EMPTY, expand, map, Observable, of, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agent } from './interfaces/agent.interface';
import { OrbPagination } from './interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(
    private http: HttpClient,
  ) { }

  addAgent(agent: Agent) {
    return this.http.post(environment.agents, agent);
  }

  getAgentById(id: string) {
    return this.http.get(`${environment.agents}/${id}`);
  }

  getAllAgents() {
    let page = {order: 'name', dir: 'asc', limit: 100, offset: 0} as OrbPagination<Agent>;

    return this.getAgentPage(page)
      .pipe(
        expand(page => {
          return page.next ? this.getAgentPage(page.next) : EMPTY;
        }),
        delay(100),
        reduce((acc, value) => {
          acc.data = [...acc?.data || [], ...value?.data || []];
          acc.offset = 0;
          acc.total = acc.data.length;
          return acc;
        }, page),
        map(resp => {
          return resp.data;
        }),
      );
  }

  getAgentPage(page: OrbPagination<Agent>) {
    const {order, dir, offset, limit} = page;

    let params = new HttpParams()
      .set('order', order)
      .set('dir', dir)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get(`${environment.agents}`, {params})
    .pipe(map((resp: any) => {
      const {order, dir, offset, limit, total, agents} = resp;
      const next = offset + limit < total && {
        limit, order, dir,
        offset: (parseInt(offset, 10) + parseInt(limit, 10)).toString(),
      }
      return {order, dir, offset, limit, total, data: agents, next} as OrbPagination<Agent>;
    }));
  }

  updateAgent(agent: Agent) {
    const { id } = agent;
    return this.http.put(`${environment.agents}/${id}`, agent);
  }

  deleteAgent(id: string) {
    return this.http.delete(`${environment.agents}/${id}`);
  }

  getMatchingAgents(tags: any) {

  }

  resetAgent(id: string) {
    return this.http.post(`${environment.agents}/${id}/rpc/reset`, {});
  }

  validateAgent(agent: Agent) {
    return this.http.post(environment.agentValidate,
      {...agent, validate_only: true});
  }
}
