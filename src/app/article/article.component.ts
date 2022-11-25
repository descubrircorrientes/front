import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from '../components/models/article.model';
import { HttpApiService } from '../services/http-api.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleParams: any;
  articles: ArticleDto[];
  article: any;
  currentItem: any;

  constructor(
    private routes: ActivatedRoute,
    private httpApiService: HttpApiService,
  ) {
    this.routes.params.subscribe(() => {
      this.article = JSON.parse(localStorage.getItem('currentArticle'));
    });
  }

  ngOnInit() {
  }

  delete(){
    console.log(this.article._id);
    this.httpApiService.deleteArticle(this.article._id)
  }

  deleteAlertConfirmation(){
    swal.fire({
      position: 'center',
      title: 'Confirmar',
      text: 'Desea eliminar este articulo? El cambio es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI, eliminar.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete();
        swal.fire(
          'Eliminado!',
          'El artículo se eliminó.',
          'success'
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Item is safe.)',
          'error'
        )
      }
    })
  }
}
