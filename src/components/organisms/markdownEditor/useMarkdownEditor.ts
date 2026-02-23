import { useState, useEffect } from 'react';
import { notesAPI } from '../../../services/mockAPI';

export type ViewMode = 'edit' | 'preview';

const useMarkdownEditor = () => {
    const [content, setContent] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('edit');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadNote();
    }, []);

    const loadNote = async () => {
        setLoading(true);
        try {
            const note = await notesAPI.loadNote();
            setContent(note);
        } finally {
            setLoading(false);
        }
    };

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

        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + prefix.length,
                start + prefix.length + selectedText.length
            );
        }, 0);
    };



    return {
        loading,
        content,
        viewMode,
        setContent,
        setViewMode,
        insertMarkdown,
    };
};

export default useMarkdownEditor;