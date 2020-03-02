import { SET_TITLE, SET_LIST } from '../actions/actions';

export interface IItem {
    id: string,
    value: string,
    isDone: boolean
}

export interface IState {
    title: string,
    itemList: IItem[]
}

export interface IAction {
    type: string,
    payload: string | IItem[]
}

const initialState = {
    title: '',
    itemList: []
} as IState;

export const reducer = (state: IState = initialState, action: IAction): IState => {
    switch (action.type) {
        case SET_TITLE: {
            return {
                ...state,
                title: action.payload as string
            };
        }
        case SET_LIST: {
            return {
                ...state,
                itemList: action.payload as IItem[]
            };
        }
        default:
            return state;
    }
}