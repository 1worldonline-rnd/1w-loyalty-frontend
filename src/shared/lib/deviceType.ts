export const getDeviceType = () => {
    // eslint-disable-next-line max-len
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return isMobile ? 'mobile' : 'desktop';
};
