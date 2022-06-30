import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentGroup } from 'src/app/services/interfaces/group.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups$: Observable<AgentGroup[]>;

  constructor(
    private orb: OrbService,
  ) {
    this.groups$ = orb.getGroupListView();
  }

  ngOnInit(): void {
  }

}
