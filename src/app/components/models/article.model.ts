export interface ArticleDto {
    category: Category;
    subcategory?: SubCategory;
    secondsubcategory?: string;
    images?: string;
    text: string;
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