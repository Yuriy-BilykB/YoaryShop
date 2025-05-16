import {useDispatch} from "react-redux";
import {store} from "@/redux/store/store";
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();