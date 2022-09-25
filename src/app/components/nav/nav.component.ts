import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiService } from 'src/app/services/http-api.service';
import { ArticleDto, Category, SubCategory } from '../models/article.model';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: any;
  subCategories: any;
  articles: any;

  panelOpenState = false;
  logoUrl = "./../assets/logo.png"

  constructor(
    private httpApiService: HttpApiService
  ) { }

  ngOnInit() {
    // this.getCategories();
    // this.getSubCategories();
    this.getAllArticles();
  }

  getCategories(){
    this.httpApiService.searchCategories().subscribe((categories: Category) => {
      this.categories = categories;
    });
  }

  getSubCategories(){
    this.httpApiService.searchSubCategories().subscribe((subCategories: SubCategory) => {
      this.subCategories = subCategories;
      console.log(this.subCategories);
    });
    
  }

  getAllArticles(){
    this.httpApiService.searchArticles().subscribe((articles: ArticleDto) => {
      this.articles = articles;
    });
    
  }

}
