import { ApiService } from './../../services/api.service';
import { User } from './../../interfaces/user.interface';
import { Post } from './../../interfaces/post.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  posts: any;
  users: any;
  completeList: any[] = [];

  constructor(private apiService: ApiService) {

  }

  async ngOnInit() {
    this.posts = await this.getPosts();
    this.users = await this.getUsers();



    this.posts.forEach((post: { userId: any; }) => {
      const findUsr = this.users.find((user: { id: any; }) => user.id === post.userId);
      if (findUsr) {
        this.completeList.push({
          ...post,
          ...findUsr
        });
      }
    });


  }

  getPosts() {
    return this.apiService.getPostsList().toPromise();
  }

  getUsers() {
    return this.apiService.getUsersList().toPromise();
  }

  getFirstLettersName(name: string) {
    const split = name.split(" ");
    const output = split[0][0] + split[1][0];
    return output;

  }
}
