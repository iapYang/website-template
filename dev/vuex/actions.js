import * as types from './mutation-types';

export function setCount({dispatch}, value){
    dispatch(types.SETCOUNT, value);
}
