import { Component, EventEmitter, Injectable, Output, ChangeDetectionStrategy } from '@angular/core';
import { CalendarUtils, CalendarWeekViewComponent } from 'angular-calendar';
import { WeekView, GetWeekViewArgs, WeekViewTimeEvent } from 'calendar-utils';
import { DragEndEvent, DragMoveEvent } from 'angular-draggable-droppable';
import { startOfDay, addHours, addMinutes } from 'date-fns';

const EVENT_WIDTH = 150;

interface DayViewScheduler extends WeekView {
  users: any[];
}

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  getWeekView(args: GetWeekViewArgs): DayViewScheduler {
    const view: DayViewScheduler = {
      ...super.getWeekView(args),
      users: []
    };
    // const aux = [];
    // for (let i = 0; i < 10; i++) {
    //   const start = addHours(startOfDay(new Date()), i + 9);
    //   const end = addMinutes(start, 60);
    //   const hourToPush = {
    //     segments: [
    //       {
    //         date: start,
    //         displayDate: start,
    //         isStart: true
    //       },
    //       {
    //         date: end,
    //         displayDate: end,
    //         isStart: false
    //       }
    //     ]
    //   };
    //   aux.push(hourToPush);
    // }
    // view.hourColumns[0].hours = aux;
    view.hourColumns[0].events.forEach(({ event }) => {
      // assumes user objects are the same references,
      // if 2 users have the same structure but different object references this will fail
      if (!view.users.includes(event.meta.user)) {
        view.users.push(event.meta.user);
      }
    });
    // sort the users by their names
    view.users.sort((user1, user2) => user1.FirstName.localeCompare(user2.FirstName));
    view.hourColumns[0].events = view.hourColumns[0].events.map(
      dayViewEvent => {
        const index = view.users.indexOf(dayViewEvent.event.meta.user);
        dayViewEvent.left = index * EVENT_WIDTH; // change the column of the event
        dayViewEvent.width = EVENT_WIDTH;
        return dayViewEvent;
      }
    );
    return view;
  }
}

@Component({
  // tslint:disable-line max-classes-per-file
  selector: 'app-day-view-scheduler',
  styleUrls: ['day-view-scheduler.component.scss'],
  providers: [
    {
      provide: CalendarUtils,
      useClass: DayViewSchedulerCalendarUtils
    }
  ],
  templateUrl: 'day-view-scheduler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayViewSchedulerComponent extends CalendarWeekViewComponent {
  @Output() userChanged = new EventEmitter();

  view: DayViewScheduler;

  daysInWeek = 1;

  eventWidth = EVENT_WIDTH;

  private originalLeft: number;

  test() {
    // const aux = [];
    // for (let i = 0; i < 10; i++) {
    //   const start = addHours(startOfDay(new Date()), i + 5);
    //   const end = addMinutes(start, 60);
    //   const hourToPush = {
    //     segments: [
    //       {
    //         date: start,
    //         displayDate: start,
    //         isStart: true
    //       },
    //       {
    //         date: end,
    //         displayDate: end,
    //         isStart: false
    //       }
    //     ]
    //   };
    //   aux.push(hourToPush);
    // }
    // console.log(aux);
    // console.log(this.view);
    // this.view.hourColumns[0].hours = aux;
  }

  dragStarted(
    eventsContainer: HTMLElement,
    event: HTMLElement,
    dayEvent?: WeekViewTimeEvent
  ) {
    this.originalLeft = dayEvent.left;
    super.dragStarted(eventsContainer, event, dayEvent);
  }

  dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
    const originalX = dragEvent.x;
    dragEvent.x = 0;
    super.dragMove(dayEvent, dragEvent);
    const newUserColumn = this.getDraggedUserColumn(dayEvent, originalX);
    this.view.hourColumns[0].events.forEach(iDayEvent => {
      if (iDayEvent.event === dayEvent.event) {
        iDayEvent.left = newUserColumn
          ? this.originalLeft + originalX
          : (this.view.users.length - 1) * EVENT_WIDTH;
      }
    });
  }

  dragEnded(
    weekEvent: WeekViewTimeEvent,
    dragEndEvent: DragEndEvent,
    dayWidth: number,
    useY = false
  ) {
    super.dragEnded(weekEvent, dragEndEvent, dayWidth, useY);
    const newUser = this.getDraggedUserColumn(weekEvent, dragEndEvent.x);
    if (newUser && newUser !== weekEvent.event.meta.user) {
      this.userChanged.emit({ event: weekEvent.event, newUser });
    }
  }

  private getDraggedUserColumn(dayEvent: WeekViewTimeEvent, xPixels: number) {
    const columnsMoved = xPixels / EVENT_WIDTH;
    const currentColumnIndex = this.view.users.findIndex(
      user => user === dayEvent.event.meta.user
    );
    const newIndex = currentColumnIndex + columnsMoved;
    return this.view.users[newIndex];
  }
}
