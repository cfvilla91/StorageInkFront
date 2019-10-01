import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeAnimation } from '../../../../shared/animations/fadeAnimation';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  animations: [fadeAnimation]
})
export class BaseLayoutComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => this.drawer.close());
  }

  click_logout() {
  }

}
