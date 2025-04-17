import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from '../../core/types/Aluno';
import { AlunoService } from '../../core/services/aluno.service';

@Component({
  selector: 'app-cartao-aluno',
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './cartao-aluno.component.html',
  styleUrl: './cartao-aluno.component.css'
})
export class CartaoAlunoComponent {

  @Input() aluno!: Aluno;
  @Output() alunoDeletado = new EventEmitter<any>();

  constructor(private service: AlunoService, private toast: ToastrService) {
  }

  deletarAluno() {
    this.service.deletarAlunos(this.aluno.id).subscribe({
      next: () => {
        this.toast.success('Aluno deletado com sucesso', 'SUCESSO')
        this.alunoDeletado.emit();
      },
      error: () => {
        this.toast.error('Erro ao deletar aluno', 'ERRO')
      }
    })
  }

  salvarImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const form = new FormData();
      form.append("file", file);
      this.service.salvarImagem(this.aluno.id, form).subscribe({
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

