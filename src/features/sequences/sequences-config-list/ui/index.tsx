/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { Table, TextWithEllipsis } from '@/shared/ui';
import { useCustomRouter } from '@/shared/hooks';
import { styles } from './styles';
import { Button } from '@/shared/rsuite/admin-panel';
import { Route } from '@/shared/constants';
import type { PropsWithClassName } from '@/shared/utility-types';
import { feedModel } from '@/entities/feed';
import { useEffect } from 'react';
import { getSequencesFx } from '@/entities/feed/model/effects';
import { userModel } from '@/entities/user';
import classNames from 'classnames';
import { setActiveSequenceId } from '@/entities/feed/model/events';

const { Td, Th, Tr } = Table;

export const SequencesConfigList = styled((props: PropsWithClassName) => {
    const sequences = useStore(feedModel.stores.$sequences);
    const partnerId = useStore(userModel.stores.$partnerId);
    const { className } = props;
    const { push } = useCustomRouter();

    useEffect(() => {
        if (partnerId) {
            getSequencesFx(partnerId);
        }
    }, [partnerId]);

    const { i18n, t } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });
    const { t: translationLoyaltyPages } = useTranslation('common', { keyPrefix: 'sequences' });
    const { t: translationEvents } = useTranslation('common', { keyPrefix: 'events' });

    return (
        <div className={className}>
            <Table
                noDataComponent={translationEvents('message-if-pages-not-exist')}
                templateColumns={[2, 2, 2, 1]}
                head={
                    <Tr>
                        <Th>
                            <button>{translationLoyaltyPages('name')}</button>
                        </Th>

                        <Th>
                            <button>{translationLoyaltyPages('language')}</button>
                        </Th>

                        <Th>
                            <button>{translationLoyaltyPages('status')}</button>
                        </Th>

                        {/* <Th>
                            <button>{translationLoyaltyPages('items')}</button>
                        </Th> */}
                        <Th></Th>
                    </Tr>
                }
                body={sequences.map((sequence, index, { length }) => {
                    const props: Parameters<typeof Tr>[0] = {};

                    return (
                        <Tr key={sequence.id} {...props}>
                            <Td>
                                <TextWithEllipsis>{sequence.name}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{i18n.t(sequence.locale)}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>
                                    <span
                                        className={classNames('status', {
                                            'status-active': sequence.status === 'ACTIVE',
                                            'status-draft': sequence.status === 'DRAFT',
                                        })}
                                    >
                                        {sequence.status}
                                    </span>
                                </TextWithEllipsis>
                            </Td>
                            {/* <Td>
                                <TextWithEllipsis>{i18n.t(sequence.locale)}</TextWithEllipsis>
                            </Td> */}
                            <Td>
                                <FlexboxGrid justify="end" style={{ gap: 12, width: '100%' }}>
                                    <Button
                                        size="md"
                                        onClick={() => {
                                            setActiveSequenceId(sequence.id);
                                            push({
                                                pathname: Route.admin.sequenceManager(sequence.id),
                                            });
                                        }}
                                    >
                                        {translationLoyaltyPages('manage')}
                                    </Button>
                                </FlexboxGrid>
                            </Td>
                        </Tr>
                    );
                })}
            />
        </div>
    );
})`
    ${styles}
`;
