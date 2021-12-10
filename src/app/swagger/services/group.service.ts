import { StrictHttpResponse } from './../strict-http-response';
import { BaseService } from './../base-service';
import { Injectable } from '@angular/core';
import { ApiConfiguration } from '../api-configuration';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
class GroupService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }

     /**
   * @return OK
   */
      GroupGetResponse(): Observable<StrictHttpResponse<number[]>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/Group/Get`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<number[]>;
            })
        );
    }

    /**
   * @return OK
   */
    GroupGet(): Observable<number[]> {
        return this.GroupGetResponse().pipe(
            __map(_r => _r.body)
        );
    }
}

module GroupService {
}

export { GroupService }