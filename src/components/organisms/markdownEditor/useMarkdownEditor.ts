import { useState } from 'react';

export type ViewMode = 'edit' | 'preview';

const useMarkdownEditor = (
    content: string,
    handleChangeContent: (value: string) => void
) => {
    const [viewMode, setViewMode] = useState<ViewMode>('preview');

    const insertMarkdown = (prefix: string, suffix: string = '') => {
        const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText =
            content.substring(0, start) +
            prefix +
            selectedText +
            suffix +
            content.substring(end);

        handleChangeContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + prefix.length,
                start + prefix.length + selectedText.length
            );
        }, 0);
    };

    return {
        content,
        viewMode,
        handleChangeContent,
        setViewMode,
        insertMarkdown,
    };
};

export default useMarkdownEditor;