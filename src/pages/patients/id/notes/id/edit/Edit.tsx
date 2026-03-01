import { useEdit } from "./useEdit";
import "./styles.css";
import { Content, Header } from "antd/es/layout/layout";
import { Button, Flex, Input, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import MarkdownEditor from '@/components/organisms/markdownEditor/MarkdownEditor';
import Chatbox from '@/components/organisms/chatbox/Chatbox';
import { useEditableTitle } from "./useEditableTitle";
import { ConfirmModal } from "@/components/organisms/modals/confirm/ConfirmModal";



export const Edit: React.FC = () => {

    const {
        isChanged,
        isDeleteModalOpen,
        loading,
        content,
        title,
        patient,
        navigate,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
        handleChangeTitle,
        handleChangeContent,
        handleSave,
    } = useEdit();

    return (
        <div className="page-container">
            <Header className="header">
                <Flex orientation="horizontal" gap="small" align="center">
                    <EditableTitle
                        title={title}
                        onChange={handleChangeTitle}
                    />
                    <Button color="primary" className="patient-name" type="link" onClick={() => navigate(`/patients/${patient?.id}/details`)}>
                        {patient?.firstName} {patient?.lastName}
                    </Button>
                </Flex>
                <Flex gap="small" className="action-btns">
                    <Button>Cancel</Button>
                    <Button type="primary" onClick={handleSave} disabled={!isChanged}>Save</Button>
                    <Button danger icon={<DeleteOutlined />} onClick={handleOpenDeleteModal} />
                </Flex>
            </Header>
            <Content className="content">
                <div className="workspace">
                    <div className="workspace-left">
                        {loading ? <Spin /> : (
                            <MarkdownEditor content={content} handleChangeContent={handleChangeContent} />
                        )}
                    </div>
                    <div className="workspace-divider" />
                    <div className="workspace-right">
                        <Chatbox />
                    </div>
                </div>
            </Content>
            <ConfirmModal
                open={isDeleteModalOpen}
                title="Delete Note"
                message="Are you sure you want to delete this note?"
                handleConfirm={handleConfirmDelete}
                handleCancel={handleCloseDeleteModal}
            />
        </div>

    )
}

interface EditableTitleProps {
    title: string;
    onChange: (value: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ title, onChange }) => {
    const { editing, setEditing } = useEditableTitle();

    return editing ? (
        <Input
            autoFocus
            value={title}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditing(false)}
            onPressEnter={() => setEditing(false)}
            className="editable-title"
        />
    ) : (
        <span
            className="page-title editable"
            onClick={() => setEditing(true)}
        >
            {title || "Untitled note"}
        </span>
    );
};