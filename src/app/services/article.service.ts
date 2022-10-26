import { Injectable } from '@angular/core';
import { ArticleDto, TabConfig } from '../components/models/article.model';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: any;
  tabsData: TabConfig[];
  

  constructor(
    private httpApiService: HttpApiService,
  ) { 
    this.httpApiService.searchArticles().subscribe((articles: ArticleDto) => {
        this.articles = articles;        
    });
    this.tabsData = [
      { name: 'From This Device', value: ['file'] },
      { name: 'From the Web', value: ['url'] },
      { name: 'Both', value: ['file', 'url'] },
    ];
  }



  getArticles(){
    return this.articles;
  }

  getOneArticles(i){
    return this.articles[i];
  }

  getTabsData(): TabConfig[] {
    return this.tabsData;
  }

}
