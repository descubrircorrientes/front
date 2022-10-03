import { Component, Input } from '@angular/core';
import { ArticleDto } from './components/models/article.model';
import { ArticleService } from './services/article.service';
import { HttpApiService } from './services/http-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'descubrir-corrientes';

  constructor(
  ){
  }

  getAllArticles(){
  }
}
