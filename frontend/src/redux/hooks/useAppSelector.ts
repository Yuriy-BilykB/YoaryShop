import {useSelector} from "react-redux";
import {store} from "@/redux/store/store";
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();