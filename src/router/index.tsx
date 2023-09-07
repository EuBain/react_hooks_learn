import { HomeRoutes, } from "./Home";
import {  Navigate  } from 'react-router-dom';
import { MarkRoutes } from "./Mark";

export const routes = [
    ...HomeRoutes,
    ...MarkRoutes,
]