import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { NgModule } from '@angular/core';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ClienteResolverGuard } from '../guards/cliente-resolver.guard';


const routes: Routes = [
  { path: '', component: ClientesListComponent },
  {
    path: 'novo', component: ClientesFormComponent,
    resolve: {
      cliente: ClienteResolverGuard
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
