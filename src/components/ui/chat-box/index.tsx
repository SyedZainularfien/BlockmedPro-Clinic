'use client';

import { format, isToday, isYesterday, parse } from 'date-fns';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/shared/button';
import FileUploader from '@/components/shared/file-uploader';
import Iconify from '@/components/shared/iconify';
import TextAreaField from '@/components/shared/input-fields/text-area-field';
import { Typography } from '@/components/shared/typography';
import { ChatBoxProps, ChatMessage } from '@/types';

const ChatBox: React.FC<ChatBoxProps> = ({ messages, setMessages, ticket }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const groupedChat: { [key: string]: ChatMessage[] } = {};

  messages.forEach((msg) => {
    try {
      const dateObj = parse(msg.timestamp, 'dd-MMMM-yyyy, hh:mmaaa', new Date());
      const label = isToday(dateObj) ? 'Today' : isYesterday(dateObj) ? 'Yesterday' : format(dateObj, 'dd MMM yyyy');
      if (!groupedChat[label]) groupedChat[label] = [];
      groupedChat[label].push(msg);
    } catch (error) {
      console.warn('Invalid date format:', msg.timestamp, error);
    }
  });

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0] ?? null);
    }
  };

  const handleSend = () => {
    if (!messageText?.trim() && !selectedFile) return;

    const now = new Date();
    const timestamp = format(now, 'dd-MMMM-yyyy, hh:mmaaa');

    const newMessage: ChatMessage = {
      name: 'Waqas ali',
      timestamp,
      isSupport: false,
      text: messageText?.trim(),
      attachment: selectedFile
        ? {
            name: selectedFile.name,
            url: URL.createObjectURL(selectedFile),
            size: `${(selectedFile.size / 1024).toFixed(1)} Kb`,
          }
        : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
    setSelectedFile(null);
  };

  return (
    <div className="h-[95%] w-full flex flex-col">
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
        {Object.entries(groupedChat).map(([label, messages]) => (
          <div key={label}>
            {/* <div className="mb-4 text-center flex justify-center">
              <div className="w-fit text-center text-sm text-primary-text bg-background-color border border-light-gray px-3 py-1 rounded-2xl">
                {label}
              </div>
            </div> */}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isSupport ? 'justify-start' : 'justify-end'} mb-4`}>
                <div
                  className={`max-w-[95%] sm:max-w-[80%] rounded-xl px-4 py-3 ${msg.isSupport ? 'bg-white border border-light-gray' : 'bg-background-gray'}`}
                >
                  <div className="flex flex-col-reverse sm:flex-row gap-1 sm:gap-5 justify-between sm:items-center text-xs text-dark-gray mb-2">
                    <span className="font-semibold">{msg.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="text-md text-primary-text leading-relaxed">{msg.text}</p>
                  {msg.attachment && (
                    <div className="mt-3 border-t border-light-gray pt-2.5">
                      <Link
                        href={msg.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#E3F0FF] text-black text-sm px-3 py-1 rounded-full"
                      >
                        {msg.attachment.name} ({msg.attachment.size})
                      </Link>
                      {/* <div className="inline-block bg-[#E3F0FF] text-black text-sm px-3 py-1 rounded-full">
                        {msg.attachment.name} ({msg.attachment.size})
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <hr className="text-light-gray" />
      {ticket.status !== 'Active' && (
        <div className="flex justify-center sm:justify-between items-start sm:items-center gap-5 mt-3">
          <Typography size={'sm'} className="text-dark-gray">
            This issue was resolved and closed by the support team.
          </Typography>
          <Typography size={'sm'} className="text-dark-gray">
            22 Aug 2024, 12:43PM
          </Typography>
        </div>
      )}
      {/* Message Input */}
      {ticket.status === 'Active' && (
        <div className="pt-4 border-light-gray space-y-5">
          <TextAreaField
            label="Message"
            placeholder="Type Here..."
            rows={5}
            value={messageText}
            onChange={(e: any) => setMessageText(e.target.value)}
          />
          <div className="space-y-5">
            <div className="w-full space-y-3">
              <div className="flex flex-col gap-1">
                <Typography as="p" size="lg" className="font-bold text-primary-text">
                  Files:
                </Typography>
                <FileUploader onFileSelect={handleFileUpload} accept="image/*" />
              </div>
              {selectedFile && (
                <div className="flex justify-between items-end px-2 text-sm text-dark-gray">
                  <span className="max-w-[85%]">Attached: {selectedFile.name}</span>
                  <button type="button" className="w-5 h-5" onClick={() => setSelectedFile(null)}>
                    <Iconify icon="iconoir:delete-circle" className="text-red w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-start pt-4">
              <Button
                type="button"
                size="medium"
                variant="primary"
                className="sm:w-fit font-semibold !text-lg"
                disabled={!messageText.trim() && !selectedFile}
                onClick={handleSend}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
