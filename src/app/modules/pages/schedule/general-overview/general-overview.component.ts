import { Component, OnInit } from '@angular/core';
import { ScheduledSessionsService } from '../../../../shared/services/scheduled-session.service';
import { ScheduledSession } from '../../../../shared/models/scheduled-session.model';

@Component({
  selector: 'app-general-overview',
  templateUrl: './general-overview.component.html',
  styles: []
})
export class GeneralOverviewComponent implements OnInit {

  scheduledSessionList: ScheduledSession[] = [];

  constructor(
    private scheduledSessionsService: ScheduledSessionsService
  ) { }

  ngOnInit() {
    this.scheduledSessionsService.getAll()
      .subscribe(scheduledSessions => this.scheduledSessionList = scheduledSessions);
  }

}
