import { ProjectListService } from 'src/app/Project/services/project-list.service';
import { FilterDto } from 'src/app/swagger/models/filter-dto';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProjectCreateService } from 'src/app/Project/services/project-create.service';

@Component({
  selector: 'pim-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {
  @Output() resetPage = new EventEmitter();
  status: any[] = []
  items: any[] = []
  isAdvanced: boolean = false;
  employeeList$ = this.projectCreateService.employeeListSource;
  advancedLabel: string = "Advanced.showAdvanced";
  searchForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private projectListService: ProjectListService,
    public translate: TranslateService, private projectCreateService: ProjectCreateService
  ) {
    
  }

  ngOnInit(): void {
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

    this.searchForm = new FormGroup({
      detail: new FormControl(this.route.snapshot.queryParams.detail),
      status: new FormControl(this.status.find(element => element.value === this.route.snapshot.queryParams.status)),
      leader: new FormControl(""),
      members: new FormControl([]),
      startDate: new FormControl(""),
      isLargerThanStartDate: new FormControl(false),
      endDate: new FormControl(""),
      isLargerThanEndDate: new FormControl(false),
    })
  }

  onSubmit() {
    console.log(this.searchForm.value);
    let filter: FilterDto = {
      Detail: this.searchForm.get('detail').value,
      Status: this.searchForm.get('status').value.value,
      Project_Leader: this.searchForm.get('leader').value ? this.searchForm.get('leader').value.Visa : "",
      Members: this.searchForm.get('members').value ? this.searchForm.get('members').value.map(a => a.Visa) : [],
      Start_Date: {
        Date: this.searchForm.get('startDate').value,
        IsLarger: this.searchForm.get('isLargerThanStartDate').value
      },
      End_Date: {
        Date: this.searchForm.get('endDate').value,
        IsLarger: this.searchForm.get('isLargerThanEndDate').value
      }
    }

    this.projectListService.filterSource.next(filter);
    this.resetPage.emit(filter);

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          page: 1, // new page
          detail: filter.Detail,
          status: filter.Status
        },
      }
    )
  }

  onReset() {
    this.resetPage.emit(false);
    this.router.navigate(
      [],
      {
        queryParams: {
          page: 1 // new page
        }
      }
    )
  }

  onResetAdvanced() {
    this.projectListService.filterSource.next({ Status: this.searchForm.get('status').value.value, Detail: this.searchForm.get('detail').value });
  }

  changeAdvanced() {
    this.isAdvanced = !this.isAdvanced;
    if (this.isAdvanced) {
      this.advancedLabel = "Advanced.hideAdvanced";
    }
    else {
      this.advancedLabel = "Advanced.showAdvanced"
    }
  }
}
