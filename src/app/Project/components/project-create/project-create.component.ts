import { map } from 'rxjs/operators';
import { ProjectDto } from './../../../swagger/models/project-dto';
import { ProjectCreateService } from './../../services/project-create.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pim-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  
  headerText: string;
  groupList$ = this.projectCreateService.groupListSource;
  employeeList$ = this.projectCreateService.employeeListSource;

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

  constructor(private route: ActivatedRoute, private projectCreateService: ProjectCreateService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!isNaN(params['id'])){
        this.headerText = "Update Project"
      }
      else {
        this.headerText = "New Project"
      }
    })
  }

  onSubmit() {
    console.log(this.postForm);
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
    this.projectCreateService.createProject(postValue);
    this.router.navigate(
      ['project'],
      {
        queryParams: {page: 1}
      }
      
      );
  }

}


