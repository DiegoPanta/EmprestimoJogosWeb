import { TiposRoutingModule } from './tipos-routing.module';
import { TiposListComponent } from './tipos-list/tipos-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TiposFormComponent } from './tipos-form/tipos-form.component';



@NgModule({
  declarations: [TiposListComponent, TiposFormComponent],
  imports: [
    CommonModule,
    TiposRoutingModule,
    ReactiveFormsModule
  ]
})
export class TiposModule { }
