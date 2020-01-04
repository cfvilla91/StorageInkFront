import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from '../../../../shared/services/users.service';
import { ScheduledSessionsService } from '../../../../shared/services/scheduled-session.service';
import { ScheduledSession } from '../../../../shared/models/scheduled-session.model';
import { forkJoin } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ScheduleSessionDialogComponent } from './schedule-session-dialog.component';
import { isNullOrUndefined } from 'util';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-schedule-session',
  templateUrl: './schedule-session.component.html',
  styleUrls: ['./schedule-session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSessionComponent implements OnInit {
  viewDate = new Date();

  events: CalendarEvent[] = [];
  userList: User[];

  constructor(
    private usersService: UsersService,
    private scheduledSessionsService: ScheduledSessionsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.scheduledSessionsService.getAll()
      .subscribe(
        scheduledSessions => {
          this.usersService.getAll().subscribe(
            users => {
              const eventsAux = [];
              this.userList = [];
              for (const u of users) {
                u['color'] = colors[Math.floor(Math.random() * colors.length)];
                this.userList.push(u);
              }

              for (const s of scheduledSessions) {
                console.log(s);
                const userIndex = this.userList.findIndex(x => x.Id === s.User.Id);
                const aux = {
                  title: s.Client.FirstName + ' ' + s.Client.LastName,
                  color: colors[0],
                  start: new Date(s.Start),
                  end: new Date(s.End),
                  meta: {
                    user: this.userList[userIndex],
                    client: s.Client,
                    scheduledSessionId: s.Id,
                    notes: s.Notes
                  },
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: true
                };
                eventsAux.push(aux);
              }
              this.events = [...eventsAux];
              console.log(this.events);
            }
          );
        }
      );
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  userChanged({ event, newUser }) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
  }

  saveChanges() {
    const arrayOfCalls = [];
    for (const event of this.events) {
      if (event.cssClass !== 'hide') {
        const scheduledSessionAux: ScheduledSession = {
          Id: event.meta.scheduledSessionId,
          Client: event.meta.client,
          User: event.meta.user,
          Start: event.start.toJSON(),
          End: event.end.toJSON(),
          Notes: 'event.meta.notes'
        };
        if (scheduledSessionAux.Id === 0) {
          arrayOfCalls.push(this.scheduledSessionsService.addScheduledSession(scheduledSessionAux));
        } else {
          arrayOfCalls.push(this.scheduledSessionsService.updateScheduledSession(scheduledSessionAux));
        }
      }
    }
    forkJoin(arrayOfCalls).subscribe(
      data => this.snackBar.open('Guardado exitosamente.')
    );
  }

  addEvent() {
    const dialogRef = this.dialog.open(
      ScheduleSessionDialogComponent,
      {
        width: '800px',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(
      newEvent => {
        if (!isNullOrUndefined(newEvent)) {
          this.snackBar.open('Evento agregado correctamente.');
          console.log(newEvent);
          const userIndex = this.userList.findIndex(x => x.Id === newEvent.User.Id);
          const aux = {
            title: newEvent.Client.FirstName + ' ' + newEvent.Client.LastName,
            color: colors[0],
            start: startOfDay(this.viewDate),
            end: addHours(startOfDay(this.viewDate), 1),
            meta: {
              user: this.userList[userIndex],
              client: newEvent.Client,
              scheduledSessionId: newEvent.Id,
              notes: newEvent.Notes
            },
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          };
          this.events = [
            ...this.events,
            aux
          ];
        }
      }
    );
  }

}
