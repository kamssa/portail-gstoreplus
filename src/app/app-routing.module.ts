import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PortailComponent } from 'src/app/Pages/portail/portail.component';

const routes: Routes = [
  { path: '',redirectTo: 'portail',pathMatch: 'full'},
  { path: 'portail',component: PortailComponent},
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:() => import('src/app/layouts/auth-layout/auth-layout.module').then (m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:() => import('src/app/layouts/admin-layout/admin-layout.module').then (m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'portail'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
