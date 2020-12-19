import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  get(url: string): Observable<any> {
    const dataStream = this.http.get(url);
    return dataStream;
  }

  constructor(private http: HttpClient) { }
}
