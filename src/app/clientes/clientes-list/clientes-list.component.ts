import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Cliente } from '../cliente';
import { ClienteList } from '../cliente-list';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
  preserveWhitespaces: true
})
export class ClientesListComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  clientes$: Observable<ClienteList>;
  selectedCliente: Cliente;

  constructor(
    private clienteService: ClientesService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh(){
    this.clientes$ = this.clienteService.list()
    .pipe(
      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cliente. Tente mais tarde.');
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(cliente){
    this.selectedCliente = cliente;
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse cliente?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.clienteService.delete(cliente.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover cliente. Tente mais tarde.')
      }
    );
  }

  onConfirmDelete(){
    this.clienteService.delete(this.selectedCliente.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover cliente. Tente mais tarde.');
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}
