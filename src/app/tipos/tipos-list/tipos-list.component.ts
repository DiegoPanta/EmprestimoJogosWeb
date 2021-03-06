import { BsModalRef } from 'ngx-bootstrap/modal';
import { TiposService } from './../tipos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { TipoList } from '../tipo-list';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from '../tipo';

@Component({
  selector: 'app-tipos-list',
  templateUrl: './tipos-list.component.html',
  styleUrls: ['./tipos-list.component.scss'],
  preserveWhitespaces: true
})
export class TiposListComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  tipos$: Observable<TipoList>;
  selectedTipo: Tipo;

  constructor(
    private tipoService: TiposService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh(){
    this.tipos$ = this.tipoService.list()
    .pipe(
      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar tipo. Tente mais tarde.');
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(tipo){
    this.selectedTipo = tipo;
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse tipo?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.tipoService.delete(tipo.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover tipo. Tente mais tarde.')
      }
    );
  }

  onConfirmDelete(){
    this.tipoService.delete(this.selectedTipo.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover tipo. Tente mais tarde.');
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}
