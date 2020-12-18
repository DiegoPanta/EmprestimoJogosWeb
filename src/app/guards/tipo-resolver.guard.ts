import { TiposService } from './../tipos/tipos.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Tipo } from '../tipos/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoResolverGuard implements Resolve<Tipo> {

  constructor(
    private tipoService: TiposService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Tipo | Observable<Tipo> | Promise<Tipo> {
    if (route.params && route.params['id']) {
      return this.tipoService.loadById(route.params['id']);
    }

    return of({
      id: null,
      descricao: null
    });
  }
}
