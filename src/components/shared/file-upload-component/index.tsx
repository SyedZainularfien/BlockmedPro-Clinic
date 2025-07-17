'use client';

import React, { FC, useRef, useState } from 'react';

import Iconify from '../iconify';
import { Typography } from '../typography';

interface FileUploadComponentProps {
  onFileUpload: (file: File | null) => void;
  initialFileName?: string | null;
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  fileName: string | null;
  fileSize: string | null;
  uploadSpeed: number;
  isComplete: boolean;
  fileType: string | null;
}

interface FileIconData {
  icon: string;
  color: string;
  bgColor: string;
}

const FileUploadComponent: FC<FileUploadComponentProps> = ({ onFileUpload, initialFileName = null }) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    fileName: initialFileName,
    fileSize: null,
    uploadSpeed: 0,
    isComplete: false,
    fileType: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string | null, fileType: string | null, isUploading: boolean): FileIconData => {
    // Show document icon while uploading
    if (isUploading) {
      return {
        icon: 'material-symbols:description-outline',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
      };
    }

    // Determine icon based on file type or extension
    const extension = fileName?.split('.').pop()?.toLowerCase();

    // PDF files
    if (fileType?.includes('pdf') || extension === 'pdf') {
      return {
        icon: 'uiw:file-pdf',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
      };
    }

    // Word documents
    if (
      fileType?.includes('document') ||
      fileType?.includes('msword') ||
      fileType?.includes('wordprocessingml') ||
      (extension && ['doc', 'docx'].includes(extension))
    ) {
      return {
        icon: 'vscode-icons:file-type-word',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      };
    }

    // Excel files
    if (
      fileType?.includes('sheet') ||
      fileType?.includes('excel') ||
      (extension && ['xls', 'xlsx', 'csv'].includes(extension))
    ) {
      return {
        icon: 'vscode-icons:file-type-excel',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    }

    // PowerPoint files
    if (fileType?.includes('presentation') || (extension && ['ppt', 'pptx'].includes(extension))) {
      return {
        icon: 'vscode-icons:file-type-powerpoint',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
      };
    }

    // Image files
    if (
      fileType?.includes('image') ||
      (extension && ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(extension))
    ) {
      return {
        icon: 'material-symbols:image-outline',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
      };
    }

    // Text files
    if (fileType?.includes('text') || (extension && ['txt', 'rtf'].includes(extension))) {
      return {
        icon: 'material-symbols:text-snippet-outline',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
      };
    }

    // Video files
    if (fileType?.includes('video') || (extension && ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(extension))) {
      return {
        icon: 'material-symbols:video-file-outline',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      };
    }

    // Audio files
    if (fileType?.includes('audio') || (extension && ['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(extension))) {
      return {
        icon: 'material-symbols:audio-file-outline',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
      };
    }

    // Archive files
    if (extension && ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return {
        icon: 'material-symbols:folder-zip-outline',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
      };
    }

    // Default file icon
    return {
      icon: 'material-symbols:draft-outline',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
    };
  };

  const simulateUpload = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const fileSize = file.size;
      const minDuration = 1000;

      setUploadState((prev) => ({
        ...prev,
        isUploading: true,
        progress: 0,
        fileName: file.name,
        fileSize: formatFileSize(fileSize),
        fileType: file.type,
        isComplete: false,
      }));

      const updateProgress = (): void => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / minDuration) * 100, 100);
        const bytesUploaded = (progress / 100) * fileSize;
        const speed = elapsed > 0 ? (bytesUploaded / elapsed) * 1000 : 0; // bytes per second

        setUploadState((prev) => ({
          ...prev,
          progress: Math.round(progress),
          uploadSpeed: Math.round(speed),
        }));

        if (progress < 100) {
          setTimeout(updateProgress, 50);
        } else {
          setUploadState((prev) => ({
            ...prev,
            isUploading: false,
            isComplete: true,
          }));
          resolve();
        }
      };

      updateProgress();
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    await simulateUpload(file);

    // Call the parent callback
    onFileUpload(file);
  };

  const handleRemoveFile = (): void => {
    setUploadState({
      isUploading: false,
      progress: 0,
      fileName: null,
      fileSize: null,
      uploadSpeed: 0,
      isComplete: false,
      fileType: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onFileUpload(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await simulateUpload(file);
    onFileUpload(file);
  };

  const formatSpeed = (bytesPerSecond: number): string => {
    if (bytesPerSecond < 1024) return `${bytesPerSecond}B/s`;
    if (bytesPerSecond < 1024 * 1024) return `${Math.round(bytesPerSecond / 1024)}KB/s`;
    return `${Math.round(bytesPerSecond / (1024 * 1024))}MB/s`;
  };

  const fileIconData = getFileIcon(uploadState.fileName, uploadState.fileType, uploadState.isUploading);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Typography size={'md'} as={'p'} className="text-black font-semibold">
          Upload Document
        </Typography>
      </div>

      {!uploadState.fileName && !uploadState.isUploading ? (
        <div
          className="h-36 flex justify-center items-center border-2 border-dashed border-light-gray rounded-lg p-5 hover:border-primary-dark transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <Iconify icon="material-symbols:upload-rounded" width="24" height="24" className="text-primary-dark" />
            <div className="flex flex-col justify-center items-center sm:flex-row  text-center">
              <Typography size={'md'} as={'p'} className="text-primary-dark underline underline-offset-2 font-semibold">
                Choose File
              </Typography>
              <Typography size={'md'} as={'p'} className="text-dark-gray font-semibold ml-1">
                or drag and drop file here
              </Typography>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        <div className="p-4 sm:p-5 border border-light-gray rounded-xl">
          <div className="w-full lg:w-1/2 border border-light-gray h-[100px] rounded-xl pl-5 pr-2.5 pb-4 pt-2.5">
            <div className="flex justify-end items-start">
              {(uploadState.fileName || uploadState.isUploading) && (
                <button onClick={handleRemoveFile} disabled={uploadState.isUploading}>
                  <Iconify icon="zondicons:minus-solid" width={20} color="#C9311A" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${fileIconData.bgColor} rounded-lg flex items-center justify-center`}>
                <Iconify icon={fileIconData.icon} width="24" height="24" className={fileIconData.color} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-black">{uploadState.fileName || 'Document.pdf'}</span>
                  <span className="text-sm text-dark-gray">{uploadState.fileSize || '20KB'}</span>
                </div>

                {uploadState.isUploading ? (
                  <div className="space-y-2">
                    <div className="w-full bg-light-gray rounded-full h-2">
                      <div
                        className="bg-primary-dark h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadState.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{uploadState.progress}% done</span>
                      <span>{formatSpeed(uploadState.uploadSpeed)}</span>
                    </div>
                  </div>
                ) : uploadState.isComplete ? (
                  <div className="text-sm text-green font-medium">Uploaded</div>
                ) : (
                  <div className="text-sm text-dark-gray">Ready to upload</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
