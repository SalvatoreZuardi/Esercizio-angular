import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPostsList() {
    return this.http.get(baseUrl + '/posts');
  }

  getUsersList() {
    return this.http.get(baseUrl + '/users');
  }
}
