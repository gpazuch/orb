import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import 'rxjs/add/observable/empty';

import { AgentGroup } from 'app/common/interfaces/orb/agent.group.interface';
import {
  NgxDatabalePageInfo,
  OrbPagination,
} from 'app/common/interfaces/orb/pagination.interface';
import { NotificationsService } from 'app/common/services/notifications/notifications.service';
import { environment } from 'environments/environment';
import {
  catchError,
  delay,
  expand,
  map, scan,
  takeWhile,
} from 'rxjs/operators';
@Injectable()
export class AgentGroupsService {
  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  addAgentGroup(agentGroupItem: AgentGroup) {
    return this.http
      .post(
        environment.agentGroupsUrl,
        {
          ...agentGroupItem,
          validate_only: false,
        },
        { observe: 'response' },
      )
      .map((resp) => {
        return resp;
      })
      .catch((err) => {
        this.notificationsService.error(
          'Failed to create Agent Group',
          `Error: ${err.status} - ${err.statusText} - ${err.error.error}`,
        );
        return Observable.throwError(err);
      });
  }

  validateAgentGroup(agentGroupItem: AgentGroup) {
    return this.http
      .post(
        environment.validateAgentGroupsUrl,
        {
          ...agentGroupItem,
          validate_only: true,
        },
        { observe: 'response' },
      )
      .map((resp) => {
        return resp;
      })
      .catch((err) => {
        this.notificationsService.error(
          'Failed to Validate Agent Group',
          `Error: ${err.status} - ${err.statusText} - ${err.error.error}`,
        );
        return Observable.throwError(err);
      });
  }

  getAgentGroupById(id: string): Observable<AgentGroup> {
    return this.http.get(`${environment.agentGroupsUrl}/${id}`).pipe(
      catchError((err) => {
        this.notificationsService.error(
          'Failed to fetch Agent Group',
          `Error: ${err.status} - ${err.statusText}`,
        );
        err['id'] = id;
        return of(err);
      }),
    );
  }

  getAllAgentGroups() {
    let page = {
      order: 'name',
      dir: 'asc',
      limit: 100,
      data: [],
      offset: 0,
    } as OrbPagination<AgentGroup>;

    return this.getAgentGroups(page).pipe(
      expand((data) => {
        return data.next ? this.getAgentGroups(data.next) : Observable.empty();
      }),
      takeWhile((data) => data.next !== undefined),
      map((page) => page.data),
      scan((acc, v) => [...acc, ...v]),
    );
  }

  getAgentGroups(page: OrbPagination<AgentGroup>) {
    const { order, dir, offset, limit } = page;

    let params = new HttpParams()
      .set('order', order)
      .set('dir', dir)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http
      .get(environment.agentGroupsUrl, { params })
      .map((resp: any) => {
        const { order, direction: dir, offset, limit, total, agentGroups: data } = resp;
        const next = offset + limit < total && {
          limit,
          order,
          dir,
          offset: (parseInt(offset, 10) + parseInt(limit, 10)).toString(),
        }

        return {
          order,
          dir,
          offset,
          limit,
          total,
          data,
          next,
        } as OrbPagination<AgentGroup>;
      })
      .catch((err) => {
        this.notificationsService.error(
          'Failed to get Agent Groups',
          `Error: ${err.status} - ${err.statusText}`,
        );
        return Observable.throwError(err);
      });
  }

  editAgentGroup(agentGroup: AgentGroup): any {
    return this.http
      .put(`${environment.agentGroupsUrl}/${agentGroup.id}`, agentGroup)
      .map((resp) => {
        return resp;
      })
      .catch((err) => {
        this.notificationsService.error(
          'Failed to edit Agent Group',
          `Error: ${err.status} - ${err.statusText}`,
        );
        return Observable.throwError(err);
      });
  }

  deleteAgentGroup(agentGroupId: string) {
    return this.http
      .delete(`${environment.agentGroupsUrl}/${agentGroupId}`)
      .catch((err) => {
        this.notificationsService.error(
          'Failed to Delete Agent Group',
          `Error: ${err.status} - ${err.statusText}`,
        );
        return Observable.throwError(err);
      });
  }
}
