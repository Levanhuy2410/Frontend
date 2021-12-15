import { ProjectListService } from 'src/app/Project/services/project-list.service';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild, DoCheck } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { ViewProjectDto } from 'src/app/swagger/models/view-project-dto';
@Component({
    selector: 'pim-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    projectList$ = this.projectListService.projectListSource;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    selectedProject: ViewProjectDto[] = [];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router, public projectListService: ProjectListService) {

    }

    ngOnInit(): void {
    }

    deleteSelectedProject() {
        let ids = this.selectedProject.map(a => a.Id);

        this.confirmationService.confirm({
            message: 'Are you sure you want to delete multiple selected project ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.projectListService.deleteMultipleProjects(ids).subscribe(
                    data => {
                        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
                    },
                    error => {
                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error.error.Message });
                    }
                );
            }
        });
    }

    deleteSingleProject(id: number) {
        let ids: number[] = [];
        ids.push(id);
        // console.log(ids);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.projectListService.deleteProject(ids).subscribe(
                    data => {
                        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
                    },
                    error => {
                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error.error.Message });
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
