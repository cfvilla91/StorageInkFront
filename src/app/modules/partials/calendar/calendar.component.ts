import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { ScheduledSession } from '../../../shared/models/scheduled-session.model';
import { DatePipe } from '@angular/common';

const colors = {
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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() sessions: ScheduledSession[];

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: 'Editar',
      // label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event.end.toDateString());
        console.log(event.end.toISOString());
        console.log(event.end.toJSON());
        console.log(event.end.toLocaleDateString());
        console.log(event.end.toLocaleString());
        console.log(event.end.toLocaleTimeString());
        console.log(event.end.toString());
        console.log(event.end.toTimeString());
        console.log(event.end.toUTCString());
        this.handleEvent('Edited', event);
      }
    },
    {
      label: 'Eliminar',
      // label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: new Date('2019-06-11 16:20:30'),
    //   end: new Date('2019-06-11 22:20:30'),
    //   // start: subDays(startOfDay(new Date()), 1),
    //   // end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen = true;

  constructor(
    private datePipe: DatePipe
  ) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.events = [];
    for (const scheduledSession of changes.sessions.currentValue) {
      // const calendarEventTitle = '' + scheduledSession.Client.FirstName + ' ' + scheduledSession.Client.LastName;
      const calendarEventTitle = `${this.datePipe.transform(scheduledSession.Start, 'dd-MM-yyyy HH:mm')} -
                                  Cliente ${scheduledSession.Client.FirstName} ${scheduledSession.Client.LastName} -
                                  Encargado: ${scheduledSession.User.FirstName} ${scheduledSession.User.LastName}`;
      const calendarEvent: CalendarEvent = {
        start: new Date(scheduledSession.Start),
        end: new Date(scheduledSession.End),
        // start: subDays(startOfDay(new Date()), 1),
        // end: addDays(new Date(), 1),
        title: calendarEventTitle,
        color: colors.red,
        // actions: this.actions,
        // resizable: {
        //   beforeStart: true,
        //   afterEnd: true
        // },
        // draggable: true,
      };
      this.events = [
        ...this.events,
        calendarEvent
      ];
    }
  }

}
