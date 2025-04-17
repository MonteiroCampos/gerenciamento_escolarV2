import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Curso } from '../../core/types/Curso';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CursoService } from '../../core/services/curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartao-curso',
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './cartao-curso.component.html',
  styleUrl: './cartao-curso.component.css'
})
export class CartaoCursoComponent {

  @Input() curso!: Curso;
  @Output() cursoDeletado = new EventEmitter<any>();

  constructor(private service: CursoService, private toast: ToastrService) {
  }

  deletarCurso() {
    this.service.deletarCursos(this.curso.id).subscribe({
      next: () => {
        this.toast.success('Curso deletado com sucesso', 'SUCESSO')
        this.cursoDeletado.emit();
      },
      error: () => {
        this.toast.error('Erro ao deletar curso', 'ERRO')
      }
    })
  }

  salvarImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const form = new FormData();
      form.append("file", file);
      this.service.salvarImagem(this.curso.id, form).subscribe({
        next: (value) => {
          this.toast.success("imagem salva com sucesso", "SUCESSO");
        },
        error: (err) => {
          this.toast.error(`Erro ao salvar imagem: ${err.error.error}`, 'ERRO');
        }
      })
    }
  }
}

