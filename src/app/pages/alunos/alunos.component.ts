import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { AlunoService } from '../../core/services/aluno.service';
import { Aluno } from '../../core/types/Aluno';
import { AlunoForm } from '../../core/types/AlunoForm';
import { CartaoAlunoComponent } from "../../shared/cartao-aluno/cartao-aluno.component";

@Component({
  selector: 'app-alunos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CartaoAlunoComponent
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent implements OnInit {

  alunos: Aluno[] = [];
  
  constructor(private dialog: MatDialog, private service: AlunoService) { }
  ngOnInit(): void {
    this.buscarAlunos();
  }

  abrirDialogoCriarAluno() {
    this.dialog.open(CriarAlunoComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "Criado") {
          this.buscarAlunos();
        }
      }
    })
  }

  buscarAlunos() {
    this.service.buscarAlunos().subscribe({
      next: (value) => {
        this.alunos = value.content;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}

