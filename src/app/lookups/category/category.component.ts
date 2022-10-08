import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { firstValueFrom } from 'rxjs';
import { CachedResultsService } from 'src/app/services/cached-results.service';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource: DataSource;
  searchText: string;
  categoryName: string;

  constructor(
    private activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private cachedResultsService: CachedResultsService
  ) { 
  }

  ngOnInit(): void {
    this.createDatasource();
    this.categoryName = this.categoryService.currentCategory;

  }

  onRowClick(e: any) {
    if (e) {
      this.categoryService.setSeletedItem(e.data);
    }
  }

  onRowDblClick(e: any) {
    if (e) {
      this.categoryService.setSeletedItem(e.data);
      this.activeModal.close();
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

  createDatasource(){
    this.dataSource = new DataSource({
      loadMode: 'raw',
      filter: [ "category", "=", this.categoryService.currentCategory ],
      byKey: (key) => {
        return key;
      },
      load: () => {
        return firstValueFrom(this.cachedResultsService.searchArticlesFromCache());
      }
    })
  }
}
