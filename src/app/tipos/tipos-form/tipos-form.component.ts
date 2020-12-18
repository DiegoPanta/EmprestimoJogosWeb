import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { TiposService } from '../tipos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipos-form',
  templateUrl: './tipos-form.component.html',
  styleUrls: ['./tipos-form.component.css']
})
export class TiposFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private tipoService: TiposService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const tipo = this.route.snapshot.data['tipo'];
    this.form = this.fb.group({
      descricao: [tipo.descricao, [Validators.required, Validators.maxLength(100)]]
    });
  }

  hasError(field: string){
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid){
      console.log('submit');

      let msgSuccess = 'Tipo criado com sucesso!';
      let msgError = 'Erro ao criar tipo, tente novamente!';

      this.tipoService.save(this.form.value).subscribe(
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
    console.log('onCancel');
  }
}
