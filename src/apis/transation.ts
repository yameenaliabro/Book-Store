import { DeleteTransactionType, ITransation, UpdateTransationType, createtransationType, } from "@src/types";
import axios from "@src/utils/axios";
import { useMutation, useQuery, } from "@tanstack/react-query";

export const UseCreateTransation = () => useMutation<void, string, createtransationType>({
    mutationFn: async (props) => await axios.post("/transaction", props)
})

export const UseDelteTransation = () => useMutation<void, string, DeleteTransactionType>({
    mutationFn: async (props) => await axios.delete("/transaction", { params: props })
})

export const UseUpdateTransation = () => useMutation<void, string, UpdateTransationType>({
    mutationFn: async ({ _id, ...rest }) => await axios.patch("/transaction", rest, { params: _id })
})

export const UseGeTransation = () => useQuery<ITransation[], string>({
    queryKey: ["trnasaction"],
    queryFn: async () => (await axios.get("/transaction")).data
})

