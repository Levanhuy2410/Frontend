import { ProjectListService } from 'src/app/Project/services/project-list.service';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';

@Component({
    selector: 'pim-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService, ConfirmationService]
})
export class GridComponent implements OnInit {
    projectList$ = this.projectListService.projectListSource;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    checked: boolean = false;
    selectedProject: number[] = [];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router, public projectListService: ProjectListService) {

    }

    ngOnInit(): void {
    }

    deleteSelectedProject() {
        let ids: number[] = []
        this.selectedProject.forEach((element, index) => {
            if (element) {
                ids.push(index);
            }
        });
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete multiple selected project ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.projectListService.deleteMultipleProjects(ids).subscribe(
                    data => {
                        alert("Delete multiple projects successful");
                    },
                    error => {
                        alert("You have selected not new project");
                    }
                );
            }
        });
    }

    deleteSingleProject(id: number) {
        let ids: number[] = [];
        ids.push(id);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.projectListService.deleteProject(ids).subscribe(
                    data => {
                        alert("Delete project successful");
                    },
                    error => {
                        alert("Delete not new project")
                    }
                );
            }
        });
    }

    paginate(event) {
        this.router.navigate(
            [],
            {
                queryParams: {
                    page: event.page + 1 // new page
                },
                queryParamsHandling: "merge"
            }
        )
    }

}
