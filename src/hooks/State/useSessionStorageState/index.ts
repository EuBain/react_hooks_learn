import { isBrowser } from "@/utils";
import createUseStorageState from "@/utils/createUseStorageState";



const useSessionStorageState = createUseStorageState(() => isBrowser ? sessionStorage : undefined)

export default useSessionStorageState;