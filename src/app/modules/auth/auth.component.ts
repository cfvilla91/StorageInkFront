import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../shared/animations/fadeAnimation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeAnimation]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
