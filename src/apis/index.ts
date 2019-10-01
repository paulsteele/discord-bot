import Api from '../Api';

import Test from './Test';

function getApis(): Api[] {
  return [
    new Test()
  ];
}

export default getApis;
