import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDto } from '../components/models/article.model';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-current-article',
  templateUrl: './current-article.component.html',
  styleUrls: ['./current-article.component.scss']
})
export class CurrentArticleComponent implements OnInit {

  article: any;

  constructor(
    private httpApiService: HttpApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpApiService.searchArticles().subscribe((articles: ArticleDto) => {
        let articlesQuantity = Object.create(articles).length;
        let random = Math.floor(Math.random()*(articlesQuantity - 1) + 1);
        this.article = articles[random];
        this.article.text.slice(0, 10);
        console.log(this.article);
                
    });
  }

  readMore(){
    this.router.navigate(['/article', this.article._id]);
  }

}
