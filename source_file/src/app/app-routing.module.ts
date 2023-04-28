import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_ROUTES } from './routing/login-routing';
import { LoginLayoutComponent } from './Layout/login-layout/login-layout.component';
import { AdminLayoutComponent } from './Layout/admin-layout/admin-layout.component';
import { ADMIN_ROUTES } from './routing/admin-routing';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',component:LoginLayoutComponent,children:LOGIN_ROUTES},
  {path:'admin',component:AdminLayoutComponent,children:ADMIN_ROUTES,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
