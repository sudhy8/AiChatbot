import { useCallback, useState } from "react";
import { MessageRole } from "./enums/MessageRole";
import { Conversations } from "./types";
import { ChatUI } from "./components/chat-ui/ChatUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";

import { HfInference } from "@huggingface/inference";
const TEST_USER_INFO = { firstName: "Sudhy", lastName: "S" };
function App() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  const [chatConversations, setChatConversations] = useState<Conversations>([
    {
      id: "1",
      role: MessageRole.ASSISTANT,
      message:
        "I am your Job assistance bot. How can I help you today?",
    }
  ]);


 
  
  // const hf = new HfInference('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');

  // async function query(data: any) {
  //   console.log("bit", data)
  //   const response = await fetch(
  //     "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large/v1/chat/completions",
  //     {
  //       headers: { Authorization: "Bearer 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" },
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   const result = await response.json();
  //   return result;
  // }

  const aifun = async (value: string) => {
    let fullResponse = "";
    const inference:any = new HfInference("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");

    for await (const chunk of inference.chatCompletionStream({
      model: "microsoft/Phi-3-mini-4k-instruct",
      messages: [{ role: "user", content: value }],
      max_tokens: 500,
    })) {

      // console.log(chunk.choices[0]?.delta?.content || "");
      fullResponse += chunk.choices[0]?.delta?.content || "";

      

    }

    console.log(fullResponse);
    setIsQuerying(false);
    setChatConversations((conversations) => [
      ...conversations,
      {
        id: (conversations.length + 1).toString(),
        role: MessageRole.ASSISTANT,
        message: fullResponse,
      },
    ]);
    return fullResponse;
  }


  const handleSubmit = useCallback((value: string) => {
    setIsQuerying(true);
    setChatConversations((conversations) => [
      ...conversations,
      {
        userInfo: TEST_USER_INFO,
        id: (conversations.length + 1).toString(),
        role: MessageRole.USER,
        message: value,
      },
    ]);

    aifun(value);

    // let test = "hgjhgdhjgasj";
    // setTimeout(() => {
    //   setIsQuerying(false);
    //   setChatConversations((conversations) => [
    //     ...conversations,
    //     {
    //       id: (conversations.length + 1).toString(),
    //       role: MessageRole.ASSISTANT,
    //       message: test,
    //     },
    //   ]);
    // }, 1000);
  }, []);

  return (
    <ChatUI
      isQuerying={isQuerying}
      onSubmit={handleSubmit}
      placeholder="Type here..."
      disabled={isQuerying}
      conversations={chatConversations}
      customSubmitIcon={<FontAwesomeIcon icon={faMailReply} />}
    />
  );
}

export default App;
