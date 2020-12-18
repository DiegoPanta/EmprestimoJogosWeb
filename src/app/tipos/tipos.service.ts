import { TipoList } from './tipo-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tipo } from './tipo';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private readonly API = `${environment.API}tipos`
  constructor(
    private http: HttpClient
  ) { }

  list()
  {
    return this.http.get<TipoList>(this.API);
  }

  loadById(id){
    return this.http.get<Tipo>(`${this.API}/${id}`).pipe(take(1));
  }

  private insert(tipo){
    return this.http.post(this.API, tipo).pipe(take(1));
  }

  save(tipo){
      return this.insert(tipo);
  }

  delete(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
