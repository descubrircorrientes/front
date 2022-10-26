import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { CachedResultsService } from 'src/app/services/cached-results.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ArticleDto, Category, SecondSubCategory, SubCategory, TabConfig } from '../models/article.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  isMultiline = true;
  valueContent: string;
  textArticle: string;

  tabs: TabConfig[];
  currentTab: string[];

  categoryForm: FormGroup = new FormGroup({});
  subCategoryForm: FormGroup = new FormGroup({});
  secondSubCategoryForm: FormGroup = new FormGroup({})
  articleForm: FormGroup = new FormGroup({});

  article: ArticleDto[] = [];

  valueForEditableTextArea: string;
  eventValue: string;
  value: string;
  valueChangeEvents: any[];

  categories: any = [];
  subcategories: any = [];
  secondsubcategories: any = [];

  categoryDataSource: DataSource | undefined;
  newCategoryName: string = '';

  subCategoryDataSource: DataSource | undefined;
  newSubCategoryName: string = '';

  secondSubCategoryDataSource: DataSource | undefined;
  newSecondSubcategoryName: string = '';

  textDataSource: DataSource | undefined

  currentCategory: string = '';
  currentSubCategory: string = '';
  currentSecondSubCategory: string = '';

  currentText: string = '';

  constructor(
    private cachedResultsService: CachedResultsService,
    private httpApiService: HttpApiService,
    private articleService: ArticleService
    ) {
      this.tabs = articleService.getTabsData();
      this.currentTab = this.tabs[2].value;
   }

  ngOnInit() {
    this.createCategoryForm();
    this.createSubCategoryForm();
    this.createSecondSubCategoryForm();

    this.createCategoryDataSource();
    this.createSubCategoryDataSource();
    this.createSecondSubCategoryDataSource();
    this.createTextDataSource();
  }

  // CATEGORY, SUBCATEGORY AND SECOND SUBCATEGORI FORM

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

  createSecondSubCategoryForm(){
    this.secondSubCategoryForm = new FormGroup({
      titleSecondSubCategory: new FormControl('', Validators.required)
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
  
  createSecondSubCategoryDataSource(){
    this.secondSubCategoryDataSource = new DataSource({
      loadMode: 'raw',
      byKey: (key) => {
        return key;
      },
      load: () => {
        return firstValueFrom(this.cachedResultsService.searchSecondSubCategoriesFromCache());
      }
    })
  }

  createTextDataSource(){
    const text = [
          {
          title: '',
          paragraph: ''
        }
      ]
      const textStore = new ArrayStore({
        data: text
      });
      this.textDataSource = new DataSource({
        store: textStore
      });
      
      // loadMode: 'raw',
      // byKey: (key) => {
      //   return key;
      // },
      // load: () => {
      //   const text = [
      //     {
      //     title: '',
      //     paragraph: ''
      //   }
      // ]
      //   return text;
      // }
    // })
  }

  // CREATE CATEGORIES, SUBCATEGORIES AND SECOND SUBCATEGORIES

  createNewCategory(){
    this.httpApiService.searchCategories().subscribe((categories: Category) => {
      this.categories = categories;      
      this.createNewCategoryBody(this.categories);
    })    
  }

  createNewCategoryBody(categories){
      const values = categories.find(value => value.title === this.newCategoryName);
      if(values){
        alert('Ya existe una categoria con ese nombre.');
        return;
        } 
      const body = {
        title:  this.newCategoryName
      }
      JSON.stringify(body);
      this.httpApiService.createCategory(body);
}

  createNewSubCategory(){
    this.httpApiService.searchSubCategories().subscribe((subcategories: SubCategory) => {
      this.subcategories = subcategories;
      this.createNewSubCategoryBody(this.subcategories);
    });
  }

  createNewSubCategoryBody(subcategories){
    const values = subcategories.find(value => value.title === this.newSubCategoryName);
    if(values){
      alert('Ya existe una sub categoria con ese nombre.');
      return;
      } 
      const body = {
        category: this.currentCategory,
        title:  this.newSubCategoryName,
      }
      JSON.stringify(body);
      this.httpApiService.createSubCategory(body);
 
  }
  

  createNewSecondSubcategory(){  
    this.httpApiService.searchSecondSubcategory().subscribe((secondsubcategories: SecondSubCategory) => {
      this.secondsubcategories = secondsubcategories;
      this.createNewSecondSubCategoryBody(this.secondsubcategories);
    });
  }

  createNewSecondSubCategoryBody(secondsubcategories){
    const values = secondsubcategories.find(value => value.title === this.newSecondSubcategoryName);
    if(values){
      alert('Ya existe una segunda sub categoria con ese nombre.');
      return;
      } 
      const body = {
        category: this.currentCategory,
        subcategory: this.currentSubCategory,
        title:  this.newSecondSubcategoryName,
      }
      JSON.stringify(body);    
      this.httpApiService.createSecondSubcategory(body);
  }

// SELECT OPTIONS

  onCategoryChange(e: any){
    this.currentCategory = e.value.title;
  }

  onSubCategoryChange(e: any){
    this.currentSubCategory = e.value.title;
  }

  onSecondSubCategoryChange(e: any){
    this.currentSecondSubCategory = e.value.title;
  }

  createArticleForm(){
    console.log(typeof(this.textArticle));
    
    this.articleForm = new FormGroup({
      titleCategory: new FormControl(this.currentCategory, Validators.required),
      titleSubCategory: new FormControl(this.currentSubCategory, Validators.required),
      titleSecondSubCategory: new FormControl(this.currentSecondSubCategory),
      // text: new FormArray([
      //     new FormControl(this.textDataSource.items())
      // ]),
      text: new FormControl(this.textArticle),
      images: new FormControl('')
    });    
    const newArticle = this.createNewArticle(this.articleForm.value);
    console.log('new',newArticle);
     
    this.httpApiService.createArticle(newArticle);
  }

  createNewArticle(e){
    const newArticle: ArticleDto = {
      category: e.titleCategory,
      subcategory: e.titleSubCategory,
      secondsubcategory : e.titleSecondSubCategory,
      // text: e.text[0],
      text: e.text,
      images: e.images
    };
    return newArticle;
  }

  initNewRow(e){
    console.log(e);
  }
  
}
