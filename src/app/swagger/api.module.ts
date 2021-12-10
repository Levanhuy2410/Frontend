import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { SampleService } from './services/sample.service';
import { ProjectService } from './services/project.service';
import { GroupService } from './services/group.service';
import { EmployeeService } from './services';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    SampleService,
    ProjectService,
    GroupService,
    EmployeeService
  ],
})
export class ApiModule { }
