import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class HomeService {

  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {

  }

  getAll() {
    const url = this.baseUrl + '/api/list';
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  getById(recordId) {
    const url = this.baseUrl + '/api/read/' + recordId;
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  create(data) {
    const url = this.baseUrl + '/api/create';
    return this._http.post(url, data).map((response: Response) => {
      return response.json();
    });
  }

  updateById(recordId, record) {
    const url = this.baseUrl + '/api/modify/' + recordId;
    return this._http.put(url, record).map((response: Response) => {
      return response.json();
    });
  }

  deleteById(recordId) {
    const url = this.baseUrl + '/api/remove/' + recordId;
    return this._http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}
