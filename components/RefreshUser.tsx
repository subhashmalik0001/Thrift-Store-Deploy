"use client";

import { BACKEND_URL } from "@/config/config";
import { clearUser, setUser } from "@/store/auth-slice";
import { useAppDispatch } from "@/store/hooks";
import axios from "axios";
import { useEffect } from "react";

export function RefreshUser() {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        const refreshUser = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/auth/verify`, {
                    withCredentials : true,
                });
                
            } catch (error) {
                console.log(error);
                
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                dispatch(clearUser());
            }
        }
        refreshUser();
    },[])
    return null;
}