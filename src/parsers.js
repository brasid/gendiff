import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.decode,
};

export default (ext, obj) => parsers[ext](obj);
