import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDto, Category, SubCategory } from '../components/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  categoryUrl = 'https://descubrir-corrientes.herokuapp.com/category'; // URL to web api
  subCategoryUrl = 'https://descubrir-corrientes.herokuapp.com/subcategory'; // URL to web api
  articlesUrl = 'https://descubrir-corrientes.herokuapp.com/articles'; // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  searchCategories(): Observable<Category> {
    return this.http.get<Category>(
      this.categoryUrl
    );
  }

  createCategory(category: any){
    return this.http.post<any>(this.categoryUrl, category).subscribe({
      next: data => {
        location.reload();
    },
    error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  searchSubCategories(){
    return this.http.get<SubCategory>(
      this.subCategoryUrl
    );
  }

  createSubCategory(subCategory: any){
    return this.http.post<any>(this.subCategoryUrl, subCategory).subscribe({
      next: data => {
        location.reload();
    },
    error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  searchArticles(): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(
      this.articlesUrl
    );
  }
  
  createArticle(article: any){

    return this.http.post<any>(this.articlesUrl, article).subscribe({
      next: data => {        
        console.log('art',data);

        // location.reload();
    },
    error: error => {
        console.error('There was an error!', error);
      }
    });
  }

}
