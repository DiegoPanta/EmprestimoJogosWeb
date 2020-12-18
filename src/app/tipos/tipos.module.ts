import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposListComponent } from './tipos-list/tipos-list.component';
import { TiposRoutingModule } from './tipos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TiposListComponent],
  imports: [
    CommonModule,
    TiposRoutingModule,
    ReactiveFormsModule
  ]
})
export class TiposModule { }
