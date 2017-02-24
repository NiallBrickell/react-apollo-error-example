export const SET_SEARCH = 'SET_SEARCH';

export function setSearch(str) {
  return {
    type: SET_SEARCH,
    str,
  };
}
