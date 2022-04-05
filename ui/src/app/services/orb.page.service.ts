import { Injectable } from '@angular/core';
import { OrbPage } from '../shared/interfaces/orb/orb.page.interface';
import { OrbEntity } from '../shared/interfaces/orb/orb.entity.interface';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrbPageService<T extends OrbEntity> {

  const defLimit: number = 10;

  const defOrder: string = 'name';

  const defDir = 'desc';

  paginationCache: any = {};

  cache: OrbPage<T>;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }
}
