import { User } from './../../interfaces/user.interface';
import { Post } from './../../interfaces/post.interface';
import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  posts: Post[] = [];
  users: User[] = [];
  completeList: any[] = [];
  detailData: any;
  detailOpened: boolean = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getLists();
  }


  getLists() {
    //viene recuperata la lista dei posts
    this.apiService.getPostsList().subscribe((post: Post[]) => {
      this.posts = post;
      //viene recuperata la lista degli users
      this.apiService.getUsersList().subscribe((user: User[]) => {
        this.users = user;

        this.combineList();
      },
        (err: any) => {
          alert("error: " + err)
        }
      );
    },
      (err: any) => {
        alert("error: " + err)
      });
  }

  //genero un nuovo array combinando i due ottenuti richiamando i rispettivi 'servizi' in modo da avere una lista completa ed evitare complessità nell'html
  //sfruttando il matching tra user.id e post.userId
  combineList() {
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

  getFirstLettersName(name: string) {
    const split = name.split(" ");
    const output = split[0][0] + split[1][0];
    return output;

  }

  showDetail(item: any) {
    this.detailOpened = true;
    this.detailData = item;

    //avendo ciclato tutta la lista dei post, il comando seguente consente di ritornare in cima se l'elemento in visualizzazione si trova molto in basso
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

  }
  hideDetail() {
    this.detailOpened = false;
  }
}

