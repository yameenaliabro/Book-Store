export type ICustomer = {
    _id: string,
    email: string,
    fullname: string,
    phonenumber: string,
    address: string,
    user: string,
    updatedAt: string;
    image: string
}

export type CreateCustomerProps = {
    email: string,
    fulname: string,
    phonenumber: number,
    address: string,
    image: string
}

export type GetCustomerType = {
    id?: string
}

export type UpdateCustomerType = {
    id: string,
    email?: string,
    fullname?: string,
    address?: string,
    phonenumber?: number,
    image?: string
}

export type DeleteCustomerType = {
    id: string
}

export type CustomerDetail = {
    id?: string
}