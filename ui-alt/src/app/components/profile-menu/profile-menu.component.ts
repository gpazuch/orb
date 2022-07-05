import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  protected sub = '';

  constructor(private auth: AuthService) {
    this.sub = auth.getTokenUser();
  }

  ngOnInit(): void {}
}
