/**
 *  Javascript alphaID
 *
 *  Usage:
 *    const str = encode(9007199254740989); // str = 'fE2XnNGpF'
 *    const id = decode('fE2XnNGpF'); // id = 9007199254740989;
 **/

const bcpow = (_a, _b) => Math
  .floor(Math.pow(parseFloat(_a), parseInt(_b)));

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const reverse = _string => _string.split('').reverse().join('');

const encode = _number => {
  if('undefined' == typeof _number){
    return null;
  }
  else if('number' != typeof(_number)){
    throw new Error('Wrong parameter type');
  }

  let ret = '';

  for(let i=Math.floor(Math.log(parseInt(_number))/Math.log(alphabet.length));i>=0;i--){
    ret = ret
        + alphabet.substr((Math.floor(parseInt(_number)
        / bcpow(alphabet.length, i)) % alphabet.length),1);
  }

  return reverse(ret);
};


const decode = _string => {
  if('undefined' == typeof _string){
    return null;
  }
  else if('string' != typeof _string){
    throw new Error('Wrong parameter type');
  }

  const str = reverse(_string);
  let ret = 0;

  for(let i=0;i<=(str.length - 1);i++){
    ret = ret
        + alphabet.indexOf(str.substr(i,1))
        * (bcpow(alphabet.length, (str.length - 1) - i));
  }

  return ret;
};

module.exports = {
  encode,
  decode
}

