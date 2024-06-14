import styled from 'styled-components';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button } from '@/shared/rsuite/admin-panel';
import { FlexboxGrid } from 'rsuite';
import { useRef } from 'react';
import { showMessage } from '@/shared/lib/messages';
import { uploadFileWithQuizzesModel } from '../model';
import { uploadFileWithQuizzesFx } from '@/features/tools/quiz-uploader/model/effects';
import { Loader, Table, TextWithEllipsis } from '@/shared/ui';
import { HrefIcon } from '@/shared/ui/icons';
import { useTranslation } from 'next-i18next';
import { PORTAL_URL } from '@/shared/constants';

const { Td, Th, Tr } = Table;

export const ToolsForm = styled(({ className }: PropsWithClassName) => {
    const partnerId = useStore(userModel.stores.$partnerId);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadedQuizzes = useStore(uploadFileWithQuizzesModel.stores.$uploadedQuizzes);
    const isLoading = useStore(uploadFileWithQuizzesFx.pending);
    const { t } = useTranslation('common', { keyPrefix: 'tools' });

    const uploadFileWithQuizzes = (fileXls: File) => {
        if (partnerId) {
            const formData = new FormData();
            formData.append('file', fileXls);

            if (fileXls.size <= 250 * 1024) {
                uploadFileWithQuizzesFx({ partnerId, formData })
                    .then(() => {
                        showMessage('Quizzes uploaded successfully');
                    })
                    .catch(() => {
                        showMessage('Error was occurred', 'error');
                    });
            } else {
                showMessage('File size limit exceeded', 'error');
            }
        }
    };

    const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            uploadFileWithQuizzes(event.target.files[0]);
        }
    };

    return (
        <form className={className}>
            <FlexboxGrid className="header" align="middle" justify="start" as="header">
                <h3 className="title">{t('quizzes-upload')}</h3>
            </FlexboxGrid>
            <FlexboxGrid className="header" align="middle" justify="start" as="header">
                <p>{t('quizzes-upload-description')}</p>
            </FlexboxGrid>
            <FlexboxGrid className="header" align="middle" justify="start" as="header">
                <Button size="md" appearance="primary" onClick={() => fileInputRef.current?.click()}>
                    {t('quizzes-upload-button-text')}
                </Button>
                <input type="file" accept=".xls" hidden ref={fileInputRef} onChange={onUploadFile} />
                {isLoading && <Loader />}
            </FlexboxGrid>

            {uploadedQuizzes && (
                <div>
                    <Table
                        className="quiz-result-table"
                        noDataComponent="Upload file is empty"
                        templateColumns={[3, 1, 1, 1]}
                        head={
                            <Tr>
                                <Th>{t('quizzes-upload-result-name-column')}</Th>
                                <Th>{t('quizzes-upload-result-status-column')}</Th>
                                <Th>{t('quizzes-upload-result-preview-column')}</Th>
                                <Th>{t('quizzes-upload-result-configuration-column')}</Th>
                            </Tr>
                        }
                        body={uploadedQuizzes.map((quizUploadResult) => {
                            return (
                                <Tr key={quizUploadResult.widgetId}>
                                    <Td>
                                        <TextWithEllipsis>{quizUploadResult.name}</TextWithEllipsis>
                                    </Td>
                                    <Td>
                                        <TextWithEllipsis
                                            className={
                                                quizUploadResult.status === 'SUCCESS'
                                                    ? 'status-success'
                                                    : 'status-failed'
                                            }
                                        >
                                            {quizUploadResult.status}
                                        </TextWithEllipsis>
                                    </Td>
                                    <Td>
                                        {quizUploadResult.status === 'SUCCESS' ? (
                                            <div className="link">
                                                <HrefIcon />
                                                <a
                                                    target="_blank"
                                                    href={new URL(
                                                        `/#!/widget/${quizUploadResult.widgetId}`,
                                                        PORTAL_URL
                                                    ).toString()}
                                                >
                                                    {t('quizzes-upload-result-link')}
                                                </a>
                                            </div>
                                        ) : (
                                            <span>—</span>
                                        )}
                                    </Td>
                                    <Td>
                                        {quizUploadResult.status === 'SUCCESS' ? (
                                            <div className="link">
                                                <HrefIcon />
                                                <a
                                                    target="_blank"
                                                    href={new URL(
                                                        `/#!/admin/partners/quiz-manager/widget-settings/${quizUploadResult.surveyId}`,
                                                        PORTAL_URL
                                                    ).toString()}
                                                >
                                                    {t('quizzes-upload-result-link')}
                                                </a>
                                            </div>
                                        ) : (
                                            <span>—</span>
                                        )}
                                    </Td>
                                </Tr>
                            );
                        })}
                    />
                </div>
            )}

            {!uploadedQuizzes && <div className="divider" />}
        </form>
    );
})`
    ${styles}
`;
