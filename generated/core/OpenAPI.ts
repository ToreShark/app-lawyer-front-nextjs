/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import Cookies from "js-cookie";
import type { ApiRequestOptions } from "./ApiRequestOptions";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string | undefined>;


export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: "include" | "omit" | "same-origin";
  TOKEN?: string | Resolver<string>;
  USERNAME?: string | Resolver<string>;
  PASSWORD?: string | Resolver<string>;
  HEADERS?: Headers | Resolver<Headers>;
  ENCODE_PATH?: (path: string) => string;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: "http://localhost:3000",
  VERSION: "1.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};

OpenAPI.HEADERS = async () => {
  const token = Cookies.get("accessToken");
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};
