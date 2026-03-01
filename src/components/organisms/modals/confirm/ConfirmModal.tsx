import { Modal, Button } from "antd";
import './styles.css';

interface ConfirmModalProps {
    open: boolean;
    title: string;
    message: string;
    handleConfirm: () => void | Promise<void>;
    handleCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
    loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    title,
    message,
    handleConfirm,
    handleCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
    loading = false,
}) => {
    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel} disabled={loading}>
                    {cancelText}
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    danger={danger}
                    loading={loading}
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    {confirmText}
                </Button>,
            ]}
        >
            <p>{message}</p>
        </Modal>
    );
};