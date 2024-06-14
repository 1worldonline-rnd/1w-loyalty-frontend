import ThirdPartyAuthenticator from '@1world/1w-third-party-authenticator';
import { AxiosResponseHeaders } from 'axios';

/**
 * @deprecated library `1w-third-party-authenticator` deprecated
 * for SSO without third-party cookies another solution is chosen
 * https://tokenworld.atlassian.net/browse/WO-3556
 */
export const toldOtherWindowsToAuthorize = (allHeaders: AxiosResponseHeaders) => {
    const headerKeys = ['refresh-token', 'x-auth-token', 'access-token'];

    ThirdPartyAuthenticator.instance.auth(
        headerKeys.reduce<Record<string, string>>((headers, key) => {
            if (allHeaders[key]) {
                headers[key] = allHeaders[key];
            }
            return headers;
        }, {})
    );
};
