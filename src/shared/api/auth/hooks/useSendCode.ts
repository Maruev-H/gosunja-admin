import { UseMutationOptionsWithNoFn } from "@/shared/types/ReactQueryTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";

export type RequestData = {
  phone: string;
};

export const useSendCode = (
  config?: UseMutationOptionsWithNoFn<RequestData>
) =>
  useMutation({
    ...config,
    mutationFn: sendCode,
  });

const sendCode = async ({ phone }: RequestData) => {
  const response = await api.post("auth/send-otp", { phone });
  return response.data;
};
