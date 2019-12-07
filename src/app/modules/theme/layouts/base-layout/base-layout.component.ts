import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeAnimation } from '../../../../shared/animations/fadeAnimation';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/states/app.state';
import { UnsetLoggedUser } from '../../../../shared/store/actions/logged-user.actions';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  animations: [fadeAnimation]
})
export class BaseLayoutComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => this.drawer.close());
  }

  click_logout() {
    // this.store.dispatch(new UnsetLoggedUser());
    this.router.navigate(['']);
  }

}
