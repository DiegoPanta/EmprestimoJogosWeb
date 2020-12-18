import { ClientesService } from './../clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss']
})
export class ClientesFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const cliente = this.route.snapshot.data['cliente'];
    this.form = this.fb.group({
      nome: [cliente.nome, [Validators.required, Validators.maxLength(100)]],
      codigo: [cliente.codigo, [Validators.required, Validators.maxLength(5)]],
      telefone: [cliente.telefone, [Validators.required, Validators.maxLength(15)]]
    });
  }

  hasError(field: string){
    return this.form.get(field).errors;
  }

  onSubmit(){
    this.submitted = true;

    if(this.form.valid){
      let msgSuccess = 'Cliente criado com sucesso!';
      let msgError = 'Erro ao criar cliente, tente novamente!';

      this.clienteService.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger(msgError)
        }
      );
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  }
}
