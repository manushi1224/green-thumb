"use client";
import { ChatSession, GoogleGenerativeAI, Part } from "@google/generative-ai";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { generationConfig, safetySettings } from "../config/geminiConfig";
import fileToGenerativePath from "../lib/fileToGenerativePath";
import markdownToHTML from "../lib/markdownToHTML";
import Loader from "../ui/Loader";
import FormComponents from "./FormComponents";
import MessageComponent from "./MessageComponent";

type Props = {};

export type Message = {
  role: string;
  parts: { text: string }[];
  image?: string;
};

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

function ChatGemini({}: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [chat, setChat] = useState<ChatSession>();
  const dummy = useRef<HTMLElement>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [imageUpload, setImageUpload] = useState<File>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "user",
      parts: [{ text: "Hello there!" }],
      image: "",
    },
    {
      role: "model",
      parts: [
        {
          text: "Hello! 👋 What can I help you with today? I'm happy to help you with any plant problems or gardening questions you might have! 🌱",
        },
      ],
    },
  ]);
  const genAI = new GoogleGenerativeAI(API_KEY as string);

  useEffect(() => {
    function initChat() {
      const chatSession: ChatSession = genAI
        .getGenerativeModel({
          model: "gemini-1.5-flash-latest",
          systemInstruction: `You are GreenThumb and you are a botanist, help your customers by identifying the problems in the plant, 
          how to take care of plants, you answers should be more friendly, creative and be helpful and stay positive.
          You are best at carrying out plant details, researching plant, Studying plants, Testing plants and analyzing responses,
          Attention to detail, observation, critical thinking, helping, friendly answering, being creative, Finding botanical solutions.
          Remember that you are botanist, so you can not answer anything else except botany.`,
        })
        .startChat({
          generationConfig,
          safetySettings,
          history: messages.map((msg) => ({
            role: msg.role,
            parts: msg.parts,
          })),
        });
      setChat(chatSession);
    }

    initChat();
  }, []);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const generateAnswer = async (e: FormEvent) => {
    e.preventDefault();
    const message = {
      parts: [{ text: prompt }],
      role: "user",
      image: imagePreview,
      timeStamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);

    if (chat) {
      console.log(chat);
      setLoading(true);
      let imageParts = null;
      if (imageUpload) {
        imageParts = await fileToGenerativePath(imageUpload as File);
      }
      setImagePreview(undefined);
      setPrompt("");
      setImageUpload(undefined);
      let result;
      if (imageUpload) {
        result = await chat.sendMessageStream([
          prompt,
          imageParts as string | Part,
        ]);
      } else {
        result = await chat.sendMessageStream([prompt]);
      }
      const textResponse = await result.response;
      const html_text = markdownToHTML(textResponse.text());
      const geminiMessage = {
        parts: [{ text: html_text as string }],
        role: "model",
        timeStamp: new Date(),
      };
      setMessages((prev) => [...prev, geminiMessage]);
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-[70%] w-full flex flex-col justify-between">
      <div>
        <MessageComponent messages={messages} />
        {loading && <Loader />}
        <div ref={dummy as React.RefObject<HTMLDivElement>} className="mb-10" />
      </div>
      <FormComponents
        generateAnswer={generateAnswer}
        imagePreview={imagePreview as string}
        setImagePreview={setImagePreview}
        setImageUpload={setImageUpload}
        prompt={prompt}
        setPrompt={setPrompt}
      />
    </div>
  );
}

export default ChatGemini;
