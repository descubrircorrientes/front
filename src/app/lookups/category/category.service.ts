import { Injectable } from '@angular/core';
import { SubCategory } from 'src/app/components/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private selectedItem: SubCategory;
  currentCategory: string;

  constructor(
  ) { }

  getSelectedItem(){
    return this.selectedItem;
  }

  setSeletedItem(subcategories: SubCategory) {
    this.selectedItem = subcategories;
  }

}
