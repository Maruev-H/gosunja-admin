import { UseMutationOptions } from "@tanstack/react-query";

export type UseMutationOptionsWithNoFn<RequestData, ResponseData = any> = Omit<
  UseMutationOptions<ResponseData, Error, RequestData, unknown>,
  "mutationFn"
>;
