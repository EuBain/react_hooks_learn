import React, { lazy } from "react"

const Mark = lazy(() => import('@/page/Mark'))

export const MarkRoutes = [
    {
        name: '文档',
        path: '/mark',
        element: <Mark/>,
    },
]