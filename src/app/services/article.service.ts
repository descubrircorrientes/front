import { Injectable } from '@angular/core';
import { ArticleDto } from '../components/models/article.model';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: any;

  constructor(
    private httpApiService: HttpApiService,
  ) { 
    this.httpApiService.searchArticles().subscribe((articles: ArticleDto) => {
        this.articles = articles;        
    });
  }

  getArticles(){
    return this.articles;
  }

  getOneArticles(i){
    return this.articles[i];
  }

}
