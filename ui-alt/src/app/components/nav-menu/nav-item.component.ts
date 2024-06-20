import { Component, Input, OnInit } from '@angular/core';

export interface NavMenuItem {
  title?: string;
  icon?: string;
  link?: string;
  home?: boolean;
  children?: NavMenuItem[];
}

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements OnInit {
  @Input()
  item: NavMenuItem;

  constructor() {
    this.item = {};
  }

  ngOnInit(): void {}
}
