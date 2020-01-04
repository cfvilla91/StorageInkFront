import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { SetLoggedUser } from '../../../shared/store/actions/logged-user.actions';
import { AppState } from 'src/app/shared/store/states/app.state';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  logeando = false;

  txtUser = '';
  txtPassword = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtHelperService: JwtHelperService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  login() {
    this.logeando = true;
    this.authService.login(this.txtUser, this.txtPassword).subscribe(
      loginData => {
        localStorage.setItem('token', loginData.access_token);
        const decodedToken = this.jwtHelperService.decodeToken(loginData.access_token);
        this.usersService.getUserById(decodedToken.sub).subscribe(
          loggedUser => {
            this.store.dispatch(new SetLoggedUser(loggedUser));
            this.logeando = false;
            this.snackBar.open('Bienvenido ' + loggedUser.FirstName + ' ' + loggedUser.LastName);
            this.router.navigate(['pages']);
          }
        );
      },
      error => {
        this.logeando = false;
        this.snackBar.open('Usuario o contraseña incorrecto.');
      }
    );
  }

}


