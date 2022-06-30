import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dataset } from 'src/app/services/interfaces/dataset.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
  datasets$: Observable<Dataset[]>;

  constructor(
    private orb: OrbService,
  ) {
    this.datasets$ = this.orb.getDatasetListView();
  }

  ngOnInit(): void {
  }

}
