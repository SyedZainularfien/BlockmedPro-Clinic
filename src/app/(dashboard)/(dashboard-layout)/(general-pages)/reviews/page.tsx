'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import SimpleRadialChart from '@/components/shared/charts/simple-radial-chart';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DateRange from '@/components/shared/date-range';
import Iconify from '@/components/shared/iconify';
import SearchInput from '@/components/shared/input-fields/search-bar';
import { Typography } from '@/components/shared/typography';
import ReviewModal from '@/components/ui/modals/review-message-modal';
import StarRating from '@/components/ui/star-rating';
import { content } from '@/data';

const Reviews = () => {
  const negative = false;
  const reviews = content.reviewsData;
  const [flaggedReviewId, setFlaggedReviewId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [responseText, setResponseText] = useState('');
  const [repliesCount, setRepliesCount] = useState<Record<number, number>>({});
  const reviewsPerPage = 6;

  const handleReplyClick = (review: any) => {
    setSelectedReview(review);
    setResponseText('');
  };

  const handleSendResponse = () => {
    if (selectedReview) {
      setRepliesCount((prev) => ({
        ...prev,
        [selectedReview.id]: (prev[selectedReview.id] || 0) + 1,
      }));
    }
    setSelectedReview(null);
    console.log('Response sent:', selectedReview?.id, responseText);
  };
  const handleCancelResponse = () => {
    setSelectedReview(null);
  };

  // Calculate current reviews
  const offset = currentPage * reviewsPerPage;
  const currentReviews = reviews.slice(offset, offset + reviewsPerPage);
  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleFlagReview = (reviewId: number): void => {
    setFlaggedReviewId((prevId) => (prevId === reviewId ? null : reviewId));
    console.log(`Review with ID ${reviewId} ${flaggedReviewId === reviewId ? 'unflagged' : 'flagged'}`);
  };

  return (
    <DashboardWrapper title="Reviews" subTitle="All Reviews">
      <div className="flex flex-col gap-5">
        {/* stats */}
        <div className="flex flex-col xl:flex-row gap-5">
          <div className="w-full xl:w-1/3">
            <Container>
              <div className="flex flex-col gap-[9px] px-5 py-4 sm:px-10 sm:py-8">
                <Typography size={'lg'} className="text-black font-bold">
                  Total Reviews
                </Typography>
                <div className="flex flex-wrap gap-2 justify-start items-center">
                  <Typography size={'h3'} className="text-black font-bold">
                    1.2k
                  </Typography>
                  <div className="flex items-center">
                    <div>
                      <Iconify
                        height="25"
                        width="25"
                        icon={negative ? 'uil:arrow-down' : 'uil:arrow-up'}
                        className={`${negative ? 'text-red' : 'text-light-green'}`}
                      />
                    </div>
                    <div className="">
                      <Typography size={'sm'} className={`${negative ? 'text-red' : 'text-light-green'} font-semibold`}>
                        {'35%'}
                      </Typography>
                    </div>
                  </div>
                </div>
                <Typography size={'md'} className="text-dark-gray font-normal">
                  Growth in reviews on this year
                </Typography>
              </div>
            </Container>
          </div>
          <div className="w-full">
            <Container>
              <div className="flex flex-col sm:flex-row justify-center items-center px-5 py-4 sm:px-10 sm:py-4">
                {/* stats */}
                <div>
                  <Typography size={'lg'} className="text-black font-bold">
                    Average Ratings
                  </Typography>
                  <div className="flex flex-wrap gap-5 justify-start items-center">
                    <Typography size={'h3'} className="text-black font-bold">
                      4.6
                    </Typography>
                    <div className="flex items-center">
                      <StarRating defaultRating={4.6} readOnly />
                    </div>
                  </div>
                  <Typography size={'md'} className="text-dark-gray font-normal">
                    Average rating on this year
                  </Typography>
                </div>
                {/* chart */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 sm:mt-0">
                  <div className="flex flex-col items-center justify-center">
                    <SimpleRadialChart
                      isPercentage
                      height={138}
                      data={[{ name: 'Positive', value: 70, color: '#2D58E6' }]}
                    />
                    <Typography size={'md'} className="text-black font-semibold">
                      Excellent
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <SimpleRadialChart
                      isPercentage
                      height={138}
                      data={[{ name: 'Positive', value: 15, color: '#FAD035' }]}
                    />
                    <Typography size={'md'} className="text-black font-semibold">
                      Positive
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <SimpleRadialChart
                      isPercentage
                      height={138}
                      data={[{ name: 'Positive', value: 10, color: '#C9311A' }]}
                    />
                    <Typography size={'md'} className="text-black font-semibold">
                      Negative
                    </Typography>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
        {/* search bar and calender */}
        <Container>
          <div className="flex flex-col sm:flex-row gap-5 justify-between items-center px-5 py-3">
            <SearchInput />
            <div className="w-full sm:w-auto">
              <DateRange data={[]} filterKey="date" onFilter={(selectedDateRange) => console.log(selectedDateRange)} />
            </div>
          </div>
        </Container>
        {/* Cards */}
        {reviews.length > 0 && (
          <div className="flex flex-col gap-5">
            {Array.from({ length: Math.ceil(currentReviews.length / 2) }, (_, i) => (
              <div key={i} className="flex flex-col xl:flex-row gap-5">
                {currentReviews.slice(i * 2, i * 2 + 2)?.map((review, index) => {
                  const uniqueId = offset + i * 2 + index;
                  const isFlagged = flaggedReviewId === uniqueId;

                  return (
                    <Container key={uniqueId} leftBorder>
                      <div className="py-3 px-8 sm:py-6 sm:px-10 h-[240px] flex flex-col">
                        <div className="flex flex-col gap-3 h-full">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-2">
                              <Typography size="lg" className="text-black font-bold">
                                {review.name}
                              </Typography>
                              <StarRating defaultRating={review.rating} readOnly />
                            </div>
                            <button
                              onClick={() => handleFlagReview(uniqueId)}
                              className={`relative cursor-pointer flex items-center justify-center w-11 h-11 rounded-full bg-white ${
                                isFlagged ? 'border-2 border-red' : 'border-2 border-light-gray'
                              }`}
                            >
                              <Iconify icon="akar-icons:flag" className={isFlagged ? 'text-red' : 'text-dark-gray'} />
                            </button>
                          </div>

                          <div className="flex-grow overflow-y-auto mb-2 scrollbar-hide">
                            <Typography size="sm" className="text-black font-normal">
                              {review.message}
                            </Typography>
                          </div>

                          <div className="mt-auto flex justify-between items-center">
                            <button className="cursor-pointer" onClick={() => handleReplyClick(review)}>
                              <div className="flex items-center gap-1">
                                <Typography size="lg" className="text-primary-light font-semibold">
                                  {(repliesCount[review?.id] ?? 0) > 0 ? 'Replied' : 'Reply'}
                                </Typography>
                                {(repliesCount[review?.id] ?? 0) > 0 && (
                                  <Typography size="lg" className="text-primary-light font-semibold">
                                    ({repliesCount[review?.id]})
                                  </Typography>
                                )}
                              </div>
                            </button>
                            <Typography size="sm" className="text-dark-gray">
                              {review.date}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Container>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        {reviews.length > 0 && (
          <div className="w-full flex flex-col md:flex-row justify-end gap-4 md:gap-5 items-end md:items-center">
            <div className="">
              <Typography size="sm" className="text-dark-charcoal">
                Result {offset + 1} - {Math.min(offset + reviewsPerPage, reviews.length)} of {reviews.length}
              </Typography>
            </div>
            <div className="flex justify-center items-center">
              <ReactPaginate
                pageCount={pageCount}
                breakLabel="..."
                onPageChange={handlePageClick}
                forcePage={currentPage}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                previousLabel={
                  <span className="text-gray cursor-pointer">
                    <Iconify icon="grommet-icons:form-previous" width="18" height="18" />
                  </span>
                }
                nextLabel={
                  <span className="text-gray cursor-pointer">
                    <Iconify icon="grommet-icons:form-next" width="18" height="18" />
                  </span>
                }
                containerClassName="flex justify-center items-center gap-2"
                pageClassName="w-8 h-8 flex justify-center items-center text-dark-gray rounded-full cursor-pointer"
                activeClassName="border-2 border-primary-light text-primary-light"
                breakClassName="w-8 h-8 flex justify-center items-center"
              />
            </div>
          </div>
        )}
      </div>
      {reviews.length === 0 && (
        <div className="h-[400px] w-full flex flex-col items-center justify-center gap-3">
          <Image src="/assets/svgs/no-data.svg" alt="no-data" width={85} height={85} />
          <Typography size="lg" className="font-bold text-dark-gray">
            {'No Reviews Added Yet'}
          </Typography>
        </div>
      )}
      {selectedReview && (
        <div className="">
          <ReviewModal
            onCancel={handleCancelResponse}
            onSend={handleSendResponse}
            responseValue={responseText}
            review={reviews.find((r) => r.id === selectedReview.id)?.message || ''}
            onResponseChange={(e) => setResponseText(e.target.value)}
          />
        </div>
      )}
    </DashboardWrapper>
  );
};

export default Reviews;
