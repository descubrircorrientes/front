import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of, switchMap, tap } from 'rxjs';
import { ArticleComponent } from '../article/article.component';
import { ArticleDto, Category, SecondSubCategory, SubCategory } from '../components/models/article.model';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class CachedResultsService {
  categories: Category[];
  subCategories: SubCategory[];

  constructor(
    private httpApiService: HttpApiService
  ) {
    this.categories = [];
    this.subCategories = [];
   }

  searchCategoriesFromCache(): Observable<Category> {
    return this.httpApiService.searchCategories();
  }

  searchSubCategoriesFromCache(): Observable<SubCategory> {
    return this.httpApiService.searchSubCategories();
  }

  searchSecondSubCategoriesFromCache(): Observable<SecondSubCategory> {
    return this.httpApiService.searchSecondSubcategory();
  }

  searchArticlesFromCache(): Observable<ArticleDto> {
    return this.httpApiService.searchArticles();
  }

}
