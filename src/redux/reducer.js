import produce from "immer"
import { SET_CUR_PAGE, SET_CUR_STEP, SET_SELECTED_EMP,SET_EMP_DATA } from "./actionTypes";
const initial={
    employees:[],//list of employees
    cur_page:'list',//to dicide page
    selected_employee:null,//to perform add edit
    cur_step:0
};

export default function mainReducer(state=initial,action){
    switch(action.type){
        case SET_CUR_PAGE:
            return produce(state, draft => {
                draft.cur_page=action.payload;
            });
        case SET_CUR_STEP:
            return produce(state, draft => {
                draft.cur_step =action.payload;
            });
        case SET_SELECTED_EMP:
            return produce(state, draft => {
                draft.selected_employee = action.payload;
            });

        case SET_EMP_DATA:
            return produce(state, draft => {
                draft.selected_employee[action.payload.name] = action.payload.value;
            });
    }
    return state;
}