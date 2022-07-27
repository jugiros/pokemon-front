import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestServicesService {

  constructor(
    private http: HttpClient
  ) { }

  httpGet(url: string) {
    const promise = new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
    return promise;
  }
}
