import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../types/Curso';
import { Observable } from 'rxjs';
import { AlunoForm } from '../types/AlunoForm';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  criarAluno(aluno: AlunoForm) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  criarCurso(curso: Curso): Observable<any> {
    return this.http.post<Curso>(`http://localhost:8080/cursos`, curso);
  }

  buscarCursos(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/cursos`);
  }

  deletarCursos(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/cursos/${id}`);
  }

  salvarImagem(id: number, form: FormData): Observable<any> {
    return this.http.post(`http://localhost:8080/cursos/imagem/${id}`, form);
  }
}
