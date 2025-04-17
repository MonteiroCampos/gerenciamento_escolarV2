import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../core/services/curso.service';
import { AlunoService } from '../../core/services/aluno.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Curso } from '../../core/types/Curso';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  areasTecnologicas: string[] = [];
  areaFiltro: string = '';
  totalAlunos: number = 0;
  mediaAlunosPorCurso: number = 0;

  constructor(
    private cursoService: CursoService,
    private alunoService: AlunoService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.buscarAlunos();
    this.carregarCursos();
    this.buscarCursos();
  }


  buscarAlunos() {
    this.alunoService.buscarAlunos().subscribe({
      next: (response: any) => {
        this.totalAlunos = response.content?.length || 0;
        this.calcularMediaAlunosPorCurso();
      },
      error: (err) => {
        console.error(`Erro ao buscar alunos: ${err.error?.error || 'Erro desconhecido'}`);
      }
    });
  }

  calcularMediaAlunosPorCurso() {
    if (this.cursos.length > 0 && this.totalAlunos > 0) {
      this.mediaAlunosPorCurso = Math.round(this.totalAlunos / this.cursos.length);
    } else {
      this.mediaAlunosPorCurso = 0;
    }
  }

  carregarCursos() {
    this.cursoService.buscarCursos().subscribe({
      next: (value) => {
        this.cursos = value.content;
      },
      error: (err) => {
        this.toast.error(`Erro ao carregar cursos: ${err.error.error}`, 'Erro');
      }
    });
  }

  buscarCursos() {
    this.cursoService.buscarCursos().subscribe({
      next: (value) => {
        this.cursos = value.content;
      },
      error: (err) => {
        console.log(`Erro ao buscar cursos: ${err.error.error}`);
      }
    })
  }

  filtrarCursos() {
    if (!this.areaFiltro) {
      this.cursosFiltrados = [...this.cursos];
    } else {
      this.cursosFiltrados = this.cursos.filter(curso => 
        curso.areaTecnologica === this.areaFiltro
      );
    }
  }
}

