export interface createtransationType {
    customer: string,
    purchasedProducts: [{
        price: number,
        product: string,
        quantity: string
    }],
    date: Date
}
export interface ITransation {
    _id: string;
    customer: {
        _id: string;
        fullname: string;
        email: string;
        image: string
    };
    date: string;
    purchasedProducts: {
        product: {
            _id: string;
            title: string;
            description: string;
            image: string,
            purchaseprice: number,
            sellprice: number
        };
        quantity: number;
        price: number;
    }[];
}

export type UpdateTransationType = {
    _id: string,
    customer?: string,
    purchasedProducts?: [{
        price: number,
        product: string,
        quantity: string
    }]
    date: Date
}

export type DeleteTransactionType = {
    id: string
}