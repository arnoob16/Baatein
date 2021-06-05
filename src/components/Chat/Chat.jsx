import { useChat } from 'context';
import { useEffect } from 'react';

export const Chat = () => {
    const stuff = useChat();

    useEffect(() => {
        console.log(stuff);
    }, [stuff]);

    return <>I am the chat</>;
};
