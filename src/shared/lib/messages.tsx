import { ReactNode } from 'react';
import { Notification, NotificationProps, toaster } from 'rsuite';
import { ToastContainerProps } from 'rsuite/esm/toaster/ToastContainer';

export const showMessage = (
    message: ReactNode,
    type: NotificationProps['type'] = 'success',
    options: ToastContainerProps = {}
) => {
    toaster.push(
        <Notification type={type} closable header="Default header" className="toaster-message">
            {message}
        </Notification>,
        { placement: 'topEnd', ...options }
    );
};
