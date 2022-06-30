import { Component, OnInit } from '@angular/core';
import {NavMenuItem} from "../components/nav-menu/nav-item.component";
import {NAV_MENU_ITEMS} from "./menu.items";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  items: NavMenuItem[];

  constructor() {
    this.items = NAV_MENU_ITEMS;
  }

  ngOnInit(): void {
  }

}
