import { Component, OnInit } from '@angular/core';
import { APP_ITEMS } from './menu-items';
import { Store } from '@ngrx/store';
import { getLoggedUser } from '../../shared/store/selectors/logged-user.selectors';
import { User } from 'src/app/shared/models/user.model';
import { AppState } from '../../shared/store/states/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  appItems = [];
  loggedUser: User;

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false
  };

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.select(getLoggedUser).subscribe(
      loggedUser => {
        this.loggedUser = loggedUser;
        console.log(loggedUser);
        console.log(APP_ITEMS);
        switch (this.loggedUser.Profile.Id) {
          case 1:
            this.appItems = [...APP_ITEMS];
            break;
          case 2:
            this.appItems = [...APP_ITEMS];
            break;
          case 3:
            this.appItems = [
              APP_ITEMS[0],
              APP_ITEMS[1],
              APP_ITEMS[2],
              APP_ITEMS[4],
            ];
            break;
          case 4:
            this.appItems = [
              APP_ITEMS[0]
            ];
            this.router.navigate(['pages', 'schedule', 'mySchedule']);
            break;
          default:
        }
      }
    );
  }

}
