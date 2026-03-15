import { RootState } from "../store";
export const selecFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;