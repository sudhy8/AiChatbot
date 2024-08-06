'use client'

import React from 'react';
import '@chatui/core/dist/index.css';
import Chat, { Bubble, useMessages, setLocale, setTranslations } from '@chatui/core';



const ChatWrapper = () => {

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/distilbert/distilgpt2",
            {
                headers: {
                    Authorization: "Bearer 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",
				"Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    // query({ "inputs": "Can you please let us know more details about your " }).then((response) => {
    //     console.log(JSON.stringify(response));
    // });


    const { messages, appendMsg, setTyping } = useMessages([]);
    // useEffect(() => {
    //     setLocale('en-US');
    // }, []);
 
    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            appendMsg({
                type: 'text',
                content: { text: val },
                position: 'right',
            });

            setTyping(true);


            query({ "inputs": val }).then((response) => { 
                console.log(JSON.stringify(response));
            });
            // setTimeout(() => {

            //     appendMsg({
            //         type: 'text',
            //         content: { text: 'Bala bala' },
            //     });
            //     setTyping(false);
            // }, 1000);
        }
    }

    function renderMessageContent(msg) {
        const { content } = msg;
        return <Bubble content={content.text} />;
    }

    // const customTranslations = {
    //     'en-US': {
    //         inputPlaceholder: 'Type a message...',
    //         send: 'Send',
    //     },
    // };

    // setTranslations(customTranslations);

    return (
        <div style={{height:'100vh'}}>
            <Chat
                locale='en-US'


                navbar={{ title: 'Personal AI Assistant' }}
                messages={messages}
                renderMessageContent={renderMessageContent}
                onSend={handleSend}
                placeholder='Type a message...'
            />
        </div>
       
    );
};

export default ChatWrapper;