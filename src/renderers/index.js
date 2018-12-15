import standartRender from './standartRenderer';
import plainRender from './plainRenderer';
import jsonRender from './jsonRenderer';

const renderers = {
  standart: standartRender,
  plain: plainRender,
  json: jsonRender,
};

export default (ast, outFormat) => renderers[outFormat](ast);
