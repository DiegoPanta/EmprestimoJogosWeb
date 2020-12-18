import { TiposService } from './../tipos.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Tipo } from '../tipo';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-tipos-list',
  templateUrl: './tipos-list.component.html',
  styleUrls: ['./tipos-list.component.scss'],
  preserveWhitespaces: true
})
export class TiposListComponent implements OnInit {

  tipos$: Tipo[];

  constructor(
    private tipoService: TiposService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh(){
    this.tipoService.list()
    .subscribe(data => {
       this.tipos$ = data.tipos

    });
    //this.tipos$ = this.tipoService.list();
  }

  handleError() {

  }
}
