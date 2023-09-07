import { isBrowser } from "@/utils";
import createUseStorageState from "@/utils/createUseStorageState";


const useLocalStorageState = createUseStorageState(() => (isBrowser ? localStorage : undefined))

export default useLocalStorageState;