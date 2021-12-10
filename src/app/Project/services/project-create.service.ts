import { ViewProjectDto } from './../../swagger/models/view-project-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectDto } from './../../swagger/models/project-dto';
import { Injectable } from '@angular/core';
import { ProjectService } from '../../swagger/services/project.service';
import { EmployeeService, GroupService } from '../../swagger/services';
import { tap } from 'rxjs/operators';
import { EmployeeDto } from 'src/app/swagger/models/employee-dto';
import { ProjectListService } from './project-list.service';
import { ProjectListDto } from 'src/app/swagger/models/project-list-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectCreateService {
  groupListSource = new BehaviorSubject<number[]>(null);
  employeeListSource = new BehaviorSubject<EmployeeDto[]>(null);

  constructor(private projectService: ProjectService, private groupService: GroupService, private employeeService: EmployeeService,
              private projectListService: ProjectListService) {
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
    .pipe(
      tap(
        data => {
          let newProject: ViewProjectDto = {
            Customer: data.Customer,
            GroupId: data.GroupId,
            EmployeeVisas: data.EmployeeVisas,
            Name: data.Name,
            Project_Number: data.Project_Number,
            Start_Date: data.Start_Date,
            Status: data.Status,
            End_Date: data.End_Date,
          }
          const newProjectList: ProjectListDto = {
            Projects : [...this.projectListService.projectListSource.value.Projects, newProject],
          }
          this.projectListService.projectListSource.next(newProjectList);
        }
      )
    )
    .subscribe(
      data => {
        alert("Create Project successful");
      },
      error => {
        alert("something happen");
      }
    )
  }
}
