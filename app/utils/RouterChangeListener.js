import { hashHistory } from 'react-router';

let previousPath = '';
let currentPath = '';

export const startRouterChangeListener = () =>
  hashHistory.listen((event) => {
    previousPath = currentPath;
    currentPath = event.pathname;
  });

export const getCurrentPath = () => currentPath;
export const getPreviousPath = () => previousPath;

