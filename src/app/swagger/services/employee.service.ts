import { EmployeeDto } from './../models/employee-dto';
import { Injectable } from '@angular/core';
import { StrictHttpResponse } from './../strict-http-response';
import { BaseService } from './../base-service';
import { ApiConfiguration } from '../api-configuration';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
class EmployeeService extends BaseService {

  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
  * @return OK
  */
  EmployeeGetResponse(): Observable<StrictHttpResponse<EmployeeDto[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Employee/Get`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<EmployeeDto[]>;
      })
    );
  }

  /**
 * @return OK
 */
  EmployeeGet(): Observable<EmployeeDto[]> {
    return this.EmployeeGetResponse().pipe(
      __map(_r => _r.body)
    );
  }
}

module EmployeeService {
}

export { EmployeeService }