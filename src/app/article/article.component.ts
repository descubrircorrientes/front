import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ArticleDto } from '../components/models/article.model';
import { ArticleService } from '../services/article.service';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleParams: any;
   articles: any;
  article: ArticleDto;
  currentItem: any;

  constructor(
    private routes: ActivatedRoute,
    private articleService: ArticleService,
    private httpApiService: HttpApiService,

  ) {
    this.routes.params.subscribe(params => {
      console.log(params);
      
      // this.articleParams = params['id'];
      // this.articles = this.articleService.articles;
      // this.article = this.articles[this.articleParams]
    });
  }

  ngOnInit() {
  }

}
