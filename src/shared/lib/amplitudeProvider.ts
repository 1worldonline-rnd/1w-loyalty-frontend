import amplitude from 'amplitude-js';

export let loyaltyAmplitude: amplitude.AmplitudeClient;

export const amplitudeInit = () => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY_LOYALTY_MEMBER) {
        loyaltyAmplitude = amplitude.getInstance();
        loyaltyAmplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY_LOYALTY_MEMBER, undefined, {
            storage: 'localStorage',
            includeReferrer: true,
            includeUtm: true,
        });
    }
};

export const amplitudeLogEvent = (event: string, data: object) => {
    if (loyaltyAmplitude) loyaltyAmplitude.logEvent(event, data);
};

export const amplitudeDeviceId = () => {
    return loyaltyAmplitude ?
        loyaltyAmplitude.getDeviceId() ||
        (loyaltyAmplitude.options && loyaltyAmplitude.options.deviceId) ||
        null :
        null;
};

export const getLoyaltyAmplitudeDeviceId = (): Record<string, string> => {
    const deviceIdOpt: string | null = amplitudeDeviceId();
    return deviceIdOpt !== null ? { 'X-Edi': deviceIdOpt } : {};
};
