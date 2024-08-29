import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Chatroom({ userData, currentRoom }) {
  const room = currentRoom._id;
  const [messages, setMessages] = useState([]); //all messages within selected room

  //useEffect for messages refetch on currentRoom change
  useEffect(() => {
    if (currentRoom) {
    messagesByRoom();
    }
  }, [currentRoom]);

  async function messagesByRoom() {
    const response = await fetch(`http://localhost:3000/messages/${room}`);
    const data = await response.json();
    console.log("This is the DATA", data);
    setMessages(data);
  }

  return (
    <div className="inline-flex flex-col top-0 left-0 z-40 w-90 text-wrap h-screen transition-transform -translate-x-full sm:translate-x-0">
      <h2 className="flex uppercase text-center text-5xl font-bold tracking-widest text-gray-500 dark:text-gray-400">
        Chatroom
      </h2>
      
      {currentRoom && (
      <div>
      <MessageList messages={messages} currentRoom={currentRoom}/>

      <MessageInput messagesByRoom={messagesByRoom} userData={userData} currentRoom={currentRoom} messages={messages}/>
      </div>
      )}

    </div>
  );
}
