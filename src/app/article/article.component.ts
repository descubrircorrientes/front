import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from '../components/models/article.model';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleParams: any;
  articles: ArticleDto[];
  article: any;
  currentItem: any;

  constructor(
    private routes: ActivatedRoute,
    private httpApiService: HttpApiService,
  ) {
    this.routes.params.subscribe(() => {
      this.article = JSON.parse(localStorage.getItem('currentArticle'));
    });
  }

  ngOnInit() {
  }

  delete(){
    console.log(this.article._id);
    this.httpApiService.deleteArticle(this.article._id)
    
  }
}
