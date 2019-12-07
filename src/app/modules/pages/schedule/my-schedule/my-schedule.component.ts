import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/store/states/app.state';
import { getLoggedUser } from '../../../../shared/store/selectors/logged-user.selectors';
import { User } from 'src/app/shared/models/user.model';
import { ScheduledSession } from '../../../../shared/models/scheduled-session.model';
import { ScheduledSessionsService } from '../../../../shared/services/scheduled-session.service';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styles: []
})
export class MyScheduleComponent implements OnInit {

  loggedUser: User;

  scheduledSessionList: ScheduledSession[] = [];

  constructor(
    private store: Store<AppState>,
    private scheduledSessionsService: ScheduledSessionsService
  ) { }

  ngOnInit() {
    this.store.select(getLoggedUser).subscribe(loggedUser => this.loggedUser = loggedUser);
    this.scheduledSessionsService.getScheduledSessionsByUserId(this.loggedUser.Id)
      .subscribe(scheduledSessions => this.scheduledSessionList = scheduledSessions);
  }

}
