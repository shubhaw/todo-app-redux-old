import { IAction, IItem } from '../reducers/reducer';

export const SET_TITLE: string = 'SET_TITLE';
export const SET_LIST: string = 'SET_LIST';

export function setTitle(title: string): IAction {
    return {
        type: SET_TITLE,
        payload: title
    }
}

export function setList(list:IItem[]): IAction {
    return {
        type: SET_LIST,
        payload: list
    }
}