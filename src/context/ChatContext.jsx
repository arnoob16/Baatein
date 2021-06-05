import { fb } from 'service';
import { createContext, useState, useEffect, useContext } from 'react';
import { deleteChat, getMessages, leaveChat, newChat } from 'react-chat-engine';

export const ChatContext = createContext();
export const ChatProvider = ({ children, authUser }) => {
    const [myChats, setMyChats] = useState();
    const [chatConfig, setChatConfig] = useState();
    const [selectedChat, setSelectedChat] = useState();

    const createChatClick = () => {
        newChat(chatConfig, { title: '' });
    };

    const deleteChatClick = chat => {
        const isAdmin = chat.admin === chatConfig.userName;
        if (
            isAdmin &&
            window.confirm('Are you sure you want to delete this chat?')
        ) {
            deleteChat(chatConfig, chat.id);
        } else if (
            window.confirm('Are you sure you want to leave this chat?')
        ) {
            leaveChat(chatConfig, chat.id, chatConfig.userName);
        }
    };

    const selectedChatClick = chat => {
        getMessages(chatConfig, chat.id, messages => {
            setSelectedChat({
                ...chat,
                messages,
            });
        });
    };

    useEffect(() => {
        if (authUser) {
            fb.firestore
                .collection('chatUsers')
                .doc(authUser.uid)
                .onSnapshot(snap => {
                    setChatConfig({
                        userSecret: authUser.uid,
                        avatar: snap.get('avatar'),
                        userName: snap.get('userName'),
                        projectID: 'bf4cc3bb-1a09-46db-bc91-a46f9b473b89',
                    });
                });
        }
    }, [authUser]);

    return (
        <ChatContext.Provider
            value={{
                myChats,
                setMyChats,
                chatConfig,
                setChatConfig,
                selectedChat,
                setSelectedChat,
                createChatClick,
                deleteChatClick,
                selectedChatClick,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const {
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        createChatClick,
        deleteChatClick,
        selectedChatClick,
    } = useContext(ChatContext);

    return {
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        createChatClick,
        deleteChatClick,
        selectedChatClick,
    };
};
