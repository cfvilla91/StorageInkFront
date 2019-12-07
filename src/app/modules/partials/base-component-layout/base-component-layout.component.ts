import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-component-layout',
  templateUrl: './base-component-layout.component.html',
  styleUrls: ['./base-component-layout.component.scss']
})
export class BaseComponentLayoutComponent implements OnInit {

  @Output() btnAddOnClick: EventEmitter<any> = new EventEmitter();
  @Output() btnSaveOnClick: EventEmitter<any> = new EventEmitter();
  @Input() title = '';
  @Input() icon = '';

  showBtnAdd = false;
  showBtnSave = false;

  constructor() { }

  ngOnInit() {
    this.showBtnSave = this.btnSaveOnClick.observers.length > 0;
    this.showBtnAdd = this.btnAddOnClick.observers.length > 0;
  }

  btnAddClicked() {
    this.btnAddOnClick.emit();
  }

  btnSaveClicked() {
    this.btnSaveOnClick.emit();
  }

}
