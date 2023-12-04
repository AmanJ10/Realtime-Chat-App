import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'
import styles from './styles.module.css';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + (emoji.id || emoji.colons));
  };

  return (
    <div className={styles.sendMessageContainer}>
      <div style={{ position: 'relative' }}>
        <input
          className={styles.messageInput}
          placeholder='Message...'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={sendMessage}>
          Send Message
        </button>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😊
        </button>
        {showEmojiPicker && (
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        )}
      </div>
    </div>
  );
};

export default SendMessage;