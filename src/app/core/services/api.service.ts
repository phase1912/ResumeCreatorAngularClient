import { HttpClient, HttpEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class ApiService {
  constructor(protected baseUrl: string,
              protected http: HttpClient) { }

  protected get<T>(relativeUrl: string, options?: any) : Observable<HttpResponse<T>> {
    return this.http.get<T>(this.absoluteUrl(relativeUrl), this.getOptions(options));
  }

  protected post<T>(relativeUrl: string, data: any, options?: any): Observable<HttpResponse<T>>  {
    return this.http.post<T>(this.absoluteUrl(relativeUrl), data, this.getOptions(options));
  }

  protected put<T>(relativeUrl: string, data: any, options?: any): Observable<HttpEvent<T>>  {
    return this.http.put<T>(this.absoluteUrl(relativeUrl), data, options);
  }

  protected delete(relativeUrl: string, options?: any): Observable<HttpResponseBase>
  protected delete<T>(relativeUrl: string, options?: any): Observable<HttpResponse<T>> {
    return this.http.delete<T>(this.absoluteUrl(relativeUrl), this.getOptions(options));
  }

  protected postForBlob<T>(relativeUrl: string, data: any, options?: any) {
    const headers = {};
    // let params = null;
    // if (data) {
    //   params = this.mapParams(data, true);
    // }
    options['headers'] = headers;
    options['withCredentials'] = true;

    return this.http.post<T>(this.absoluteUrl(relativeUrl), data, options);
  }

  private mapParams(params: object, asJson = false): any {
    let mappedParams: any;
    if (asJson) {
      mappedParams = JSON.stringify(params);
    } else {
      mappedParams = Object.keys(params).reduce(
        (array, key) => {
          // @ts-ignore
          array.push(`${key}=${encodeURIComponent(params[key])}`);
          return array;
        },
        []).join('&');
    }
    return mappedParams;
  }

  private absoluteUrl(relativeUrl : string)
  {
    return `${this.baseUrl}/${relativeUrl}`;
  }

  private getOptions(options: any): {observe : 'response'}
  {
    return {...options, observe : 'response'};
  }
}
