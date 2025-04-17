import { Component } from '@angular/core';
import { DialogFormComponent } from '../../../shared/dialog-form/dialog-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CursoService } from '../../../core/services/curso.service';
import { Curso } from '../../../core/types/Curso';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-criar-curso',
  imports: [DialogFormComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-curso.component.html',
  styleUrl: './criar-curso.component.css'
})
export class CriarCursoComponent {

  curso: Curso = {
    id: 0,
    areaTecnologica: '',
    titulo: '',
    modalidade: '',
    imagemUrl: ''
  }

  form: FormGroup = new FormGroup({
    areaTecnologica: new FormControl("", [Validators.minLength(5)]),
    titulo: new FormControl("", [Validators.minLength(5)]),
    modalidade: new FormControl("PRESENCIAL"),
  });

  constructor(
    private service: CursoService,
    private toast: ToastrService,
    public dialog: MatDialogRef<CriarCursoComponent>,
  ) { }

  salvarCurso() {
    if (this.form.invalid) {
      this.toast.info('E necessario preencher todos os campos corretamente', 'INFO')
      return;
    }

    this.curso.areaTecnologica = this.form.get('areaTecnologica')?.value;
    this.curso.titulo = this.form.get('titulo')?.value;
    this.curso.modalidade = this.form.get('modalidade')?.value;
    this.service.criarCurso(this.curso).subscribe({
      next: (value) => {
        console.log(value)
        this.toast.success('Sucesso ao criar curso', 'Sucesso');
        this.dialog.close("Criado");
      },
      error: (err) => {
        console.log(err)
        this.toast.error(`Erro ao criar curso: ${err.error.error}`, 'Erro');
      }
    })
  }

}
