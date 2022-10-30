import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from 'src/app/lookups/category/category.component';
import { CategoryService } from 'src/app/lookups/category/category.service';
import { ArticleService } from 'src/app/services/article.service';
import { HttpApiService } from 'src/app/services/http-api.service';
import { Category, SubCategory } from '../models/article.model';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: any;
  subCategories: any;
  articles: any;
  currentItem: any;

  panelOpenState = false;
  logoUrl = "./../assets/logo.png"

  constructor(
    private httpApiService: HttpApiService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { 
  }

  ngOnInit() {
    this.httpApiService.searchCategories().subscribe((categories: Category) => {
      this.categories = categories;
    })

    // this.httpApiService.searchArticles().subscribe((articles: ArticleDto) => {      
    //   this.articles = articles;  
    // });
  }

  // getCategories(){
  //   this.httpApiService.searchCategories().subscribe((categories: Category) => {
  //     this.categories = categories;
  //   });
  // }

  // getSubCategories(){
  //   this.httpApiService.searchSubCategories().subscribe((subCategories: SubCategory) => {
  //     this.subCategories = subCategories;
  //   });
  // }

  searchSubcategories(title: string): Promise<SubCategory> { 
    this.categoryService.currentCategory = title;
    return new Promise((resolve, reject) => {
      this.modalService.open(CategoryComponent, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' })
        .result.then(() => {
          const categoryItem = this.categoryService.getSelectedItem();
          this.currentItem = categoryItem;
          localStorage.setItem('currentArticle', JSON.stringify(this.currentItem));          
          this.router.navigate(['/article', this.currentItem._id], {relativeTo: this.activatedRoute});
          if (this.currentItem) {
            resolve(this.currentItem);
          } else {
            reject();
          }
        }, () => { });
    });
  }
    
}
