// Property 'timeout' was updated. From 50 to 20
// Property 'proxy' was removed
// Property 'common.setting4' was removed
// Property 'common.setting5' was removed
// Property 'common.setting2' was added with value: 200
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'common.sites' was added with value: 'hexlet.io'
// Property 'group1.baz' was updated. From 'bars' to 'bas'
// Property 'group3' was removed
// Property 'verbose' was added with value: true
// Property 'group2' was added with value: [complex value]<Up>

// findFilesByName.js
// const findFilesByName = (root, substr) => {
//   const iter = (n, ancestry, acc) => {
//     const newAncestry = path.join(ancestry, n.name);
//     if (n.type === 'file') {
//       return n.name.includes(substr) ? [...acc, newAncestry] : acc;
//     }
//     return n.children.reduce((cAcc, nn) => iter(nn, newAncestry, cAcc), acc);
//   };
//
//   return iter(root, '', []);
// };
// export default findFilesByName;

import _ from 'lodash';
import path from 'path';

const typeActions = {
  changed: (name, content) => `Property '${name}' was updated. From ${content.old} to ${cotent.new}`,
  deleted: (name) => `Property '${name}' was removed`,
  added: (name, content) => `Property '${name}' was added with value: ${content},
  };
