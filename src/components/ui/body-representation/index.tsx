import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

import Iconify from '@/components/shared/iconify';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { IBodyRepresentationProps, IUploadedFile } from '@/types';

const BodyRepresentation: FC<IBodyRepresentationProps> = ({ selectedOption }) => {
  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([]);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [drawingMode, setDrawingMode] = useState<'draw'>('draw');
  const canvasRef = useRef<any>(null);

  const consultationToDefaultBodyPart = useMemo(
    (): Record<string, string> => content?.currentConsultations?.consultationToDefaultBodyPart,
    []
  );

  const [selectedBodyPart, setSelectedBodyPart] = useState(consultationToDefaultBodyPart[selectedOption] || 'Face');

  const bodyPartImages: Record<string, string> = content?.currentConsultations?.bodyPartImages;

  useEffect(() => {
    if (selectedOption in consultationToDefaultBodyPart) {
      setSelectedBodyPart(consultationToDefaultBodyPart[selectedOption] || 'Face');
    }
  }, [selectedOption, consultationToDefaultBodyPart]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.clear(); // clear previous drawing and image
    }
  }, [selectedBodyPart]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeKB = Math.round(file.size / 1024);
      const newFile: IUploadedFile = {
        id: Date.now(),
        name: file.name,
        size: `${fileSizeKB}kb`,
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    }
  };

  const removeFile = (id: number): void => {
    setUploadedFiles(uploadedFiles.filter((file: IUploadedFile) => file.id !== id));
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const undoDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const increaseBrush = () => {
    setBrushSize(Math.min(brushSize + 1, 10));
  };

  const decreaseBrush = () => {
    setBrushSize(Math.max(brushSize - 1, 1));
  };

  const handleChangeBodyPart = (value: string) => {
    setSelectedBodyPart(value);
    clearCanvas();
  };
  const CanvasDrawComponent = CanvasDraw as any;

  return (
    <div className="flex gap-8">
      {/* Left Panel */}
      <div className="w-96">
        <Typography size={'lg'} as={'p'} className="font-bold text-black mb-6">
          Body Representation
        </Typography>

        {/* File Upload */}
        <div className="mb-2 bg-light-blue p-1.5 rounded-[10px]">
          <label className="flex items-center gap-4 cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
            <div className="bg-primary-dark text-white px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2">
              <Iconify icon="gala:upload" className="w-4 h-4" />
              <Typography size="md" className="text-white font-semibold">
                Upload a file
              </Typography>
            </div>
            <Typography size={'sm'} className="text-dark-gray ml-4">
              Max file size limit 5mb.
            </Typography>
          </label>
        </div>
        <hr className="text-light-gray mb-3" />

        {/* Uploaded Files */}
        <div className="max-h-[220px] overflow-y-auto custom-scrollbar pl-2 pr-3">
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between">
                <div className="flex items-center justify-between w-2/3 gap-4">
                  <div>
                    <Typography size={'sm'} as={'p'} className="text-dark-gray truncate max-w-[140px]">
                      {file.name}
                    </Typography>
                  </div>
                  <div>
                    <Typography size={'sm'} as={'p'} className="text-dark-gray text-left">
                      {file.size}
                    </Typography>
                  </div>
                </div>
                <button onClick={() => removeFile(file.id)} className="text-red-500">
                  <Iconify size={20} icon="material-symbols:cancel-outline-rounded" className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1">
        {/* Body Part Selector */}
        <div className="mb-4">
          <InputSelectField
            value={selectedBodyPart}
            name="bodyPart"
            onSelect={(value: string) => {
              handleChangeBodyPart(value);
            }}
            id="bodyPart"
            options={content?.currentConsultations?.bodyParts}
            className="w-full"
            placeholder="Select a body part"
          />
        </div>

        <div className="flex gap-4">
          {/* Drawing Tools */}
          <div className="flex flex-col gap-1">
            {/* Color Palette */}
            <div className="flex flex-col gap-2.5">
              {content?.currentConsultations?.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8.5 h-8.5 rounded cursor-pointer border-2 ${
                    selectedColor === color ? 'border-gray' : 'border-none'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <hr className="text-light-gray my-1" />

            {/* Drawing Tools */}
            {/* Pen Tool */}
            <button
              onClick={() => setDrawingMode('draw')}
              className={`w-6 h-6 flex items-center justify-center rounded`}
            >
              <Iconify icon="la:marker" className="w-6 h-6 text-primary-dark" />
            </button>

            <hr className="text-light-gray my-1" />

            <div className="flex flex-col gap-2.5">
              <button
                onClick={increaseBrush}
                className="w-8.5 h-8.5 text-xl font-bold bg-gray text-black rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
              >
                +
              </button>

              {/* <div className="w-8.5 h-8.5 flex items-center justify-center text-xs font-semibold">{brushSize}</div> */}

              <button
                onClick={decreaseBrush}
                className="w-8.5 h-8.5 text-xl font-bold text-black border border-light-gray rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                -
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Drawing Area with react-canvas-draw */}
            <div className="relative w-[270px] h-[220px] border border-gray-200 rounded-[10px] overflow-hidden">
              {/* Canvas Draw Component */}
              <div className="absolute inset-0">
                <CanvasDrawComponent
                  key={selectedBodyPart}
                  ref={canvasRef}
                  canvasWidth={270}
                  canvasHeight={220}
                  brushColor={drawingMode === 'draw' ? selectedColor : '#FFFFFF'}
                  hideInterface={true}
                  brushRadius={brushSize}
                  lazyRadius={0}
                  imgSrc={bodyPartImages[selectedBodyPart]}
                  disabled={false}
                  hideGrid={true}
                  enablePanAndZoom={false}
                  backgroundColor="transparent"
                  style={{
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button onClick={undoDrawing} className="group">
                <Iconify
                  icon="ci:undo"
                  size={34}
                  className="border border-light-gray p-1.5 rounded cursor-pointer hover:bg-gray-50 group-hover:border-gray-400"
                />
              </button>

              <button onClick={clearCanvas} className="group">
                <Iconify
                  icon="mi:delete"
                  size={34}
                  className="border border-light-gray p-1.5 rounded cursor-pointer hover:bg-gray-50 group-hover:border-gray-400"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyRepresentation;
