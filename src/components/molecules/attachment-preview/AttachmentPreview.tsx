import React from 'react';
import { Button, Tooltip } from 'antd';
import { CloseOutlined, AudioOutlined, PaperClipOutlined } from '@ant-design/icons';
import type { Attachment } from '@/types/chat';

interface AttachmentPreviewProps {
    attachment: Attachment;
    onRemove: () => void;
}

/**
 * Shows a compact chip above the input area indicating which attachment
 * (audio recording or uploaded file) will be sent with the next message.
 * The user can remove it before sending.
 */
const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachment, onRemove }) => {
    const isAudio = attachment.kind === 'audio';

    return (
        <div style={styles.chip}>
            <div style={styles.left}>
                {isAudio ? (
                    <>
                        <span style={styles.icon}><AudioOutlined /></span>
                        <div style={styles.meta}>
                            <span style={styles.label}>{attachment.name}</span>
                            {/* Inline audio player so the user can review before sending */}
                            <audio
                                src={attachment.previewUrl}
                                controls
                                style={styles.audioPlayer}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <span style={styles.icon}><PaperClipOutlined /></span>
                        <div style={styles.meta}>
                            <span style={styles.label}>{attachment.name}</span>
                            {/* Image preview if it's an image */}
                            {attachment.mimeType.startsWith('image/') && (
                                <img
                                    src={attachment.previewUrl}
                                    alt="preview"
                                    style={styles.imageThumb}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>

            <Tooltip title="Remove attachment">
                <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={onRemove}
                    style={styles.removeBtn}
                />
            </Tooltip>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    chip: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8,
        background: '#f0f7ff',
        border: '1px solid #bae0ff',
        borderRadius: 8,
        padding: '8px 10px',
        marginBottom: 8,
    },
    left: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        flex: 1,
        minWidth: 0,
    },
    icon: {
        color: '#1677ff',
        fontSize: 16,
        marginTop: 2,
        flexShrink: 0,
    },
    meta: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: 0,
        flex: 1,
    },
    label: {
        fontSize: 12,
        fontWeight: 500,
        color: '#1677ff',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    audioPlayer: {
        height: 32,
        width: '100%',
        maxWidth: 280,
    },
    imageThumb: {
        height: 56,
        width: 56,
        objectFit: 'cover',
        borderRadius: 4,
        border: '1px solid #bae0ff',
    },
    removeBtn: {
        flexShrink: 0,
        color: '#8c8c8c',
    },
};

export default AttachmentPreview;