import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export const authAtom = atom({
  isAuthenticated: false,
  authToken: "",
  refreshToken: "",
  userId: "",
});