export interface IProduct {
    _id: string;
    user: string;
    title: string;
    description: string;
    updatedAt: string;
    image: string,
    price: number,
    rating: number
}

export type GetProductType = {
    id?: string
}

export type EditProductType = {
    id: string,
    title?: string;
    description?: string;
    image?: string,
    price?: number,
    rating?: number
}

export type CreateProductType = {
    title: string,
    description: string,
    price: number,
    rating: number,
    image: string,
}

export type DeleteProductType = {
    id: string
}