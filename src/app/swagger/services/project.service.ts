import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { ProjectListDto } from '../models/project-list-dto';
import { ViewProjectDto } from '../models/view-project-dto';
import { ProjectDto } from '../models/project-dto';
import { FilterDto } from '../models/filter-dto';

@Injectable({
    providedIn: 'root',
})
class ProjectService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }

    /**
   * @return OK
   */
    ProjectGetResponse(): Observable<StrictHttpResponse<ProjectListDto>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/Project/Get`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<ProjectListDto>;
            })
        );
    }

    /**
   * @return OK
   */
    ProjectGet(): Observable<ProjectListDto> {
        return this.ProjectGetResponse().pipe(
            __map(_r => _r.body)
        );
    }

    /**
     * @param pageSize undefined
     * @return OK
     */
    ProjectGet_PaginationResponse(pageSize: number): Observable<StrictHttpResponse<ProjectListDto>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/Project/GetWithPagination?page=${pageSize}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });
            // console.log(req);
        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<ProjectListDto>;
            })
        );
    }

    /**
     * @param pageSize undefined
     * @return OK
     */
    ProjectGetPagination(pageSize: number): Observable<ProjectListDto> {
        return this.ProjectGet_PaginationResponse(pageSize).pipe(
            __map(_r => _r.body)
        );
    }

    /**
     * @param id undefined
     * @return OK
     */
    ProjectGet_1Response(id: number): Observable<StrictHttpResponse<ViewProjectDto>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/Project/Get/${id}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<ViewProjectDto>;
            })
        );
    }

    /**
     * @param id undefined
     * @return OK
     */
    ProjectGet_1(id: number): Observable<ViewProjectDto> {
        return this.ProjectGet_1Response(id).pipe(
            __map(_r => _r.body)
        );
    }

    /**
     * @param id undefined
     */
    ProjectDeleteResponse(ids: number[]): Observable<StrictHttpResponse<null>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let deleteUrl = this.rootUrl + `/api/Project/Delete/?ids=${ids[0]}`;
        if (ids.length > 1){
            for(var i = 1; i < ids.length; i++){
                deleteUrl = deleteUrl + `&ids=${ids[i]}`;
            };
        }

        let req = new HttpRequest<any>(
            'DELETE',
            deleteUrl,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });
        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<null>;
            })
        );
    }
    /**
     * @param id undefined
     */
    ProjectDelete(ids: number[]): Observable<null> {
        return this.ProjectDeleteResponse(ids).pipe(
            __map(_r => _r.body)
        );
    }


    /**
     * @param project undefined
     * @return OK
     */
    ProjectPostResponse(project: ProjectDto): Observable<StrictHttpResponse<ProjectDto>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = project;
        let req = new HttpRequest<any>(
            'POST',
            this.rootUrl + `/api/Project/Post`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });


        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<ProjectDto>;
            })
        );
    }

    /**
     * @param project undefined
     * @return OK
     */
    ProjectPost(project: ProjectDto): Observable<ProjectDto> {
        return this.ProjectPostResponse(project).pipe(
            __map(_r => _r.body)
        );
    }

     /**
     * @param filter undefined
     * @return OK
     */
      ProjectSearchResponse(filter: FilterDto | boolean, pageSize: number): Observable<StrictHttpResponse<ProjectListDto>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = filter;
        let req = new HttpRequest<any>(
            'POST',
            this.rootUrl + `/api/Project/Search?page=${pageSize}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });
            console.log(req);

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<ProjectListDto>;
            })
        );
    }

    /**
     * @param filter undefined
     * @return OK
     */
    ProjectSearch(filter: FilterDto | boolean, pageSize: number): Observable<ProjectListDto> {
        return this.ProjectSearchResponse(filter, pageSize).pipe(
            __map(_r => _r.body)
        );
    }

    /**
     * @param project undefined
     * @return OK
     */
    ProjectPutResponse(project: ProjectDto): Observable<StrictHttpResponse<ProjectDto>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = project;
        let req = new HttpRequest<any>(
            'PUT',
            this.rootUrl + `api/Project/Put`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as StrictHttpResponse<ProjectDto>;
            })
        );
    }
    /**
     * @param project undefined
     * @return OK
     */
    ProjectPut(project: ProjectDto): Observable<ProjectDto> {
        return this.ProjectPutResponse(project).pipe(
            __map(_r => _r.body)
        );
    }
}

module ProjectService {
}

export { ProjectService }