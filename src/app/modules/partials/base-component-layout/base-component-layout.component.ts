import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-base-component-layout',
  templateUrl: './base-component-layout.component.html',
  styleUrls: ['./base-component-layout.component.scss']
})
export class BaseComponentLayoutComponent implements OnInit {

  @Input() title = '';

  constructor() { }

  ngOnInit() {
  }

}
