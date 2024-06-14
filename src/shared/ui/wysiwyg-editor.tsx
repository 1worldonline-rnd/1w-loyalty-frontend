import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent, EditorOptions, EditorContentProps } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import type { PropsWithClassName } from '../utility-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import { LinkIcon } from './icons';

type WysiwygEditorProps = PropsWithClassName<{
    value?: EditorOptions['content'];
    onUpdate?: EditorOptions['onUpdate'];
    onBlur?: EditorContentProps['onBlur'];
    shouldDisplayedBarOnFocus?: boolean;
    id?: string;
    autofocus?: boolean;
}>;

export const WysiwygEditor = styled((props: WysiwygEditorProps) => {
    const { className, value, onUpdate, shouldDisplayedBarOnFocus = false, id, autofocus = false, onBlur } = props;

    const [isFocus, setIsFocus] = useState(false);

    const wysiwygEditorRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(wysiwygEditorRef, () => {
        setIsFocus(false);
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
        ],
        onUpdate,
        content: value,
        autofocus,
    });

    const setLink = useCallback(() => {
        if (editor) {
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('URL', previousUrl);
            // cancelled
            if (url === null) {
                return;
            }
            // empty
            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
            }
            // update link
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    }, [editor]);

    useEffect(() => {
        if (value === '') {
            editor?.commands.clearContent();
        }
    }, [value]);

    return (
        <div className={className} ref={wysiwygEditorRef} id={id}>
            {editor && (shouldDisplayedBarOnFocus ? isFocus : true) && (
                <nav className="wysiwyg-editor__menu-bar">
                    <button
                        data-test-id="oi1agF9iNh"
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={classNames({ 'is-active': editor.isActive('bold') })}
                    >
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                            <path
                                // eslint-disable-next-line max-len
                                d="M1.33333 5.33317H4.33333C4.77536 5.33317 5.19928 5.15758 5.51184 4.84502C5.82441 4.53245 6 4.10853 6 3.6665C6 3.22448 5.82441 2.80055 5.51184 2.48799C5.19928 2.17543 4.77536 1.99984 4.33333 1.99984H1.33333V5.33317ZM8 8.33317C8 8.72714 7.9224 9.11724 7.77164 9.48122C7.62087 9.8452 7.3999 10.1759 7.12132 10.4545C6.84274 10.7331 6.51203 10.954 6.14805 11.1048C5.78407 11.2556 5.39397 11.3332 5 11.3332H0V0.666504H4.33333C4.92064 0.666529 5.49502 0.838939 5.98525 1.16236C6.47548 1.48577 6.86 1.94597 7.09113 2.48588C7.32226 3.0258 7.38983 3.62168 7.28546 4.19963C7.18109 4.77759 6.90937 5.3122 6.504 5.73717C6.9591 6.0007 7.33689 6.37929 7.59947 6.83494C7.86205 7.29059 8.00018 7.80728 8 8.33317ZM1.33333 6.6665V9.99984H5C5.44203 9.99984 5.86595 9.82424 6.17851 9.51168C6.49107 9.19912 6.66667 8.7752 6.66667 8.33317C6.66667 7.89114 6.49107 7.46722 6.17851 7.15466C5.86595 6.8421 5.44203 6.6665 5 6.6665H1.33333Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        data-test-id="qJqdrEgGKg"
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={classNames({ 'is-active': editor.isActive('italic') })}
                    >
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                            <path
                                // eslint-disable-next-line max-len
                                d="M5.99984 10.6665C5.99984 11.0347 5.70136 11.3332 5.33317 11.3332H1.33317C0.964981 11.3332 0.666504 11.0347 0.666504 10.6665C0.666504 10.2983 0.964981 9.99984 1.33317 9.99984H2.61784L4.0285 1.99984H2.6665C2.29831 1.99984 1.99984 1.70136 1.99984 1.33317C1.99984 0.964981 2.29831 0.666504 2.6665 0.666504H6.6665C7.03469 0.666504 7.33317 0.964981 7.33317 1.33317C7.33317 1.70136 7.03469 1.99984 6.6665 1.99984H5.38184L3.97117 9.99984H5.33317C5.70136 9.99984 5.99984 10.2983 5.99984 10.6665Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        data-test-id="18oHNHwHSz"
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={classNames({ 'is-active': editor.isActive('underline') })}
                    >
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                            <path
                                // eslint-disable-next-line max-len
                                d="M2.6665 0C3.03469 0 3.33317 0.298477 3.33317 0.666667V6C3.33317 6.70724 3.61412 7.38552 4.11422 7.88562C4.61432 8.38572 5.29259 8.66667 5.99984 8.66667C6.70708 8.66667 7.38536 8.38572 7.88546 7.88562C8.38555 7.38552 8.6665 6.70724 8.6665 6V0.666667C8.6665 0.298477 8.96498 0 9.33317 0C9.70136 0 9.99984 0.298477 9.99984 0.666667V6C9.99984 7.06087 9.57841 8.07828 8.82827 8.82843C8.07812 9.57857 7.0607 10 5.99984 10C4.93897 10 3.92156 9.57857 3.17141 8.82843C2.42126 8.07828 1.99984 7.06087 1.99984 6V0.666667C1.99984 0.298477 2.29831 0 2.6665 0ZM0.666504 12C0.666504 11.6318 0.964981 11.3333 1.33317 11.3333H10.6665C11.0347 11.3333 11.3332 11.6318 11.3332 12C11.3332 12.3682 11.0347 12.6667 10.6665 12.6667H1.33317C0.964982 12.6667 0.666504 12.3682 0.666504 12Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        data-test-id="bCX5jeqS4q"
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={classNames({ 'is-active': editor.isActive('strike') })}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                // eslint-disable-next-line max-len
                                d="M9.436 7.33317C9.58933 7.67717 9.66667 8.05984 9.66667 8.47984C9.66667 9.3745 9.31733 10.0745 8.61933 10.5778C7.92 11.0812 6.95533 11.3332 5.724 11.3332C4.75545 11.3332 3.7958 11.1338 2.84458 10.7347C2.61803 10.6397 2.47733 10.4139 2.47733 10.1682C2.47733 9.6785 3.0125 9.36707 3.46962 9.5428C4.16492 9.81009 4.87098 9.94384 5.588 9.94384C7.28867 9.94384 8.14133 9.45584 8.14733 8.47917C8.15085 8.28115 8.11441 8.08445 8.04018 7.90084C7.96596 7.71722 7.85547 7.55045 7.71533 7.4105L7.63533 7.3325H0.666667C0.298477 7.3325 0 7.03403 0 6.66584C0 6.29765 0.298477 5.99917 0.666667 5.99917H11.3332C11.7015 5.99917 12 6.29769 12 6.66592C12 7.03409 11.7016 7.33258 11.3334 7.33268L9.436 7.33317ZM6.71733 5.33317H3.086C2.96922 5.22669 2.86192 5.11025 2.76533 4.98517C2.47733 4.61317 2.33333 4.16384 2.33333 3.6345C2.33333 2.8105 2.644 2.10984 3.26467 1.5325C3.88667 0.95517 4.84733 0.666504 6.148 0.666504C7.00269 0.666504 7.82548 0.832601 8.61549 1.16479C8.8306 1.25525 8.96267 1.4705 8.96267 1.70386C8.96267 2.17298 8.44802 2.47519 8.00215 2.32934C7.47449 2.15673 6.91783 2.0705 6.332 2.0705C4.67867 2.0705 3.85267 2.59184 3.85267 3.6345C3.85267 3.9145 3.998 4.1585 4.28867 4.36717C4.57933 4.57584 4.938 4.74184 5.364 4.86717C5.77733 4.98717 6.22867 5.14317 6.71733 5.33317Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        data-test-id="RLgmVnBpcM"
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={classNames({ 'is-active': editor.isActive('bulletList') })}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                // eslint-disable-next-line max-len
                                d="M3.33333 1.3335C3.33333 0.965306 3.63181 0.666829 4 0.666829H11.3333C11.7015 0.666829 12 0.965306 12 1.3335C12 1.70169 11.7015 2.00016 11.3333 2.00016H4C3.63181 2.00016 3.33333 1.70169 3.33333 1.3335ZM1 2.3335C0.734784 2.3335 0.48043 2.22814 0.292893 2.0406C0.105357 1.85307 0 1.59871 0 1.3335C0 1.06828 0.105357 0.813926 0.292893 0.626389C0.48043 0.438853 0.734784 0.333496 1 0.333496C1.26522 0.333496 1.51957 0.438853 1.70711 0.626389C1.89464 0.813926 2 1.06828 2 1.3335C2 1.59871 1.89464 1.85307 1.70711 2.0406C1.51957 2.22814 1.26522 2.3335 1 2.3335ZM1 7.00016C0.734784 7.00016 0.48043 6.89481 0.292893 6.70727C0.105357 6.51973 0 6.26538 0 6.00016C0 5.73495 0.105357 5.48059 0.292893 5.29306C0.48043 5.10552 0.734784 5.00016 1 5.00016C1.26522 5.00016 1.51957 5.10552 1.70711 5.29306C1.89464 5.48059 2 5.73495 2 6.00016C2 6.26538 1.89464 6.51973 1.70711 6.70727C1.51957 6.89481 1.26522 7.00016 1 7.00016ZM1 11.6002C0.734784 11.6002 0.48043 11.4948 0.292893 11.3073C0.105357 11.1197 0 10.8654 0 10.6002C0 10.3349 0.105357 10.0806 0.292893 9.89306C0.48043 9.70552 0.734784 9.60016 1 9.60016C1.26522 9.60016 1.51957 9.70552 1.70711 9.89306C1.89464 10.0806 2 10.3349 2 10.6002C2 10.8654 1.89464 11.1197 1.70711 11.3073C1.51957 11.4948 1.26522 11.6002 1 11.6002ZM3.33333 6.00016C3.33333 5.63197 3.63181 5.3335 4 5.3335H11.3333C11.7015 5.3335 12 5.63197 12 6.00016C12 6.36835 11.7015 6.66683 11.3333 6.66683H4C3.63181 6.66683 3.33333 6.36835 3.33333 6.00016ZM3.33333 10.6668C3.33333 10.2986 3.63181 10.0002 4 10.0002H11.3333C11.7015 10.0002 12 10.2986 12 10.6668C12 11.035 11.7015 11.3335 11.3333 11.3335H4C3.63181 11.3335 3.33333 11.035 3.33333 10.6668Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        data-test-id="28_TkkzDbd"
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={classNames({ 'is-active': editor.isActive('orderedList') })}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                // eslint-disable-next-line max-len
                                d="M3.33333 1.33333C3.33333 0.965144 3.63181 0.666667 4 0.666667H11.3333C11.7015 0.666667 12 0.965144 12 1.33333C12 1.70152 11.7015 2 11.3333 2H4C3.63181 2 3.33333 1.70152 3.33333 1.33333ZM1.33333 0V2H2V2.66667H0V2H0.666667V0.666667H0V0H1.33333ZM0 7.33333V5.66667H1.33333V5.33333H0V4.66667H2V6.33333H0.666667V6.66667H2V7.33333H0ZM1.33333 11H0V10.3333H1.33333V10H0V9.33333H2V12H0V11.3333H1.33333V11ZM3.33333 6C3.33333 5.63181 3.63181 5.33333 4 5.33333H11.3333C11.7015 5.33333 12 5.63181 12 6C12 6.36819 11.7015 6.66667 11.3333 6.66667H4C3.63181 6.66667 3.33333 6.36819 3.33333 6ZM3.33333 10.6667C3.33333 10.2985 3.63181 10 4 10H11.3333C11.7015 10 12 10.2985 12 10.6667C12 11.0349 11.7015 11.3333 11.3333 11.3333H4C3.63181 11.3333 3.33333 11.0349 3.33333 10.6667Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        data-test-id="MxpyZeWSY3"
                        type="button"
                        onClick={setLink}
                        className={classNames({ 'is-active': editor.isActive('link') })}
                    >
                        <LinkIcon />
                    </button>
                    <button
                        data-test-id="BN0n9doklX"
                        type="button"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={classNames({ 'is-active': editor.isActive('codeBlock') })}
                    >
                        <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                            <path
                                // eslint-disable-next-line max-len
                                d="M10.7997 1.64237L11.7424 0.699707L15.0424 3.99971L11.7424 7.29971L10.7997 6.35704L13.1564 3.99971L10.7997 1.64237ZM5.1997 1.64237L2.84303 3.99971L5.1997 6.35704L4.25703 7.29971L0.957031 3.99971L4.25703 0.699707L5.1997 1.64237Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </nav>
            )}
            <EditorContent
                editor={editor}
                className="wysiwyg-editor__input"
                onFocus={() => setIsFocus(true)}
                // onBlurCapture={() => {
                //     onBlur();
                // }}
                onBlur={onBlur}
            />
        </div>
    );
})`
    border-radius: 5px;
    border: 1px solid var(--grey-3-color);
    background-color: #fff;

    .wysiwyg-editor__menu-bar {
        border-block-end: 1px solid var(--grey-3-color);
        padding-inline: 12px;
        align-items: center;
        height: 36px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        button {
            background-color: transparent;
            color: var(--text-dark-color);
            display: flex;
            border-radius: 3px;
            width: 20px;
            height: 20px;
            padding: 0;
            align-items: center;
            justify-content: center;

            &:not(.is-active):hover {
                background-color: var(--grey-6-color);
            }

            &.is-active {
                background-color: var(--text-dark-color);
                color: #fff;
            }
        }
    }

    .wysiwyg-editor__input {
        padding: 9px 12px;

        .ProseMirror {
            outline: none !important;
        }
    }

    .ProseMirror {
        font-size: 16px;
        font-size: 16px;

        pre {
            margin: 10px 0;
            border: 1px solid var(--grey-6-color);
            background-color: var(--grey-7-color);
            border-radius: 3px;
            padding: 8px 14px;
        }

        ol,
        ul {
            padding-inline-start: 20px;
        }

        ul {
            list-style-type: initial;
        }

        ol {
            list-style-type: decimal;
        };
    }
`;
