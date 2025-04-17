import { Routes } from '@angular/router';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { HomeComponent } from './pages/home/home.component';
import { AlunosComponent } from './pages/alunos/alunos.component';

export const routes: Routes = [
    {
        path: '',
        component: SidenavComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'cursos',
                component: CursosComponent
            },
            {
                path: 'alunos',
                component: AlunosComponent
            }
        ]
    }


];

