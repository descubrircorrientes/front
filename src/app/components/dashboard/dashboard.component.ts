import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApiService } from '../../services/http-api.service';
import { ArticleDto } from '../models/article.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  articles: any;
  articlesQty: number;

  constructor(
    private router: Router,
    private httpApiService: HttpApiService,
  ) {
   }

  ngOnInit(): void {
    this.httpApiService.searchArticles().subscribe((articles: ArticleDto) => {      
      this.articles = articles;
      this.articlesQty = this.articles.length;
    });
  }

  goToComponent(url: string){
    this.router.navigate(['/', url]);
  }

}
