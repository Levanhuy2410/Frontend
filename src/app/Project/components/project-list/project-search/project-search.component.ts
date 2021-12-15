import { ProjectListService } from 'src/app/Project/services/project-list.service';
import { FilterDto } from 'src/app/swagger/models/filter-dto';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pim-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {
  @Output() resetPage = new EventEmitter();
  status: any[] = []

  searchForm = new FormGroup({
    detail: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private route: ActivatedRoute, private projectListService: ProjectListService
  ) {
    this.status = [
      {name: "New", value: "NEW"},
      {name: "In progress", value: "INP"},
      {name: "Planned", value: "PLA"},
      {name: "Finished", value: "FIN"},
    ]
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let filter: FilterDto = {
      Detail: this.searchForm.get('detail').value,
      Status: this.searchForm.get('status').value.value,
    }

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
        // queryParamsHandling: 'merge'

      }
    )
    // new one
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
}
