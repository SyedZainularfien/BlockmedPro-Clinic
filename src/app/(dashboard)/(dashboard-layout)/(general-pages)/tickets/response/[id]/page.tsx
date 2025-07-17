'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import { Typography } from '@/components/shared/typography';
import ChatBox from '@/components/ui/chat-box';
import { content } from '@/data';
import { ChatMessage } from '@/types';

const Responses = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(content?.singleTicketData?.ChatWithDoctorData);

  const { id } = useParams();

  const ticketsData = content.allTickets;
  const ticket = ticketsData.find((ticket) => ticket.ticket_no === Number(id));

  const router = useRouter();

  useEffect(() => {
    if (!ticket) {
      router.push('/404');
    }
  }, [ticket, router]);

  if (!ticket) return null;

  return (
    <DashboardWrapper backButton title="Response" subTitle="Check your issue details, responses and replies">
      <div className="flex flex-col-reverse xl:flex-row gap-5">
        <div className="w-full xl:w-[70%]">
          <Container hasBorders styling="py-5 px-10">
            <ChatBox messages={messages} setMessages={setMessages} ticket={ticket} />
          </Container>
        </div>
        <div className="w-full xl:w-[30%]">
          <Container hasBorders styling="p-6 flex flex-col gap-4">
            <Typography size="lg" as="p" className="text-black font-bold">
              Ticket Details
            </Typography>
            <hr className="text-light-gray" />
            <Container hasBorders styling="space-y-4 p-4">
              {/* Ticket Number */}
              <div className="flex justify-between items-center">
                <Typography size={'sm'} className="text-black font-semibold">
                  Ticket #
                </Typography>
                <Typography size={'sm'} className="text-dark-gray">
                  1238912
                </Typography>
              </div>

              {/* Issue Date */}
              <div className="flex justify-between items-center">
                <Typography size={'sm'} className="text-black font-semibold">
                  Issue Date
                </Typography>
                <Typography size={'sm'} className="text-dark-gray">
                  23 July 2024 - 2:20 PM
                </Typography>
              </div>

              {/* Subject */}
              <div className="flex justify-between items-center">
                <Typography size={'sm'} className="text-black font-semibold">
                  Subject
                </Typography>
                <div className="text-sm text-gray-500 text-right max-w-[60%]">
                  <Typography size={'sm'} className="text-dark-gray">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                  </Typography>
                </div>
              </div>

              {/* Department */}
              <div className="flex justify-between items-center">
                <Typography size={'sm'} className="text-black font-semibold">
                  Department
                </Typography>
                <Typography size={'sm'} className="text-dark-gray">
                  Pharmacy
                </Typography>
              </div>

              {/* Priority */}
              <div className="flex justify-between items-center">
                <Typography size={'sm'} className="text-black font-semibold">
                  Priority
                </Typography>
                <Typography size={'sm'} className="text-dark-gray">
                  Urgent
                </Typography>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <Typography size={'sm'} className="text-black font-semibold">
                  Status
                </Typography>
                <div
                  className={`py-2 px-4 ${ticket?.status === 'Active' ? 'bg-[#D9F6DA] text-green' : 'bg-light-gray text-dark-gray'} rounded-lg`}
                >
                  <Typography size={'sm'} className="">
                    {ticket?.status}
                  </Typography>
                </div>
              </div>
            </Container>
          </Container>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Responses;
