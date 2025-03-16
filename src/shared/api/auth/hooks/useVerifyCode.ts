import { UseMutationOptionsWithNoFn } from "@/shared/types/ReactQueryTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { VerifyCodeResponse } from "../types";

type RequestData = {
  phone: string | number;
  otp: string | number;
};

export const useVerifyCode = (
  config?: UseMutationOptionsWithNoFn<RequestData, VerifyCodeResponse>
) =>
  useMutation({
    ...config,
    mutationFn: verifyCode,
  });

const verifyCode = async ({
  phone,
  otp,
}: {
  phone: string | number;
  otp: string | number;
}) => {
  const response = await api.post<VerifyCodeResponse>("auth/verify-otp", {
    phone,
    otp,
  });
  return response.data;
};
