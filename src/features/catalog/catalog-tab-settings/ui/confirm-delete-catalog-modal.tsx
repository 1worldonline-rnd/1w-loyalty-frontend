import { Route } from '@/shared/constants';
import { Button, Modal } from '@/shared/rsuite/admin-panel';
import Link from 'next/link';
import { FlexboxGrid, ModalProps } from 'rsuite';
import styled from 'styled-components';

type ConfirmDeleteCatalogModalProps = ModalProps & {
    onConfirm: () => void;
    catalogName: string;
};

export const ConfirmDeleteCatalogModal = styled(
    ({ onConfirm, catalogName, ...props }: ConfirmDeleteCatalogModalProps) => {
        return (
            <Modal backdrop="static" size="xs" {...props}>
                <Modal.Header>
                    <h3>Delete catalog</h3>
                </Modal.Header>
                <Modal.Body>
                    <p className="description">
                        By deleting <strong style={{ fontWeight: 600 }}>{catalogName}</strong> you will lose
                        your selection of products. But the products themselves are not deleted and you can
                        always find them on the <Link href={Route.admin.products}>Product list page</Link>.
                    </p>

                    <FlexboxGrid className="buttons" align="middle" justify="end">
                        <Button
                            size="sm"
                            appearance="subtle"
                            onClick={(event) => {
                                if (props.onClose) {
                                    props.onClose(event);
                                }
                            }}
                        >
                            Cancel
                        </Button>

                        <Button size="sm" color="red" onClick={onConfirm}>
                            Delete
                        </Button>
                    </FlexboxGrid>
                </Modal.Body>
            </Modal>
        );
    }
)`
    .rs-modal-dialog {
        width: 350px;
    }

    h3 {
        font-size: 18px;
        color: var(--text-dark-color);
    }

    .description {
        font-size: 16px;
        line-height: 19px;
        color: var(--text-default-color);
    }

    .buttons {
        margin-block-start: 18px;
        gap: 8px;
    }
`;
