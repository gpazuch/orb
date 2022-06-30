import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sink } from 'src/app/services/interfaces/sink.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-sinks',
  templateUrl: './sinks.component.html',
  styleUrls: ['./sinks.component.scss']
})
export class SinksComponent implements OnInit {
  sinks$: Observable<Sink[]>;

  constructor(
    private orb: OrbService,
  ) {
    this.sinks$ = orb.getSinkListView();
  }

  ngOnInit(): void {
  }

}
