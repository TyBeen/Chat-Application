const MessageList = ({ messages }) => {

  return (
    <div className="inline-block space-y-6 font-medium">

      {messages.map((message) => (
        <div key={message._id} className="space-y-2 font-medium">
          <strong>{message.user}</strong>: {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessageList;