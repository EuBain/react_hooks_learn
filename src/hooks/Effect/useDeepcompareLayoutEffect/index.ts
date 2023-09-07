import { createDeepCompareEffect } from "@/utils/createDeepCompareEffect";
import { useLayoutEffect } from "react";



export default createDeepCompareEffect(useLayoutEffect);