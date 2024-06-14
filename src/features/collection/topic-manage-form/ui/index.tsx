import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { Option, TopicFormValues, useTopicManage } from '../hooks/useTopicManage';
import { Button, Input, Select } from '@/shared/rsuite/admin-panel';
import { ErrorMessage, Loader } from '@/shared/ui';
import { FlexboxGrid } from 'rsuite';
import { adminPanelModel } from '@/entities/admin-panel';
import { FormikErrors } from 'formik';
import { icons } from './icons';
import classNames from 'classnames';

export const TopicManageForm = styled(({ className }: PropsWithClassName) => {
    const {
        form: f,
        addFeedField,
        deleteFeedField,
        feedOptions,
        deleteFeedFeedRelationFromTopic,
    } = useTopicManage();

    return (
        <div className={className}>
            <form onSubmit={f.handleSubmit}>
                <div className="field full-width">
                    <label>
                        <span>Topic name</span>

                        <Input
                            {...f.getFieldProps('name')}
                            size="lg"
                            hasError={Boolean(f.touched.name && f.errors.name)}
                            onChange={(newValue: string) => f.setFieldValue('name', newValue)}
                            placeholder="Public name"
                        />
                    </label>

                    {f.touched.name && f.errors.name && <ErrorMessage>{f.errors.name}</ErrorMessage>}
                </div>

                <div className="field full-width">
                    <label>
                        <span>Description</span>

                        <Input
                            {...f.getFieldProps('description')}
                            size="lg"
                            hasError={Boolean(f.touched.description && f.errors.description)}
                            onChange={(newValue: string) => f.setFieldValue('description', newValue)}
                            placeholder="Public description"
                        />
                    </label>

                    {f.touched.description && f.errors.description && (
                        <ErrorMessage>{f.errors.description}</ErrorMessage>
                    )}
                </div>

                <div className="field full-width">
                    <label>
                        <span>Logotype URL</span>

                        <Input
                            {...f.getFieldProps('logo')}
                            size="lg"
                            hasError={Boolean(f.touched.logo && f.errors.logo)}
                            onChange={(newValue: string) => f.setFieldValue('logo', newValue)}
                            placeholder="URL"
                        />
                    </label>

                    {f.touched.logo && f.errors.logo && <ErrorMessage>{f.errors.logo}</ErrorMessage>}
                </div>

                <div className="adding-feeds full-width">
                    <h3 className="adding-feeds__title">Adding feeds</h3>

                    <ul className="adding-feeds__list">
                        {f.values.feedBlocks.map((feedBlock, index, { length }) => {
                            const touchedTitle = f.touched.feedBlocks?.[index]?.title;
                            const errorTitle = (
                                f.errors.feedBlocks?.[index] as FormikErrors<
                                    TopicFormValues['feedBlocks'][number]
                                >
                            )?.title;

                            const touchedId = f.touched.feedBlocks?.[index]?.feed;
                            const errorId = (
                                f.errors.feedBlocks?.[index] as FormikErrors<
                                    TopicFormValues['feedBlocks'][number]
                                >
                            )?.feed;

                            const isDisabledDeleteBtn = index === 0 && length === 1;

                            return (
                                <li className="adding-feeds__field-feed field-feed" key={index}>
                                    <div className="field field-feed__title">
                                        <label>
                                            <span>Feed title</span>

                                            <Input
                                                {...f.getFieldProps(`feedBlocks[${index}].title`)}
                                                size="lg"
                                                hasError={Boolean(touchedTitle && errorTitle)}
                                                onChange={(newValue: string) =>
                                                    f.setFieldValue(`feedBlocks[${index}].title`, newValue)
                                                }
                                                placeholder="Public name"
                                            />
                                        </label>

                                        {touchedTitle && errorTitle && (
                                            <ErrorMessage>{errorTitle}</ErrorMessage>
                                        )}
                                    </div>

                                    <div className="field field-feed__id field--required">
                                        <label>
                                            <span>Select feed</span>

                                            <Select<Option>
                                                options={feedOptions}
                                                size="md"
                                                onBlur={() => f.setFieldTouched(`feedBlocks[${index}].feed`)}
                                                onChange={(value) => {
                                                    f.setFieldValue(`feedBlocks[${index}].feed`, value);
                                                    f.setFieldValue(
                                                        `feedBlocks[${index}].feedType`,
                                                        value?.feedType
                                                    );
                                                }}
                                                value={f.values.feedBlocks[index].feed}
                                            />
                                        </label>

                                        {touchedId && errorId && <ErrorMessage>{errorId}</ErrorMessage>}
                                    </div>

                                    <div className="field field-feed__delete">
                                        <label>
                                            <span>Delete</span>
                                            <button
                                                className={classNames({ disabled: isDisabledDeleteBtn })}
                                                type="button"
                                                onClick={() => {
                                                    if (feedBlock.id) {
                                                        deleteFeedFeedRelationFromTopic(feedBlock.id);
                                                    } else {
                                                        deleteFeedField(index);
                                                    }
                                                }}
                                                disabled={isDisabledDeleteBtn}
                                            >
                                                {<icons.DeleteIcon />}
                                            </button>
                                        </label>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <Button onClick={addFeedField} type="button" className="adding-feeds__btn-add">
                        {<icons.PlusIcon />}
                        <span>Add one more feed</span>
                    </Button>
                </div>

                <FlexboxGrid className="buttons full-width" align="middle" justify="end">
                    <Button
                        size="sm"
                        appearance="subtle"
                        type="button"
                        onClick={() => {
                            adminPanelModel.events.adminModalToggled({
                                isOpen: false,
                            });
                        }}
                    >
                        Cancel
                    </Button>

                    <Button size="sm" appearance="primary" type="submit">
                        {f.isSubmitting ? <Loader width={16} /> : 'Save'}
                    </Button>
                </FlexboxGrid>
            </form>
        </div>
    );
})`
    --field-label-font-size: 14px;
    --field-label-line-height: 1.2;

    form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px 12px;
    }

    .field,
    .field label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .field--required label span::after {
        content: ' *';
        color: rgb(var(--error-color));
    }

    .field label span {
        font-size: var(--field-label-font-size);
        font-weight: 600;
        color: var(--text-dark-color);
    }

    .buttons {
        gap: 8px;
    }

    .full-width {
        grid-column: 1 / 3;
    }

    .adding-feeds {
        padding-block-start: 18px;
        border-block-start: 1px solid var(--grey-7-color);

        &__list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            margin-block-end: 18px;
        }

        &__title {
            font-size: 16px;
            line-height: 19.5px;
            font-weight: 600;
            margin-block-end: 12px;
        }

        &__field-feed {
            display: flex;
            align-items: start;
        }

        .field-feed {
            --delete-icon-width: 30px;
            --field-gap: calc(12px + 6px);
            --feed-field-width: calc((100% - var(--field-gap) - var(--delete-icon-width)) / 2);

            &__title,
            &__id {
                width: var(--feed-field-width);
            }

            &__title {
                margin-inline-end: 12px;
            }

            &__id {
                margin-inline-end: 6px;
            }

            &__delete {
                width: var(--delete-icon-width);

                label span {
                    display: block;
                    width: 0;
                    overflow: hidden;
                }

                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 40px;
                    padding: 0;
                    margin: 0;
                    background-color: transparent;
                }
            }
        }

        &__btn-add {
            display: flex;
            gap: 4px;
            align-items: center;
        }
    }
`;
