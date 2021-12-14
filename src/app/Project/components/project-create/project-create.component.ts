import { ProjectDto } from './../../../swagger/models/project-dto';
import { ProjectCreateService } from './../../services/project-create.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectUpdateService } from '../../services/project-update.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'pim-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent implements OnInit {

  headerText: string;
  buttonText: string;
  isUpdated: boolean;
  confirmHeader: string;
  groupList$ = this.projectCreateService.groupListSource;
  employeeList$ = this.projectCreateService.employeeListSource;
  project$ = this.projectUpdateService.projectSource;

  postForm = new FormGroup({
    projectNumber: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    customer: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    groupId: new FormControl(1, Validators.required),
    status: new FormControl('', Validators.required),
    members: new FormControl([], Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('')
  })

  constructor(private route: ActivatedRoute, private projectCreateService: ProjectCreateService
    , private router: Router, private projectUpdateService: ProjectUpdateService, private datePipe: DatePipe,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (isNaN(params['id'])){
        this.router.navigate(['/project/404']);
      }
      else if (!isNaN(params['id'])) {
        this.headerText = "Edit Project information"
        this.buttonText = "Update Project";
        this.confirmHeader = "Do you want to update this project ?"
        this.isUpdated = true;
        this.projectUpdateService.getProject(params['id']).subscribe(
          data => {
            this.postForm.setValue({
              projectNumber: this.project$.value.Project_Number,
              name: this.project$.value.Name,
              customer: this.project$.value.Customer,
              groupId: this.project$.value.GroupId,
              status: this.project$.value.Status,
              members: this.project$.value.Employees,
              startDate: this.datePipe.transform(this.project$.value.Start_Date, 'yyyy-MM-dd'),
              endDate: this.datePipe.transform(this.project$.value.End_Date, 'yyyy-MM-dd')
            });
            this.postForm.get('projectNumber').disable();
          },
          error => {
            this.router.navigate(['/project/404']);
          });
      }
      else {
        this.headerText = "New Project"
        this.buttonText = "Create Project";
        this.confirmHeader = "Do you want to create this project ?"
        this.isUpdated = false;
      }
    })
  }

  onSubmit() {
    if (this.postForm.invalid) {
      this.messageService.add({ severity: 'error', summary: '', detail: "Please enter all mandatory fields (*)" });
    }
    else {
      let postValue: ProjectDto = {
        Customer: this.postForm.get('customer').value,
        Project_Number: this.postForm.get('projectNumber').value,
        Name: this.postForm.get('name').value,
        GroupId: this.postForm.get('groupId').value,
        Status: this.postForm.get('status').value,
        Start_Date: this.postForm.get('startDate').value,
        End_Date: this.postForm.get('endDate').value,
        EmployeeVisas: this.postForm.get('members').value.map(a => a.Visa)
      }

      // submit
      this.confirmationService.confirm({
        message: this.confirmHeader,
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          if (!this.isUpdated) {
            this.projectCreateService.createProject(postValue).subscribe(
              data => {
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record created' });
                this.navigateToProjectList();
              },
              error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.Message });
              }
            );
          }
          else {
            postValue.Project_Number = this.project$.value.Project_Number;
            postValue.Row_Version = this.project$.value.Row_Version;
            this.projectUpdateService.updateProject(postValue)
              .subscribe(
                data => {
                  this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record updated' });
                  this.navigateToProjectList();

                },
                error => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: error.statusText });
                }
              );
          }
        }
      });
    }
  }

  navigateToProjectList(): void {
    setTimeout(() => {
      this.router.navigate(
        ['project'],
        {
          queryParams: { page: 1 }
        }
      );
    }, 2000)
  }
}


