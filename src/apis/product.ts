import { CreateProductType, DeleteProductType, EditProductType, GetProductDetailType, IProduct } from "@src/types";
import axios from "@src/utils/axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const UseGetProduct = () => useQuery<IProduct[], string>({
    queryKey: ["products"],
    queryFn: async () => (await axios.get("/products")).data
})

export const UseProductDeatail = (props: GetProductDetailType) => {
    const { id } = props || {}
    return useQuery<IProduct, string>({
        queryKey: ["products", id],
        queryFn: async () => (await axios.get("/products", { params: id })).data

    })
}

export const UseCreateProduct = () => useMutation<void, string, CreateProductType>({
    mutationFn: async (props) => await axios.post("/products", props)
})

export const UseDeleteProduct = () => useMutation<void, string, DeleteProductType>({
    mutationFn: async (props) => await axios.delete("/products", { params: props })
})

export const UseEditProduct = () => useMutation<void, string, EditProductType>({
    mutationFn: async ({ _id, ...rest }) => await axios.patch("/products", rest, { params: { _id } }),

})
