import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ArticleDto, Category, SecondSubCategory, SubCategory } from '../components/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  categoryUrl = 'https://descubrir-corrientes.herokuapp.com/category'; // URL to web api
  subCategoryUrl = 'https://descubrir-corrientes.herokuapp.com/subcategory'; // URL to web api
  secondSubCategoryUrl =  'https://descubrir-corrientes.herokuapp.com/secondsubcategory';
  articlesUrl = 'https://descubrir-corrientes.herokuapp.com/articles'; // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  //CATEGORIES

  searchCategories(): Observable<Category> {
    return this.http.get<Category>(
      this.categoryUrl
    );
  }

  createCategory(category: any){
    console.log('create');
    
    return this.http.post<any>(this.categoryUrl, category).subscribe({
      next: data => {
        location.reload();
    },
    error: error => {
        console.error('There was an error!', error);
      }
    });
  }

    //SUB CATEGORIES


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

    //SECOND SUB CATEGORIES

  createSecondSubcategory(secondSubCategory: any){
    return this.http.post<any>(this.secondSubCategoryUrl, secondSubCategory).subscribe({
      next: data => {
        location.reload();
    },
    error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  searchSecondSubcategory(){
    return this.http.get<SecondSubCategory>(
      this.secondSubCategoryUrl
    );
  }

  //ARTICLES

  searchArticles(): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(
      this.articlesUrl
    );
  }

  createArticle(article: any){
    return this.http.post<any>(this.articlesUrl, article).subscribe({
      next: data => {        
        location.reload();
    },
    error: error => {
        console.error('There was an error!', error);
      }
    });
  }

}
