import { ClientesService } from './../clientes/clientes.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cliente } from '../clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolverGuard implements Resolve<Cliente> {

  constructor(
    private clienteService: ClientesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Cliente | Observable<Cliente> | Promise<Cliente>{
    if(route.params && route.params['id']){
      return this.clienteService.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      codigo: null,
      telefone: null
    });
  }
}
