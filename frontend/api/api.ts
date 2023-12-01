import { TUseQueryOptions } from "@/configs/reactQuery";
import { axios } from "@/configs/axios";
import {
  TGetTotalAmount,
  TGetTotalAmountResponse,
  TWithdrawsResponse,
} from "./type";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export const withdrawsQueryKeys = {
  fetchWithdraws: "fetchWithdraws",
};
export const fetchWithdraws = () =>
  axios.get("/withdraws").then((res) => res.data);

export const useFetchWithdraws = (
  config?: TUseQueryOptions<unknown, unknown, TWithdrawsResponse>
) =>
  useQuery({
    queryFn: fetchWithdraws,
    queryKey: [withdrawsQueryKeys.fetchWithdraws],
    ...config,
  });

export const fetchTotalAmount = (payload: TGetTotalAmount) =>
  axios.post("/totalAmount", payload).then((res) => res.data);

export const useGetTotalAmount = (
  config?: UseMutationOptions<TGetTotalAmountResponse, unknown, TGetTotalAmount>
) =>
  useMutation<TGetTotalAmountResponse, unknown, TGetTotalAmount>({
    mutationFn: fetchTotalAmount,
    ...config,
  });
