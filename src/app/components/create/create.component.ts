import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import DataSource from 'devextreme/data/data_source';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { CachedResultsService } from 'src/app/services/cached-results.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ArticleDto, Category, SecondSubCategory, SubCategory } from '../models/article.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup({});
  subCategoryForm: FormGroup = new FormGroup({});
  secondSubCategoryForm: FormGroup = new FormGroup({})
  articleForm: FormGroup = new FormGroup({});

  article: ArticleDto[] = [];

  valueForEditableTextArea: string;
  eventValue: string;
  value: string;
  valueChangeEvents: any[];

  categories: any;
  subcategories: any;
  secondsubcategories: any;

  categoryDataSource: DataSource | undefined;
  newCategoryName: string = '';

  subCategoryDataSource: DataSource | undefined;
  newSubCategoryName: string = '';

  secondSubCategoryDataSource: DataSource | undefined;
  newSecondSubcategoryName: string = '';

  currentCategory: string = '';
  currentSubCategory: string = '';
  currentSecondSubCategory: string = '';

  currentText: string = '';

  constructor(
    private cachedResultsService: CachedResultsService,
    private httpApiService: HttpApiService
    ) {
   }

  ngOnInit() {
    this.createCategoryForm();
    this.createSubCategoryForm();
    this.createSecondSubCategoryForm();

    this.createCategoryDataSource();
    this.createSubCategoryDataSource();
    this.createSecondSubCategoryDataSource();
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

  // CREATE CATEGORIES, SUBCATEGORIES AND SECOND SUBCATEGORIES

  createNewCategory(){
    this.httpApiService.searchCategories().subscribe((categories: Category) => {
      this.categories = categories;      
      this.createNewCategoryBody(this.categories);
    })    
  }

  createNewCategoryBody(categories){
      categories.map((value) => {
        if( value.title === this.newCategoryName){
          console.log('Ya existe una categoria con ese nombre.');
        } else {
          const body = {
            title:  this.newCategoryName
          }
          JSON.stringify(body);
          this.httpApiService.createCategory(body);
        }
      })
  }



  createNewSubCategory(){
    this.httpApiService.searchSubCategories().subscribe((subcategories: SubCategory) => {
      this.subcategories = subcategories;
      this.createNewSubCategoryBody(this.subcategories);
    });
  }

  createNewSubCategoryBody(subcategories){
    if(this.currentCategory){
      subcategories.map((value) => {
        if( value.title === this.newSubCategoryName){
          console.log('Ya existe una sub categoria con ese nombre.');
        } else {
  
      const body = {
        category: this.currentCategory,
        title:  this.newSubCategoryName,
      }
      JSON.stringify(body);
      this.httpApiService.createSubCategory(body);
        }
      })
    } else {
      console.log('Selecciona una categoria');
    }


  }
  

  createNewSecondSubcategory(){  
    this.httpApiService.searchSecondSubcategory().subscribe((secondsubcategories: SecondSubCategory) => {
      this.secondsubcategories = secondsubcategories;
      this.createNewSecondSubCategoryBody(this.secondsubcategories);
    });
  }

  createNewSecondSubCategoryBody(secondsubcategories){
    if(this.currentCategory && this.currentSubCategory){
      secondsubcategories.map((value) => {
        if( value.title === this.newSecondSubcategoryName){
          console.log('Ya existe una sub categoria con ese nombre.');
        } else {

      const body = {
        category: this.currentCategory,
        subcategory: this.currentSubCategory,
        title:  this.newSecondSubcategoryName,
      }
      JSON.stringify(body);    
      this.httpApiService.createSecondSubcategory(body);
        }
      })
    } else {
      console.log('Selecciona una categoria y una subcategoria');
    }
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
    this.articleForm = new FormGroup({
      titleCategory: new FormControl(this.currentCategory, Validators.required),
      titleSubCategory: new FormControl(this.currentSubCategory, Validators.required),
      titleSecondSubCategory: new FormControl(this.currentSecondSubCategory),
      text: new FormControl(this.currentText, Validators.required),
      images: new FormControl('')
    });
    const newArticle = this.createNewArticle(this.articleForm.value);    
    this.httpApiService.createArticle(newArticle);
  }

  createNewArticle(e){
    const newArticle: ArticleDto = {
      category: e.titleCategory,
      subcategory: e.titleSubCategory,
      secondsubcategory : e.titleSecondSubCategory,
      text: e.text,
      images: e.images
    };
    return newArticle;
  }
  
}
