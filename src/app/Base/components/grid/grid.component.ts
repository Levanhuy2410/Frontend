import { TranslateService } from '@ngx-translate/core';
import { ProjectListService } from 'src/app/Project/services/project-list.service';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild, DoCheck, AfterViewInit, AfterContentInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { ViewProjectDto } from 'src/app/swagger/models/view-project-dto';
import { SortFilterDto } from 'src/app/swagger/models/sort-filter-dto';
@Component({
    selector: 'pim-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    projectList$ = this.projectListService.projectListSource;
    @ViewChild('paginator', { static: false }) paginator: Paginator;
    sortHeader: SortFilterDto = {Field: "", Order: 1};
    selectedProject: ViewProjectDto[] = [];


    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
        private router: Router, public projectListService: ProjectListService,
        private route: ActivatedRoute, public translate: TranslateService) {
    }

    ngOnInit(): void {
    }


    deleteSelectedProject() {
        let ids = this.selectedProject.map(a => a.Id);

        this.confirmationService.confirm({
            message: this.translate.instant("DeleteMultipleConfirm"),
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.projectListService.deleteMultipleProjects(ids).subscribe(
                    data => {
                        this.messageService.add({ severity: 'info', summary: this.translate.instant("Confirmed"), detail: this.translate.instant("RecordDeleted") });
                        this.projectListService.getProjectsPagination(this.sortHeader,this.route.snapshot.queryParams.page).subscribe();
                    },
                    error => {
                        this.messageService.add({ severity: 'warn', summary: this.translate.instant("Error"), detail: error.error.Message });
                    }
                );
                this.selectedProject.length = 0;
            }
        });
    }

    deleteSingleProject(id: number) {
        let ids: number[] = [];
        ids.push(id);
        this.confirmationService.confirm({
            message: this.translate.instant("DeleteSingleConfirm"),
            header: 'Confirm',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.projectListService.deleteProject(ids).subscribe(
                    data => {
                        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: this.translate.instant("RecordDeleted") });
                        this.projectListService.getProjectsPagination(this.sortHeader, this.route.snapshot.queryParams.page).subscribe();
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

    sorting(event){
        this.sortHeader.Field = event.sortField;
        this.sortHeader.Order = event.sortOrder;
        console.log(event);
        this.projectListService.sortFilterSource.next(this.sortHeader);
        this.projectListService.getProjectsPagination(this.sortHeader, 1).subscribe();
        this.paginator.changePage(0);
    }

}
