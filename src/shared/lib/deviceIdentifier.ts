import { isAvailableLocalStorage } from './isAvailableLocalStorage';
import { AxiosResponseHeaders } from 'axios';

export const get1WDeviceIdentifier = (): Record<string, string> => {
    const deviceIdentifier: string | null = isAvailableLocalStorage()
        ? localStorage.getItem('1w_device_identifier')
        : null;
    return deviceIdentifier !== null ? { 'Device-Identifier': deviceIdentifier } : {};
};

export const set1WDeviceIdentifier = (headers: AxiosResponseHeaders) => {
    const deviceIdentifier = headers['device-identifier'];
    if (deviceIdentifier && isAvailableLocalStorage()) {
        localStorage.setItem('1w_device_identifier', deviceIdentifier);
    }
};
