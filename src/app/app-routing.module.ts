import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: 'src/app/modules/pages/pages.module#PagesModule',
    // canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    loadChildren: 'src/app/modules/auth/auth.module#AuthModule',
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
