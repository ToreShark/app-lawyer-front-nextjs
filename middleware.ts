import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // console.log("isAuth?", req.cookies.has("accessToken"));
    // const res = NextResponse.next();
    // res.cookies.set("accessToken", "", { expires: new Date(0) });
    // return res;
  }
  
  // export const config = {
  //   matcher: "/",
  // };
  