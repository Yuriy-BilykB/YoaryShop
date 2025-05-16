export interface ICategories {
    id: number;
    name: string;
    parent_id: number | null;
    subcategories?: ICategories[];
    slug: string;
}
