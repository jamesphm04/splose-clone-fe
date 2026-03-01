// import React from 'react';
// import { Input, Button, Upload, message as antMessage, Avatar } from 'antd';
// import {
//     SendOutlined,
//     PaperClipOutlined,
//     AudioOutlined,
//     UserOutlined,
//     RobotOutlined,
// } from '@ant-design/icons';
// import useChatbox from './useChatbox';
// import './styles.css';

// const { TextArea } = Input;

// const Chatbox: React.FC = () => {
//     const {
//         messages,
//         inputValue,
//         loading,
//         recording,
//         fileList,
//         messagesEndRef,
//         setInputValue,
//         handleSendMessage,
//         startRecording,
//         stopRecording,
//         formatTime,
//         handleKeyDown,
//         handleUploadChange,
//     } = useChatbox(antMessage);
//     return (
//         <div className="chat-box">
//             <div className="chat-header">
//                 <h3>AI Assistant</h3>
//                 <p>Ask questions or request help with documentation</p>
//             </div>

//             <div className="chat-messages">
//                 {messages.map((msg) => (
//                     <div key={msg.id} className={`chat-message ${msg.role}`}>
//                         <Avatar
//                             icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
//                             className="message-avatar"
//                         />
//                         <div className="message-content">
//                             {msg.imageUrl && (
//                                 <img src={msg.imageUrl} alt="Uploaded" className="message-image" />
//                             )}
//                             <p>{msg.content}</p>
//                             <span className="message-time">{formatTime(msg.timestamp)}</span>
//                         </div>
//                     </div>
//                 ))}
//                 {loading && (
//                     <div className="chat-message assistant">
//                         <Avatar icon={<RobotOutlined />} className="message-avatar" />
//                         <div className="message-content">
//                             <p className="typing-indicator">Thinking...</p>
//                         </div>
//                     </div>
//                 )}
//                 <div ref={messagesEndRef} />
//             </div>

//             <div className="chat-input-container">
//                 <TextArea
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Ask assistant..."
//                     autoSize={{ minRows: 1, maxRows: 4 }}
//                     disabled={loading}
//                 />
//                 <div className="chat-actions">
//                     <Upload
//                         fileList={fileList}
//                         onChange={handleUploadChange}
//                         beforeUpload={() => false}
//                         maxCount={1}
//                         accept="image/*"
//                         showUploadList={false}
//                     >
//                         <Button icon={<PaperClipOutlined />} type="text" disabled={loading} />
//                     </Upload>

//                     <Button
//                         icon={<AudioOutlined />}
//                         type="text"
//                         danger={recording}
//                         onClick={recording ? stopRecording : startRecording}
//                         disabled={loading}
//                     />

//                     <Button
//                         type="primary"
//                         icon={<SendOutlined />}
//                         onClick={handleSendMessage}
//                         disabled={loading || (!inputValue.trim() && fileList.length === 0)}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chatbox;


import React from 'react';
import MessageList from '@/components/organisms/message-list/MessageList';
import ChatInput from '@/components/organisms/chat-input/ChatInput';
import { useChatbox } from './useChatbox'
import './styles.css';

const Chatbox: React.FC = () => {
    const {
        messages,
        messagesEndRef,
        loading,
        setLoading,
        handleAddChatMessage,
        scrollToBottom,
    } = useChatbox();

    return (
        <div className="chat-box">
            <div className="chat-header">
                <h3>AI Assistant</h3>
                <p>Ask questions or request help with documentation</p>
            </div>

            <MessageList
                messages={messages}
                loading={loading}
                messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
            />

            <ChatInput
                handleAddChatMessage={handleAddChatMessage}
                scrollToBottom={scrollToBottom}
                setLoading={setLoading}
                loading={loading}
            />
        </div>
    );
};

export default Chatbox;