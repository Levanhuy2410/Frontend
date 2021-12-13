import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectDto } from './../../swagger/models/project-dto';
import { Injectable } from '@angular/core';
import { ProjectService } from '../../swagger/services/project.service';
import { EmployeeService, GroupService } from '../../swagger/services';
import { tap } from 'rxjs/operators';
import { EmployeeDto } from 'src/app/swagger/models/employee-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectCreateService {
  groupListSource = new BehaviorSubject<number[]>(null);
  employeeListSource = new BehaviorSubject<EmployeeDto[]>(null);

  constructor(private projectService: ProjectService, private groupService: GroupService, private employeeService: EmployeeService,
    private router: Router) {
    this.getGroups().subscribe(
      data => {
        console.log(data);
      }
    );

    this.getEmployees().subscribe(
      data => {
        console.log(data);
      }
    )
  }

  getEmployees(): Observable<EmployeeDto[]> {
    return this.employeeService.EmployeeGet().pipe(

      tap(data => {
        this.employeeListSource.next(data)
      }
      ));
  }

  getGroups(): Observable<number[]> {
    return this.groupService.GroupGet().pipe(tap(data => {
      this.groupListSource.next(data)
    }
    ));
  }

  createProject(projectDto: ProjectDto) {
    return this.projectService.ProjectPost(projectDto)
      .subscribe(
        data => {
          alert("Create Project Successful");
          this.router.navigate(
            ['project'],
            {
              queryParams: { page: 1 }
            }

          );
        },
        error => {
          alert(error.error.Message);
        }
      )
  }
}
