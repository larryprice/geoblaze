import parseGeoraster from 'georaster';
import axios from 'axios';
import cache from '../cache';

export default url => {
  return axios.get(url, { responseType: 'arraybuffer' }).then(response => {
    return Buffer.from(response.data);
  }).then(b => {
    const arrayBuffer = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
    return parseGeoraster(arrayBuffer);
  }).then(georaster => {
    cache[url] = georaster;
    return georaster;
  }).catch(err => {
    throw err;
  });
};
