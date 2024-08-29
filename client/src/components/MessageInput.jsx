import { useState } from "react";

export default function MessageInput({ messagesByRoom, userData, currentRoom }) {
  const yourJwtToken = localStorage.getItem("jwtToken"); //for authorization
  const [message, setMessage] = useState(""); //new message

  async function handleSendMessage(e) {
    e.preventDefault();
    try {
      const body = e.target.messageContent.value;
      const user = userData._id;
      const room = currentRoom._id;
      const creator = userData._id;
      const bodyObj = { body: body, user: user, room: room, creator: creator };

      const response = await fetch("http://localhost:3000/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourJwtToken}`,
        },
        body: JSON.stringify(bodyObj), // Adjust user data as needed
      });
      const data = response.json();
      setMessage(data);

      messagesByRoom(); //refetch all messages list for current room
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <div className="block">
      <form
        className="max-w-sm mx-auto"
        onSubmit={(e) => {
          handleSendMessage(e);
        }}
      >
        <div className="mb-5">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          id="messageContent"
          placeholder="Type your message..."
        />
        </div>
        <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Send</button>
        
      </form>
    </div>
  );
}