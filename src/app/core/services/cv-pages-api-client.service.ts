import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { RequestModel } from '../models/request.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CvPagesApiClientService extends ApiService {
  constructor(http: HttpClient) {
    super(environment.oauth.server_url, http)
  }

  public exportPdfV1(model: RequestModel<string>) {
    const options = { observe: 'response', responseType: 'blob' };

    return super.postForBlob<any>('api/pdf/v1/', model, options);
  }
}
