export interface ArticleDto {
    category: Category;
    subcategory: SubCategory;
    images?: string;
    text: string;
}

export interface Category {
    title: string;
    id?: string;
}

export interface SubCategory {
    category?: string;
    title: string;
    id?: string;
}