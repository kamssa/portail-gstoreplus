import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcceuilComponent } from "./acceuil/acceuil.component";
import { MainPageComponent } from "./main-page.component";

const routes: Routes = [
    {
      path: '',
      component: MainPageComponent,
      data: {
        title: 'portail'
      }
    },
    {
        path: 'portail',
        component: AcceuilComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainRoutingModule {}
  