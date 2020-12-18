import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente';
import { ClienteList } from './cliente-list';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = `${environment.API}clientes`

  constructor(
    private http: HttpClient
  ) { }

  list()
  {
    return this.http.get<ClienteList>(this.API);
  }

  loadById(id){
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1));
  }

  save(cliente){
    if(cliente.id){
      return this.update(cliente);
    }
    
    return this.insert(cliente);
  }

  private insert(cliente){
    return this.http.post(this.API, cliente).pipe(take(1));
  }

  private update(cliente){
    return this.http.put(`${this.API}/${cliente.id}`, cliente).pipe(take(1));
  }

  delete(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
