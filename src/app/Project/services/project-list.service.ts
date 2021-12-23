import { tap } from 'rxjs/operators';
import { FilterDto } from './../../swagger/models/filter-dto';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectListDto } from '../../swagger/models/project-list-dto';
import { ProjectService } from '../../swagger/services/project.service';
import { SortFilterDto } from 'src/app/swagger/models/sort-filter-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {
  projectListSource = new BehaviorSubject<ProjectListDto>(null);
  filterSource = new BehaviorSubject<FilterDto>(null);
  sortFilterSource = new BehaviorSubject<SortFilterDto>({ Field: "", Order: 1 });

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {

    this.route.queryParams
      .subscribe(params => {
        if (params.status && params.detail) {
          let filter: FilterDto = {
            Detail: params.detail,
            Status: params.status,
          }
          this.filterSource.next(filter);
          this.filterSource.subscribe(data => {
            this.filterProjects(data, params.page).subscribe();
          })

        }
        else if (params.page) {
          // this.sortFilterSource.subscribe(sort => {
          // this.sortFilterSource.subscribe(data => {
            this.getProjectsPagination(this.sortFilterSource.value, params.page).subscribe();
          // })
          // })
        }
      }
      );
  }

  getProjectsPagination(sortFilter: SortFilterDto, page: number): Observable<ProjectListDto> {
    return this.projectService.ProjectGetPagination(sortFilter, page).pipe(tap(data => {
      this.projectListSource.next(data)
    }
    ));
  }

  filterProjects(filter: FilterDto | boolean, page: number): Observable<ProjectListDto> {
    return this.projectService.ProjectSearch(filter, page).pipe(tap(data => this.projectListSource.next(data)));
  }

  deleteProject(ids: number[]): Observable<null> {
    return this.projectService.ProjectDelete(ids)
      .pipe(
        tap(data => {
          if (data === null) {
            let projectList = this.projectListSource.value;
            projectList.Projects = projectList.Projects.filter(val => val.Id !== ids[0])
            this.projectListSource.next(projectList);
          }
        })
      )
  }

  deleteMultipleProjects(ids: number[]): Observable<null> {
    return this.projectService.ProjectDelete(ids)
      .pipe(
        tap(data => {
          if (data === null) {
            let projectList = this.projectListSource.value;
            projectList.Projects = projectList.Projects.filter(val => !ids.includes(val.Id));
            this.projectListSource.next(projectList);
          }
        })
      )
  }
}
