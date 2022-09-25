import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import DataSource from 'devextreme/data/data_source';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { CachedResultsService } from 'src/app/services/cached-results.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ArticleDto } from '../models/article.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup({});
  subCategoryForm: FormGroup = new FormGroup({});
  articleForm: FormGroup = new FormGroup({});
  article: ArticleDto[] = [];

  valueForEditableTextArea: string;
  eventValue: string;
  value: string;
  valueChangeEvents: any[];

  categoryDataSource: DataSource | undefined;
  newCategoryName: string = '';

  subCategoryDataSource: DataSource | undefined;
  newSubCategoryName: string = '';

  currentCategory: string = '';
  currentSubCategory: string = '';
  currentText: string = '';

  constructor(
    private cachedResultsService: CachedResultsService,
    private httpApiService: HttpApiService
    ) {
   }

  ngOnInit() {
    this.createCategoryForm();
    this.createSubCategoryForm();

    this.createCategoryDataSource();
    this.createSubCategoryDataSource();
  }



  // CATEGORY AND SUBCATEGORY FORM

  createCategoryForm(){
    this.categoryForm = new FormGroup({
      titleCategory: new FormControl('', Validators.required)
    });
  }

  createSubCategoryForm(){
    this.subCategoryForm = new FormGroup({
      titleSubCategory: new FormControl('', Validators.required)
    });
  }

  // DATA SOURCE

  createCategoryDataSource(){
    this.categoryDataSource = new DataSource({
      loadMode: 'raw',
      byKey: (key) => {
        return key;
      },
      load: () => {
        return firstValueFrom(this.cachedResultsService.searchCategoriesFromCache());
      }
    })
  }

  createSubCategoryDataSource(){
    this.subCategoryDataSource = new DataSource({
      loadMode: 'raw',
      byKey: (key) => {
        return key;
      },
      load: () => {
        return firstValueFrom(this.cachedResultsService.searchSubCategoriesFromCache());
      }
    })
  }

  // CREATE CATEGORIES AND SUBCATEGORIES

  createNewCategory(){
    console.log(this.newCategoryName);
    const body = {
      title:  this.newCategoryName
    }
    JSON.stringify(body);
    // console.log(body);
    this.httpApiService.createCategory(body);
  }

  createNewSubCategory(){
    const body = {
      category: this.currentCategory,
      title:  this.newSubCategoryName
    }
    JSON.stringify(body);
    this.httpApiService.createSubCategory(body);
  }

// SELECT OPTIONS

  onCategoryChange(e: any){
    this.currentCategory = e.value.title;
  }

  onSubCategoryChange(e: any){
    this.currentSubCategory = e.value.title;
  }

  createArticleForm(){
    this.articleForm = new FormGroup({
      titleCategory: new FormControl(this.currentCategory, Validators.required),
      titleSubCategory: new FormControl(this.currentSubCategory, Validators.required),
      text: new FormControl(this.currentText, Validators.required),
      images: new FormControl('')
    });


    const newArticle = this.createNewArticle(this.articleForm.value);    
    this.httpApiService.createArticle(newArticle);
  }

createNewArticle(e){
  console.log('form', e);
  
  const newArticle: ArticleDto = {
    category: e.titleCategory,
    subcategory: e.titleSubCategory,
    text: e.text,
    images: e.images
  };
  return newArticle;
  }
  
}
