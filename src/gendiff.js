
import diffTree from './difftree.js';
import render from './render.js';

export default (obj1, obj2) => render(diffTree(obj1, obj2));
