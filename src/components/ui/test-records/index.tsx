'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import DataTable from '@/components/shared/data-table';
import DateRange from '@/components/shared/date-range';
import Iconify from '@/components/shared/iconify';
import InputTextField from '@/components/shared/input-fields/input-text-field';
import SearchInput from '@/components/shared/input-fields/search-bar';
import Tooltip from '@/components/shared/tooltip';
import { Typography } from '@/components/shared/typography';
import UploadFile from '@/components/shared/upload-file';
import ActivityLogs from '@/components/ui/activity-logs';
import { content } from '@/data';
import { IDragEventHandlers, IDropEvent, IFileUpload, ITestRecordUploadedFile } from '@/types';

const TestRecords = () => {
  const { testRecordTableData, testRecordFiles } = content.testRecords;

  const [testRecords, setTestRecords] = useState(testRecordTableData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const paginatedData = testRecords.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const meta = {
    totalItems: testRecords.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(testRecords.length / rowsPerPage),
  };

  const [uploadedFiles, setUploadedFiles] = useState<IFileUpload[]>(
    testRecordFiles?.map((file) => ({ ...file, file: undefined }))
  );
  const [dragActive, setDragActive] = useState(false);
  const [comments, setComments] = useState('');

  const handleIFileUpload = (files: File[]): void => {
    const newFiles: IFileUpload[] = Array.from(files)?.map((file, index) => {
      const fileExtension: string = file.name.split('.').pop()?.toUpperCase() || '';
      const fileSizeKB: number = Math.round(file.size / 1024);

      return {
        id: (uploadedFiles.length + index + 1).toString(),
        type: fileExtension,
        fileName: file.name.replace(/\.[^/.]+$/, ''),
        format: fileExtension,
        size: `${fileSizeKB} kb`,
        file: file,
      };
    });

    setUploadedFiles((prev: IFileUpload[]) => [...prev, ...newFiles]);
  };

  const handleDrag = (e: IDragEventHandlers): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: IDropEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files: FileList = e.dataTransfer.files;
    const allowedTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const validFiles: File[] = Array.from(files).filter((file: File) => allowedTypes.includes(file.type));

    if (validFiles.length > 0) {
      handleIFileUpload(validFiles);
    } else {
      alert('Please upload only PNG, JPG, or PDF files');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleIFileUpload(Array.from(files));
    }
  };

  const removeFile = (fileId: string): void => {
    setUploadedFiles((prev: ITestRecordUploadedFile[]) =>
      prev.filter((file: ITestRecordUploadedFile) => file.id !== fileId)
    );
  };

  const handleSubmit = () => {
    toast.success('Test Record Uploaded Successfully');

    // setTestRecords((prev) => [newRecord, ...prev]);

    setComments('');

    // Reset file input
    const fileInput = document.getElementById('file-input');
    if (fileInput) (fileInput as HTMLInputElement).value = '';
  };

  return (
    <DashboardWrapper title="Test Records" subTitle="View And Upload Patient Test Reports Here">
      <div className="flex flex-col xl:flex-row gap-5">
        {/* Left side */}
        <section className="w-full flex flex-col gap-5 xl:w-[67%]">
          <Container hasBorders>
            <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex justify-start items-center gap-2">
                <Typography size={'lg'} as={'p'} className="text-black font-bold">
                  Upload Test Reports
                </Typography>
                {/* info icon */}
                <Tooltip
                  message="Upload all medical test reports of this patient here (if any)."
                  trigger="hover"
                  position="bottom-right"
                >
                  <Iconify
                    icon="material-symbols:info-outline-rounded"
                    className="text-dark-gray cursor-pointer"
                    width={20}
                    height={20}
                  />
                </Tooltip>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* File Drop Zone */}
                <div className="w-full sm:w-1/2">
                  <UploadFile
                    dragActive={dragActive}
                    handleDrag={handleDrag}
                    handleDrop={handleDrop}
                    handleFileInputChange={handleFileInputChange}
                  />
                </div>

                {/* File List */}
                <div className="w-full sm:w-1/2">
                  {uploadedFiles?.length > 0 && (
                    <div className="min-h-[218px] max-h-[218px] border border-light-gray rounded-xl">
                      <div className="p-3.5 w-full min-h-[205px] max-h-[216px] overflow-y-auto flex flex-col gap-2.5 custom-scrollbar">
                        {uploadedFiles?.map((file) => (
                          <div key={file.id} className="flex items-center justify-between w-full gap-3.5">
                            <Typography
                              size="sm"
                              as="p"
                              className="w-13 text-center text-primary-light bg-light-blue p-2 rounded-lg border font-semibold border-primary-light"
                            >
                              {file.type}
                            </Typography>

                            <Typography size="md" className="flex-1 text-black truncate">
                              {file.fileName}
                            </Typography>

                            <Typography size="sm" className="w-9 text-black text-center truncate">
                              {file.format}
                            </Typography>

                            <Typography size="sm" className="w-10 text-black text-center truncate">
                              {file.size}
                            </Typography>

                            <button onClick={() => removeFile(file.id)} className="hover:bg-red-50 p-1 rounded">
                              <Iconify
                                icon="material-symbols:cancel-outline-rounded"
                                className="text-red cursor-pointer"
                                width="24"
                                height="24"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <InputTextField
                  label="Comments"
                  placeholder="Type comments here"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    disabled={uploadedFiles.length === 0}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      uploadedFiles.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-dark text-white'
                    }`}
                  >
                    Save Reports
                  </Button>
                </div>
              </div>
            </div>
          </Container>
          <Container hasBorders>
            <div className="flex flex-col gap-5 py-4 sm:py-5">
              <div className="flex flex-wrap gap-5 px-4 sm:px-6">
                <SearchInput />
                <div className="w-full lg:w-fit">
                  <DateRange data={testRecords} filterKey="date" onFilter={setTestRecords} />
                </div>
              </div>
              <hr className="text-light-gray" />
              <div className="px-4 sm:px-6">
                <DataTable
                  meta={meta}
                  paginate={true}
                  headerColor="bg-white"
                  tableRows={paginatedData}
                  ColumnsData={content.columns?.testRecordColumn}
                  headerClassName="text-gray-700"
                  setCurrentPage={setCurrentPage}
                  setRowsPerPage={setRowsPerPage}
                  TableBodyRow={({ id, idx, date, fileName, fileType, comments }: any) => (
                    <tr
                      style={{
                        backgroundColor: idx % 2 === 0 ? 'rgba(237, 237, 237, 0.8)' : 'rgba(237, 237, 237, 0.2)',
                        textWrap: 'nowrap',
                      }}
                      key={id}
                    >
                      <td className="px-4 sm:px-6 py-3.5 text-start">
                        <Typography size={'md'} className="text-dark-gray font-normal">
                          {date || '--'}
                        </Typography>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 text-start">
                        <Typography size={'md'} className="text-dark-gray font-normal">
                          {fileName || '--'}
                        </Typography>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 text-start">
                        <Typography size={'md'} className="text-dark-gray font-normal">
                          {fileType || '--'}
                        </Typography>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 text-start">
                        <Typography size={'md'} className="text-dark-gray font-normal">
                          {comments || '--'}
                        </Typography>
                      </td>

                      <td className="text-center px-4 lg:px-6 py-3.5">
                        {/* eye icon */}
                        <Iconify
                          icon="mdi:eye"
                          width="20"
                          height="20"
                          className="text-white bg-primary-dark p-0.75 rounded-sm cursor-pointer"
                        />
                      </td>
                    </tr>
                  )}
                />
              </div>
            </div>
          </Container>
        </section>
        {/* Activity Logs */}
        <section className="w-full xl:w-[33%]">
          <ActivityLogs />
        </section>
      </div>
    </DashboardWrapper>
  );
};

export default TestRecords;
