import { CreateCustomerProps, CustomerDetail, DeleteCustomerType, ICustomer, UpdateCustomerType } from "@src/types";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UseGetCustomer = () => useQuery<ICustomer[], string>({
    queryKey: ["customers"],
    queryFn: async () => (await axios.get("/customers")).data
})

export const UseCustomerDeatail = (props: CustomerDetail) => {
    const { id } = props || {}
    return useQuery<ICustomer, string>({
        queryFn: async () => (await axios.get("/customers", { params: id })).data
    })
}

export const UseCreateCustomer = () => useMutation<void, string, CreateCustomerProps>({
    mutationFn: async (props) => await axios.post("/customers", props)
})

export const UseDeleteCustomer = () => useMutation<void, string, DeleteCustomerType>({
    mutationFn: async (props) => axios.delete("/customers", { params: props })
})

export const UseEditCustomer = () => useMutation<void, string, UpdateCustomerType>({
    mutationFn: async ({ id, ...rest }) => await axios.patch("/customers", rest, { params: { id } })
})