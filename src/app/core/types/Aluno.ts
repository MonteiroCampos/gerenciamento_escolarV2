
import { Endereco } from "./Endereco";

export interface Aluno {
    id: number,
    cursoId: number,
    matricula: string,
    nome: string,
    email: string,
    telefone: string,
    pais: Endereco,
    estado: Endereco,
    cidade: Endereco,
    bairro: Endereco,
    cep: Endereco,
    rua: Endereco,
    numero: Endereco,
    fotoUrl: string
}