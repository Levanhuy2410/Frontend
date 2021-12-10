import { GridComponent } from './../../../Base/components/grid/grid.component';
import { ProjectListService } from './../../services/project-list.service';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'pim-project-list',
    styleUrls: ['./project-list.component.scss'],
    templateUrl: './project-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
    @ViewChild('table') table: GridComponent;

    constructor(public projectListService: ProjectListService) {
    }

    ngOnInit(): void {
    }

    resetPage(event) {
        // error call stack if not do this
        this.table.paginator.changePage(0); // set to page 1
    }
}
