import { ProjectDto } from './../../../swagger/models/project-dto';
import { ProjectCreateService } from './../../services/project-create.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectUpdateService } from '../../services/project-update.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pim-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  headerText: string;
  buttonText: string;
  isUpdated: boolean;
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
    , private router: Router, private projectUpdateService: ProjectUpdateService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!isNaN(params['id'])) {
        this.headerText = "Edit Project information"
        this.buttonText = "Update Project";
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
        this.isUpdated = false;
      }
    })
  }

  onSubmit() {
    let visaList: string[] = [];
    let formVisaList = this.postForm.get('members').value;
    formVisaList.forEach(element => {
      visaList.push(element.Visa);
    });
    let postValue: ProjectDto = {
      Customer: this.postForm.get('customer').value,
      Project_Number: this.postForm.get('projectNumber').value,
      Name: this.postForm.get('name').value,
      GroupId: this.postForm.get('groupId').value,
      Status: this.postForm.get('status').value,
      Start_Date: this.postForm.get('startDate').value,
      End_Date: this.postForm.get('endDate').value,
      EmployeeVisas: visaList
    }
    // submit
    if (!this.isUpdated) {
      this.projectCreateService.createProject(postValue);
    }
    else {
      postValue.Project_Number = this.project$.value.Project_Number;
      postValue.Row_Version = this.project$.value.Row_Version;
      console.log(postValue);
      this.projectUpdateService.updateProject(postValue);
    }
  }

}


