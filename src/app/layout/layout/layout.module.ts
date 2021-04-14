import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './layout.routing';
import {LayoutComponent} from './layout.component';
import {ComponentsModule} from '../../components/components.module';
import {MaterialModule} from '../../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        MaterialModule
    ],
  declarations: [
    LayoutComponent,


  ]
})

export class LayoutModule {}
