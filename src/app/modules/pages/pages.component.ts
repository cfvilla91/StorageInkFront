import { Component, OnInit } from '@angular/core';
import { APP_ITEMS } from './menu-items';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  appItems = APP_ITEMS;

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false
  };

  constructor() { }

  ngOnInit() {
  }

}
