import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CriarCursoComponent } from './criar-curso/criar-curso.component';
import { CartaoCursoComponent } from "../../shared/cartao-curso/cartao-curso.component";
import { CursoService } from '../../core/services/curso.service';
import { Curso } from '../../core/types/Curso';

@Component({
  selector: 'app-cursos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CartaoCursoComponent
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit {

  cursos: Curso[] = [];

  constructor(private dialog: MatDialog, private service: CursoService) { }
  ngOnInit(): void {
    this.buscarCursos();
  }

  abrirDialogoCriarCurso() {
    this.dialog.open(CriarCursoComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "Criado") {
          this.buscarCursos();
        }
      }
    })
  }

  buscarCursos() {
    this.service.buscarCursos().subscribe({
      next: (value) => {
        this.cursos = value.content;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
