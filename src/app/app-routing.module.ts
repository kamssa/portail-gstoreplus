import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout/layout.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portail',
    pathMatch: 'full',
  },
  {
    path: 'portail',
    component: MainPageComponent,
    children:[
      {
        path:'portail',
        loadChildren: () => import('./main-page/main.module').then(m => m.MainModule)
      },
      
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: './layout/layout/layout.module#LayoutModule'
    }, 
    ]
  },
];

@NgModule({
  imports: [CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
