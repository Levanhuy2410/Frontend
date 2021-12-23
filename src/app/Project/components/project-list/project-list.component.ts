import { GridComponent } from './../../../Base/components/grid/grid.component';
import { ProjectListService } from './../../services/project-list.service';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pim-project-list',
    styleUrls: ['./project-list.component.scss'],
    templateUrl: './project-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, AfterViewInit {
    @ViewChild('table') table: GridComponent;

    constructor(public projectListService: ProjectListService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        
    }

    resetPage(event) {
        // error call stack if not do this
        this.table.paginator.changePage(0); // set to page 1
    }
}
