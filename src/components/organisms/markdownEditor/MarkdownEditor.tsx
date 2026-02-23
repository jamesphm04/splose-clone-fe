import React from 'react';
import './styles.css';
import { Button, Space, Segmented } from 'antd';
import {
    BoldOutlined,
    ItalicOutlined,
    OrderedListOutlined,
    UnorderedListOutlined,
    CodeOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useMarkdownEditor from './useMarkdownEditor';
import { type ViewMode } from './useMarkdownEditor';

const MarkdownEditor: React.FC = () => {
    const {
        loading,
        content,
        viewMode,
        setContent,
        setViewMode,
        insertMarkdown,
    } = useMarkdownEditor();

    const toolbarButtons = [
        {
            icon: <BoldOutlined />,
            tooltip: 'Bold',
            onClick: () => insertMarkdown('**', '**'),
        },
        {
            icon: <ItalicOutlined />,
            tooltip: 'Italic',
            onClick: () => insertMarkdown('*', '*'),
        },
        {
            icon: <span style={{ fontWeight: 'bold' }}>H</span>,
            tooltip: 'Heading',
            onClick: () => insertMarkdown('## ', ''),
        },
        {
            icon: <UnorderedListOutlined />,
            tooltip: 'Bullet List',
            onClick: () => insertMarkdown('- ', ''),
        },
        {
            icon: <OrderedListOutlined />,
            tooltip: 'Numbered List',
            onClick: () => insertMarkdown('1. ', ''),
        },
        {
            icon: <CodeOutlined />,
            tooltip: 'Code Block',
            onClick: () => insertMarkdown('```\n', '\n```'),
        },
    ];
    if (loading) {
        return <div className="markdown-loading">Loading...</div>;
    }
    return (
        <div className="markdown-editor">
            <div className="editor-toolbar">
                <Space>
                    {toolbarButtons.map((btn, idx) => (
                        <Button
                            key={idx}
                            icon={btn.icon}
                            onClick={btn.onClick}
                            title={btn.tooltip}
                            type="text"
                        />
                    ))}
                </Space>
                <Segmented
                    options={[
                        { label: 'Edit', value: 'edit' },
                        { label: 'Preview', value: 'preview' },
                    ]}
                    value={viewMode}
                    onChange={(value) => setViewMode(value as ViewMode)}
                />
            </div>

            <div className="editor-content">
                {viewMode === 'edit' ? (
                    <textarea
                        id="markdown-textarea"
                        className="markdown-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your progress note..."
                    />
                ) : (
                    <div className="markdown-preview">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MarkdownEditor;