/* eslint-disable no-param-reassign */
// import CryptoJS from 'crypto-js';
import cryptoSha3 from 'crypto-js/sha3';

// const sha3 = (value:string, options?:any) => {
const sha3 = (value: string) => {
    // if (options && options.encoding === 'hex') {
    //     if (value.length > 2 && value.substr(0, 2) === '0x') {
    //         value = value.substr(2);
    //     }
    //     value = CryptoJS.enc.Hex.parse(value);
    // }
    return cryptoSha3(value, {
        outputLength: 256,
    }).toString();
};

/**
 * @description Checks if the given string is a checksummed address
 * @param address the given HEX adress
 */
const isChecksumAddress = (address: string) => {
    // Check each case
    address = address.replace('0x', '');
    const addressHash = sha3(address.toLowerCase());
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
        // eslint-disable-next-line max-len
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

/**
 * @description Checks if the given string is an address
 * @param address the given HEX adress
 */
export const isAddress = (address = '') => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    }
    // Otherwise check each case
    return isChecksumAddress(address);
};
