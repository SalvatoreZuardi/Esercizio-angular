import { Observable } from 'rxjs';
import { User } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';

const baseUrl = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPostsList(): Observable<Post[]> {
    return this.http.get<Post[]>(baseUrl + '/posts');
  }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + '/users');
  }
}
