export interface ArticleDto {
    category: Category;
    subcategory?: SubCategory;
    secondsubcategory?: string;
    images?: string;
    text: string;
    // text: [{
    //     paragraph: string;
    //     title: string;
    // }];
}

export interface Category {
    title: string;
    id?: string;
}

export interface SubCategory {
    category: string;
    secondSubcategory?: SecondSubCategory;
    title: string;
    id?: string;
}

export interface SecondSubCategory {
    category: string;
    subcategory: string;
    title: string;
    id?: string;
}

export interface TabConfig {
    name: string;
    value: string[];
  }