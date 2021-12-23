import { ProjectDto } from './../../../swagger/models/project-dto';
import { ProjectCreateService } from './../../services/project-create.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectUpdateService } from '../../services/project-update.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ValidateDate } from '../../directives/dateCompare.validator'
import { dateFormatPipe } from 'src/app/Base/pipes/date-pipe.pipe';
// import { dateFormatPipe } from '../../../Base/pipes/status-pipe.pipe';

@Component({
  selector: 'pim-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent implements OnInit {

  headerText: string;
  buttonText: string;
  isUpdated: boolean;
  groupList$ = this.projectCreateService.groupListSource;
  employeeList$ = this.projectCreateService.employeeListSource;
  project$ = this.projectUpdateService.projectSource;
  status: any[] = []

  postForm = new FormGroup({
    projectNumber: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    customer: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    groupId: new FormControl(1, Validators.required),
    status: new FormControl({name: "New", value: "NEW"}, Validators.required),
    members: new FormControl([]),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('')
  }, ValidateDate)

  constructor(private route: ActivatedRoute, private projectCreateService: ProjectCreateService
    , private router: Router, private projectUpdateService: ProjectUpdateService, private datePipe: DatePipe,
    private confirmationService: ConfirmationService, private messageService: MessageService
    , public translate: TranslateService, private location: Location, private dateFormatPipe: dateFormatPipe
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.headerText = "Edit Project information"
        this.buttonText = "Update Project";
        this.isUpdated = true;
        this.projectUpdateService.getProject(params['id']).subscribe(
          data => {
            // var date = new Date(this.project$.value.Start_Date);
            this.postForm.setValue({
              projectNumber: this.project$.value.Project_Number,
              name: this.project$.value.Name,
              customer: this.project$.value.Customer,
              groupId: this.project$.value.GroupId,
              status: this.status.find(element => element.value === this.project$.value.Status),
              members: this.project$.value.Employees,
              startDate: this.datePipe.transform(this.project$.value.Start_Date, 'dd-MM-yyyy'),
              endDate: this.datePipe.transform(this.project$.value.End_Date, 'dd-MM-yyyy')
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
    });

    this.translate.stream("StatusOptions").subscribe(
      data => {
        this.status = [
          { name: data.new, value: "NEW" },
          { name: data.inp, value: "INP" },
          { name: data.pla, value: "PLA" },
          { name: data.fin, value: "FIN" },
        ]
      }
    )
  }

  onSubmit() {
    if (this.postForm.hasError('StartDateIsMore')) {
      this.messageService.add({ severity: 'error', summary: '', detail: "End date is sooner than start date" });
    }
    else if (this.postForm.invalid) {
      this.messageService.add({ severity: 'error', summary: '', detail: "Please enter all mandatory fields (*)" });
    }
    else {
      let postValue: ProjectDto = {
        Customer: this.postForm.get('customer').value,
        Project_Number: this.postForm.get('projectNumber').value,
        Name: this.postForm.get('name').value,
        GroupId: this.postForm.get('groupId').value,
        Status: this.postForm.get('status').value.value,
        Start_Date: this.postForm.get('startDate').value,
        End_Date: this.postForm.get('endDate').value,
        EmployeeVisas: this.postForm.get('members').value.map(a => a.Visa)
      }

      // submit
      this.confirmationService.confirm({
        message: this.isUpdated ? this.translate.instant("CreateConfirm") : this.translate.instant("UpdateConfirm"),
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          if (!this.isUpdated) {
            this.projectCreateService.createProject(postValue).subscribe(
              data => {
                this.messageService.add({ severity: 'success', summary: this.translate.instant("Confirmed"), detail: this.translate.instant("RecordCreated") });
                this.navigateToProjectList();
              },
              error => {
                this.messageService.add({ severity: 'error', summary: this.translate.instant("Error"), detail: error.error.Message });
              }
            );
          }
          else {
            postValue.Project_Number = this.project$.value.Project_Number;
            postValue.Row_Version = this.project$.value.Row_Version;
            this.projectUpdateService.updateProject(postValue)
              .subscribe(
                data => {
                  this.messageService.add({ severity: 'success', summary: this.translate.instant("Confirmed"), detail: this.translate.instant("RecordUpdated") });
                  this.navigateToProjectList();

                },
                error => {
                  this.messageService.add({ severity: 'error', summary: this.translate.instant("Error"), detail: error.statusText });
                }
              );
          }
        }
      });
    }
  }

  onReset(): void {
    this.location.back();
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


