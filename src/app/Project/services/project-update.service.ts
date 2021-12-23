import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectService } from '../../swagger/services/project.service';
import { tap } from 'rxjs/operators';
import { ViewProjectDto } from 'src/app/swagger/models/view-project-dto';
import { ProjectDto } from 'src/app/swagger/models/project-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectUpdateService {
  projectSource = new BehaviorSubject<ViewProjectDto>(null);
  updatedProjectSource = new BehaviorSubject<ProjectDto>(null);

  constructor(private projectService: ProjectService) {
  }

  getProject(id: number): Observable<ViewProjectDto> {
    return this.projectService.ProjectGet_1(id).pipe(tap(
      data => {
        this.projectSource.next(data);
      }
    ))
  }

  updateProject(updatedProject: ProjectDto) {
    return this.projectService.ProjectPut(updatedProject)
  }
}
