import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private router: Router) {
  }

  getProject(id: number): Observable<ViewProjectDto> {
    return this.projectService.ProjectGet_1(id).pipe(tap(
      data => {
        this.projectSource.next(data);
      }
    ))
  }

  updateProject(updatedProject: ProjectDto) {
    return this.projectService.ProjectPut(updatedProject).subscribe(
      data => {
        alert(`Update Project ${updatedProject.Project_Number} Successful`);
        this.router.navigate(
          ['project'],
          {
            queryParams: { page: 1 }
          }

        );
      },
      error => {
        if (error.status === 409) {
          if (window.confirm(`Someone has updated this project ${updatedProject.Project_Number}. Would you like to reload`)) {
            window.location.reload();
          }
        }
        else {
          alert(error.error.Message);
        }
      }
    );
  }
}
