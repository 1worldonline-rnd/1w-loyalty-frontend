const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_PORTAL_URL } = process.env;
class LoyaltyWidgetConstructor {
    apiUrl = NEXT_PUBLIC_API_URL;
    iframe = null;
    solutionLocalStorageKey = '1WO_UserDataStorageSolution';

    async #renderWidget() {
        const iframeWrapper = document.getElementById('1WOLPWID'); // 1WOLPWID = 1World Online Loyalty platform widget ID
        // if page doesn't have wrapper for iframe
        if (!iframeWrapper) {
            // exit for function with failed status
            return 0;
        }
        const { loyaltyWidgetId, token } = iframeWrapper.dataset;

        const response = await fetch(`${NEXT_PUBLIC_API_URL}loyalty/widget/tracker/${loyaltyWidgetId}`, {
            method: 'POST',
        });

        if (response.status !== 200) {
            return 0;
        }
        const { locale = 'en' } = await response.json();

        const iframe = document.createElement('iframe');

        this.iframe = iframe;

        const iframeName = `1wo-${loyaltyWidgetId}`;
        // set name
        iframe.name = iframeName;
        // base css of iframe
        iframe.style.cssText = 'width: 100%;height: 600px;border: none';
        // create src of iframe
        const iframeSrc = new URL(`/loyalty/${locale}/earn`, NEXT_PUBLIC_PORTAL_URL);
        // set necessary get parameters
        iframeSrc.searchParams.set('loyaltyWidgetId', loyaltyWidgetId);
        // the widget needs a location to know on which page it was integrated
        iframeSrc.searchParams.set('location', window.location.href);
        // tell the name of iframe
        iframeSrc.searchParams.set('iframeName', iframeName);
        // if the embed code with the token
        // needs to be forwarded to the widget
        if (token) {
            iframeSrc.searchParams.set('token', token);
        }
        // getting url param from url called `utm_medium`
        let utmMedium = null;

        const urlSearchParams = new URLSearchParams(window.location.search);
        const utmMediumFromLocalStorage = localStorage.getItem('1wo-utm-medium');

        if (urlSearchParams.has('utm_medium')) {
            utmMedium = urlSearchParams.get('utm_medium');
            localStorage.setItem('1wo-utm-medium', utmMedium);
        } else if (utmMediumFromLocalStorage) {
            utmMedium = utmMediumFromLocalStorage;
        }
        // set utm medium if exists
        if (utmMedium) {
            iframeSrc.searchParams.set('utmMedium', utmMedium);
        }
        // set src
        iframe.src = iframeSrc;
        // set permissions policy 
        iframe.allow = 'clipboard-read; clipboard-write';

        iframeWrapper.style.cssText = 'height: 100%;display: flex;width: 100%';
        iframeWrapper.appendChild(iframe);

        this.#initListeners();
    }

    #initListeners() {
        const self = this;
        // listen height changing of iframe
        window.addEventListener('message', (message) => {
            try {
                const parsedData = JSON.parse(message.data);

                if (parsedData.message === 'loyalty-widget-height-changed') {
                    const iframeHeight = Number.parseInt(self.iframe.getBoundingClientRect().height, 10);

                    if (iframeHeight !== parsedData.payload) {
                        self.iframe.style.minHeight = `${parsedData.payload}px`;
                    }
                }

                // Listen for the custom message that signifies the modal is being opened.
                if (parsedData.message === 'modal-open') {
                    // Scroll the iframe into view.
                    self.iframe.scrollIntoView();
                }
            } catch (e) {
                console.warn('Unidentified message type: ', e);
            }
        });
    }

    #switchTheme(newTheme) {
        this.iframe.contentWindow.postMessage({ theme: newTheme }, '*');
        window.dispatchEvent(new CustomEvent('switch1WOLPTheme', { detail: { newTheme } }));
    }

    init() {
        const self = this;

        let allowed = true;
        let solutionLocalStorage = null;

        try {
            solutionLocalStorage = localStorage.getItem(this.solutionLocalStorageKey);
        } catch (e) {
            console.log(e);
        }

        const solutionMeta = document.querySelector('meta[name="1WO_UserDataStorageSolution"]')?.content;

        if (solutionMeta === '0') {
            allowed = false;
        }

        if (solutionLocalStorage) {
            if (solutionLocalStorage === '1') {
                allowed = true;
            } else if (solutionLocalStorage === '0') {
                allowed = false;
            }
        }

        self.allowed = allowed;

        if (allowed) {
            self.#renderWidget();
        }

        window.addEventListener('1WO_turnOnWidgets', () => {
            if (self.allowed === false) {
                self.#renderWidget();
            }
        });

        window.addEventListener('1WO_turnOffWidgets', () => {
            self.allowed = false;

            if (!self.iframe) {
                return;
            }
            self.iframe.remove();
            self.iframe = null;
        });

        // Expose a global function to switch the theme
        window.switch1WOLPTheme = this.#switchTheme.bind(this);
    }
}

const loyaltyWidgetConstructor = new LoyaltyWidgetConstructor();

loyaltyWidgetConstructor.init();
