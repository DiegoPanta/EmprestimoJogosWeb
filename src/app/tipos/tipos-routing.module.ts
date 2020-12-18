import { TipoResolverGuard } from './../guards/tipo-resolver.guard';
import { TiposFormComponent } from './tipos-form/tipos-form.component';
import { TiposListComponent } from './tipos-list/tipos-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: TiposListComponent },
  {
    path: 'novo', component: TiposFormComponent,
    resolve: {
      tipo: TipoResolverGuard
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiposRoutingModule { }
