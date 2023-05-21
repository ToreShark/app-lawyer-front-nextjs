import { atomWithStorage } from "jotai/utils";
export const phoneLocalAtom = atomWithStorage<string>("phoneLocal", "");
export const lastTimeOtpAtom = atomWithStorage<number | undefined>('lastTimeOtp', undefined);
export const isSignInAtom = atomWithStorage<boolean>("isSignIn", false);
export const isSignUpAtom = atomWithStorage<boolean>("isSignUp", false);
export const redirectPath = atomWithStorage<string>("redirectPath", "");
