import standartRender from './standartRenderer';
import plainRender from './plainRenderer';

const renderers = {
  standart: standartRender,
  plain: plainRender,
};

export default (ast, outFormat) => renderers[outFormat](ast);
