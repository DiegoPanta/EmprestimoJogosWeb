import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo } from './tipo';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private readonly API = `${environment.API}tipos`;

  constructor(
    private http: HttpClient
  ) { }

  list()
  {
    return this.http.get<any>(this.API);
  }

  loadById(id){
    return this.http.get<Tipo>(`${this.API}/${id}`).pipe(take(1));
  }
}
