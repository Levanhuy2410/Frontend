import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../Base/components/not-found/not-found.component';

import { ProjectListComponent } from './components';
import { ProjectCreateComponent } from './components/project-create/project-create.component';

const routes: Routes = [
    { path: '', component: ProjectListComponent },
    { path: 'new', component: ProjectCreateComponent},
    { path: 'edit/:id', component: ProjectCreateComponent},
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {
}
