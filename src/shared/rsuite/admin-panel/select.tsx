import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import ReactSelect, { components, GroupBase, Props } from 'react-select';
import { FlexboxGrid } from 'rsuite';

export type BaseOption<T = Record<string, unknown>> = T & {
    label: JSX.Element | string;
    value: string;
    color?: string;
    icon?: ReactNode;
    // option?: any;
};

type SelectProps = {
    isDropdownIndependent?: boolean;
    size?: 'lg' | 'md' | 'sm' | 'xs';
};

const stylesBySize: Record<string, Record<Required<SelectProps>['size'], any>> = {
    minHeight: {
        lg: 44,
        md: 40,
        sm: 36,
        xs: 30,
    },
    fontSize: {
        lg: 20,
        md: 16,
        sm: 16,
        xs: 14,
    },
};

export const Select = <
    Option extends BaseOption,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: Props<Option, IsMulti, Group> & SelectProps
) => {
    const { isDropdownIndependent } = props;
    const { t } = useTranslation('common');
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });

    const { size = 'lg' } = props;

    // very strange error if uncommented
    // `Type 'IsMulti' is not assignable to type 'boolean'.`, when IsMulti extends boolean :)
    // why? as? xd
    // so don't remove the ignorant comments!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <ReactSelect<Option, IsMulti, Group>
            {...props}
            isClearable={false}
            placeholder={translateModals('select')}
            noOptionsMessage={() =>
                props.noOptionsMessage ? props.noOptionsMessage({ inputValue: '' }) : t('no-options-message')
            }
            styles={{
                control: (provided, { isFocused, menuIsOpen }) => ({
                    ...provided,
                    borderRadius: 5,
                    borderColor: 'var(--grey-3-color)',
                    boxShadow: isFocused ? '0px 2px 4px rgba(23, 24, 41, 0.07)' : undefined,
                    cursor: menuIsOpen ? 'text' : 'pointer',
                    minHeight: stylesBySize.minHeight[size],
                    '&:hover': {
                        borderColor: 'rgb(var(--accent-5-color))',
                    },
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    paddingInline: 12,
                }),
                multiValueLabel: (provided) => ({
                    ...provided,
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'var(--text-dark-color)',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }),
                multiValueRemove: (provided) => ({
                    ...provided,
                    backgroundColor: 'white',
                    backgroundImage:
                        'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjc3NSAxLjIyNiAxLjIyNiAxMi43NzVNMS4yMjYgMS4yMjZsMTEuNTQ5IDExLjU0OSIgc3Ryb2tlPSIjQjdCOUJGIiBzdHJva2Utd2lkdGg9IjEuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '40%',
                    color: 'transparent',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    '&:hover': {
                        backgroundColor: 'var(--accent-primary-color)',
                        backgroundImage:
                            'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjc3NSAxLjIyNiAxLjIyNiAxMi43NzVNMS4yMjYgMS4yMjZsMTEuNTQ5IDExLjU0OSIgc3Ryb2tlPSIjQjdCOUJGIiBzdHJva2Utd2lkdGg9IjEuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '40%',
                        color: 'transparent',
                    },
                }),
                multiValue: (provided) => ({
                    ...provided,
                    border: '1px solid var(--grey-3-color)',
                    borderRadius: 5,
                }),
                indicatorSeparator: (provided) => ({
                    ...provided,
                    display: 'none',
                }),
                valueContainer: (provided) => ({
                    ...provided,
                    padding: '5px 12px',
                }),
                menu: (provided) => ({
                    ...provided,
                    border: '1px solid var(--grey-7-color)',
                    boxShadow: '0px 2px 4px rgba(23, 24, 41, 0.07);',
                    marginBlockStart: 5,
                    overflow: 'hidden',
                    ...(isDropdownIndependent ? { width: 'min-content', minWidth: '100%' } : {}),
                }),
                menuList: (provided) => ({
                    ...provided,
                    paddingBlock: 8,
                }),
                option: (provided, { isSelected, data }) => ({
                    ...provided,
                    padding: '6px 12px',
                    fontSize: 14,
                    fontWeight: 600,
                    color: data.color || 'var(--text-dark-color)',
                    backgroundColor: isSelected ? 'rgba(var(--accent-5-color), 0.25)' : '#fff',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(var(--accent-5-color), 0.1)',
                    },
                }),
                input: (provided) => ({
                    ...provided,
                    padding: 0,
                    margin: 0,
                    fontSize: stylesBySize.fontSize[size],
                }),
                singleValue: (provided) => ({
                    ...provided,
                    padding: 0,
                    margin: 0,
                    lineHeight: 1,
                    fontSize: stylesBySize.fontSize[size],
                    color: 'var(--text-default-color)',
                    fontWeight: 600,
                }),
                placeholder: (provided) => ({
                    ...provided,
                    fontSize: 16,
                    color: 'var(--grey-2-color)',
                }),
                ...props.styles,
            }}
            components={{
                DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                        <svg width="8" height="14" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                // eslint-disable-next-line max-len
                                d="M.236 9.242a.667.667 0 0 1 .941-.05L4 11.73l2.823-2.538a.667.667 0 1 1 .891.991l-3.268 2.939a.667.667 0 0 1-.892 0L.286 10.183a.667.667 0 0 1-.05-.941ZM.236 4.758a.667.667 0 0 0 .941.05L4 2.27l2.823 2.538a.667.667 0 0 0 .891-.991L4.446.878a.667.667 0 0 0-.892 0L.286 3.817a.667.667 0 0 0-.05.941Z"
                                fill="currentColor"
                            />
                        </svg>
                    </components.DropdownIndicator>
                ),
                Option: (props) => {
                    if (props.data.hasOwnProperty('isDisabled')) {
                        return props.data.isDisabled ? (
                            <div
                                style={{
                                    pointerEvents: 'none',
                                    cursor: 'none',
                                }}
                            >
                                <components.Option {...props}>
                                    <FlexboxGrid
                                        align="middle"
                                        style={{
                                            opacity: '0.3',
                                            gap: 5,
                                            whiteSpace: isDropdownIndependent ? 'nowrap' : 'initial',
                                        }}
                                    >
                                        {props.data.icon}
                                        {props.data.label}
                                    </FlexboxGrid>
                                </components.Option>
                            </div>
                        ) : (
                            <components.Option {...props}>
                                <FlexboxGrid
                                    align="middle"
                                    style={{
                                        gap: 5,
                                        whiteSpace: isDropdownIndependent ? 'nowrap' : 'initial',
                                    }}
                                >
                                    {props.data.icon}
                                    {props.data.label}
                                </FlexboxGrid>
                            </components.Option>
                        );
                    } else {
                        return (
                            <components.Option {...props}>
                                <FlexboxGrid
                                    align="middle"
                                    style={{
                                        gap: 5,
                                        whiteSpace: isDropdownIndependent ? 'nowrap' : 'initial',
                                    }}
                                >
                                    {props.data.icon}
                                    {props.data.label}
                                </FlexboxGrid>
                            </components.Option>
                        );
                    }
                },
            }}
        />
    );
};
