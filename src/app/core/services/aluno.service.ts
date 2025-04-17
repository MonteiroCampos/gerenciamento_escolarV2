import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../types/Aluno';
import { AlunoForm } from '../types/AlunoForm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  getCursos() {
    throw new Error('Method not implemented.');
  }
  // criarAlunoForm(aluno: AlunoForm) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http: HttpClient) { }

  criarAluno(aluno: AlunoForm): Observable<any> {
    return this.http.post<Aluno>(`http://localhost:8080/alunos`, aluno);
  }

  buscarAlunos(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/alunos`);
  }

  deletarAlunos(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/alunos/${id}`);
  }

  salvarImagem(id: number, form: FormData): Observable<any> {
    return this.http.post(`http://localhost:8080/alunos/foto/${id}`, form);
  }
}
