/* eslint-disable max-len */
import styled from 'styled-components';
import { Modal as RsuiteModal, ModalProps } from 'rsuite';
import type { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import ModalHeader from 'rsuite/esm/Modal/ModalHeader';
import ModalBody from 'rsuite/esm/Modal/ModalBody';

type ModalType = RsRefForwardingComponent<'div', ModalProps> & {
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
};

export const Modal: ModalType = styled(RsuiteModal)`
    margin-block-start: 130px;
    margin-block-end: 30px;
    max-width: 500px;

    .rs-modal-content {
        padding: 0;
        border: 1px solid var(--grey-7-color);
        box-shadow: 0px 2px 4px rgba(23, 24, 41, 0.07);
        border-radius: 7px;

        .rs-modal-header {
            padding: 17px 16px;
            border-block-end: 1px solid var(--grey-7-color);
            position: relative;

            .rs-modal-header-close {
                opacity: 0.75;
                width: 28px;
                height: 28px;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjc3NSAxLjIyNiAxLjIyNiAxMi43NzVNMS4yMjYgMS4yMjZsMTEuNTQ5IDExLjU0OSIgc3Ryb2tlPSIjQjdCOUJGIiBzdHJva2Utd2lkdGg9IjEuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+);
                background-repeat: no-repeat;
                background-position: center;
                padding: 0;
                top: 50%;
                transform: translateY(-50%);

                &:hover {
                    opacity: 1;
                }

                * {
                    display: none;
                }
            }
        }

        .rs-modal-body {
            margin: 0;
            padding: 20px 26px;
            overflow: visible !important;
            max-height: initial !important;
        }
    }
`;
