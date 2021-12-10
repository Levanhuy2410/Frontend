import { NgModule } from '@angular/core';
import { PIMBaseModule } from '../Base/base.module';
import { ProjectListComponent } from './components';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectSearchComponent } from './components/project-list/project-search/project-search.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ApiModule } from '../swagger/api.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [ProjectListComponent, ProjectCreateComponent, ProjectSearchComponent],
    providers: [],
    imports: [ProjectRoutingModule, PIMBaseModule, ApiModule, ButtonModule,
        InputTextModule, DropdownModule, PaginatorModule, 
        TableModule, ReactiveFormsModule, MultiSelectModule]
})
export class ProjectModule {

}
