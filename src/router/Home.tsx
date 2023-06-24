import React, { lazy } from "react"

import Home from "@/page/Home"
import { Navigate } from "react-router-dom"

export const HomeRoutes = [
    {
        name: '主页',
        path: '/',
        element: <Navigate to='/home'/>,
    },
    {
        name: '主页',
        path: '/home',
        element:  < Home />,
    },
]