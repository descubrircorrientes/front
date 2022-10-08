import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDto } from '../components/models/article.model';

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
  ) {
    this.routes.params.subscribe(() => {
      this.article = JSON.parse(localStorage.getItem('currentArticle'));
    });
  }

  ngOnInit() {
  }
}
