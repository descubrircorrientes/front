import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { IndexComponent } from './components/index/index.component';
import { InfoComponent } from './components/info/info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { 
  DxCheckBoxModule, 
  DxDataGridModule, 
  DxTextBoxModule, 
  DxDateBoxModule, 
  DxSelectBoxModule, 
  DxTextAreaModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './lookups/category/category.component';
import { SubcategoryComponent } from './lookups/subcategory/subcategory.component';
import { ArticlesComponent } from './lookups/articles/articles.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    InfoComponent,
    IndexComponent,
    CreateComponent,
    ArticleComponent,
    CategoryComponent,
    SubcategoryComponent,
    ArticlesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    DxCheckBoxModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxTextAreaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
