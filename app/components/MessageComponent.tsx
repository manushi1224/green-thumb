import Image from "next/image";
import { Message } from "./ChatGemini";

type Props = {
  messages: Message[];
};

const roleLabel = (msg: Message) => {
  return (
    <div
      className={`${
        msg.role === "user"
          ? " bg-green-400 max-w-12"
          : " bg-green-200 max-w-24"
      }  text-center max-h-10 text-sm text-slate-950 rounded-full py-1 `}
    >
      {msg.role == "user" ? "You" : "GreenThumb"}
    </div>
  );
};

const messageParts = (msg: Message) => {
  return msg.parts.map((m, index) => {
    return (
      <span className="p-6" key={index}>
        {msg.role == "user" ? (
          m.text
        ) : (
          <span dangerouslySetInnerHTML={{ __html: m.text }}></span>
        )}
      </span>
    );
  });
};

const MessageComponent = ({ messages }: Props) => {
  return messages.map((msg: Message, index) => {
    return (
      <div className="p-4 flex flex-col gap-4" key={index}>
        {roleLabel(msg)}
        <div className="flex flex-col align-middle bg-green-200 rounded-xl bg-opacity-10">
          {msg.image && (
            <Image
              src={msg.image}
              alt="profile"
              className="bg-cover w-80 h-80 ms-4 mt-4 rounded-md"
              width={200}
              height={200}
            ></Image>
          )}
          {messageParts(msg)}
        </div>
      </div>
    );
  });
};

export default MessageComponent;
