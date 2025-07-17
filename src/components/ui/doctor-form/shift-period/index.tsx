import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

import Container from '@/components/shared/container';
import CustomCheckbox from '@/components/shared/custom-checkbox';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { IDayAndTimingProps, IDayData, IDayScheduleProps } from '@/types';
import ToggleButton from '../../toggle-button';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const DaySchedule: React.FC<IDayScheduleProps> = ({
  dayLetter,
  timeSlots,
  isEnabled,
  onToggleDay,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onUpdateTimeSlot,
}) => {
  return (
    <Container hasBorders>
      <div className="p-3 md:p-5 flex flex-col sm:flex-row items-start justify-start gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div
            className={`w-12 h-12 rounded-xl border ${isEnabled ? 'border-primary-dark' : 'border-light-gray'} flex items-center justify-center`}
          >
            <Typography size="md" className={`font-medium ${isEnabled ? 'text-primary-dark' : 'text-black'}`}>
              {dayLetter}
            </Typography>
          </div>
          <div className="w-16 sm:hidden flex justify-center">
            <ToggleButton checked={isEnabled} onChange={onToggleDay} />
          </div>
        </div>

        <div className="w-full flex justify-between item-start md:items-center">
          <div className="flex-1 flex flex-col gap-2.5">
            {timeSlots.map((timeSlot, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2"
              >
                <div className="relative w-full max-w-[200px]">
                  <TimePicker
                    onChange={(value) => onUpdateTimeSlot(index, 'startTime', value ?? '')}
                    value={timeSlot.startTime}
                    format="h:mm a"
                    disableClock={true}
                    clearIcon={null}
                    disabled={!isEnabled}
                    className="!w-full"
                  />
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <Iconify icon="lucide:clock-2" width="18" height="18" className="text-gray" />
                  </div>
                </div>
                <div className="relative w-full max-w-[200px]">
                  <TimePicker
                    onChange={(value) => onUpdateTimeSlot(index, 'endTime', value ?? '')}
                    value={timeSlot.endTime}
                    format="h:mm a"
                    disableClock={true}
                    clearIcon={null}
                    disabled={!isEnabled}
                  />
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <Iconify icon="lucide:clock-2" width="18" height="18" className="text-gray" />
                  </div>
                </div>
                {index === 0 ? (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1">
                      <Typography size="lg" className="text-dark-gray font-medium">
                        Add
                      </Typography>
                      <Iconify
                        onClick={isEnabled ? onAddTimeSlot : undefined}
                        icon="gridicons:add"
                        width="20"
                        height="20"
                        className={`${!isEnabled ? 'text-gray cursor-not-allowed' : 'text-green cursor-pointer'}`}
                      />
                    </div>
                  </div>
                ) : (
                  <Iconify
                    onClick={isEnabled ? () => onRemoveTimeSlot(index) : undefined}
                    icon="zondicons:minus-solid"
                    width="17"
                    height="17"
                    className={`${!isEnabled ? 'text-gray cursor-not-allowed' : 'text-red cursor-pointer'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="w-16 hidden sm:flex sm:items-start sm:justify-center relative top-1 md:top-0">
            <ToggleButton checked={isEnabled} onChange={onToggleDay} />
          </div>
        </div>
      </div>
    </Container>
  );
};

const ShiftPeriod: React.FC<IDayAndTimingProps> = ({ values, setFieldValue }) => {
  const [days, setDays] = useState<IDayData[]>([
    {
      day: 'monday',
      letter: 'M',
      enabled: values?.days?.monday || false,
      timeSlots: values?.timeSlots?.monday || [],
    },
    {
      day: 'tuesday',
      letter: 'T',
      enabled: values?.days?.tuesday || false,
      timeSlots: values?.timeSlots?.tuesday || [],
    },
    {
      day: 'wednesday',
      letter: 'W',
      enabled: values?.days?.wednesday || false,
      timeSlots: values?.timeSlots?.wednesday || [],
    },
    {
      day: 'thursday',
      letter: 'T',
      enabled: values?.days?.thursday || false,
      timeSlots: values?.timeSlots?.thursday || [],
    },
    {
      day: 'friday',
      letter: 'F',
      enabled: values?.days?.friday || false,
      timeSlots: values?.timeSlots?.friday || [],
    },
    {
      day: 'saturday',
      letter: 'S',
      enabled: values?.days?.saturday || false,
      timeSlots: values?.timeSlots?.saturday || [],
    },
    {
      day: 'sunday',
      letter: 'S',
      enabled: values?.days?.sunday || false,
      timeSlots: values?.timeSlots?.sunday || [],
    },
  ]);

  const toggleDay = (index: number, enabled: boolean) => {
    const updatedDays = [...days];
    if (updatedDays[index]) {
      updatedDays[index].enabled = enabled;
      setDays(updatedDays);

      const dayName = updatedDays[index].day.toLowerCase();
      if (setFieldValue) {
        setFieldValue(`days.${dayName}`, enabled);
      }
    }
  };

  const addTimeSlot = (dayIndex: number) => {
    const updatedDays = [...days];
    if (updatedDays[dayIndex]) {
      updatedDays[dayIndex].timeSlots = [
        ...updatedDays[dayIndex].timeSlots,
        {
          startTime: '',
          endTime: '',
        },
      ];
      setDays(updatedDays);

      if (setFieldValue) {
        const dayName = updatedDays[dayIndex].day;
        setFieldValue(`timeSlots.${dayName}`, [...updatedDays[dayIndex].timeSlots]);
      }
    }
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedDays = [...days];
    if (updatedDays[dayIndex]) {
      updatedDays[dayIndex].timeSlots = updatedDays[dayIndex].timeSlots.filter((_, idx) => idx !== slotIndex);
      setDays(updatedDays);

      if (setFieldValue) {
        const dayName = updatedDays[dayIndex].day;
        setFieldValue(`timeSlots.${dayName}`, [...updatedDays[dayIndex].timeSlots]);
      }
    }
  };

  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: 'startTime' | 'endTime', value: string) => {
    const updatedDays = [...days];
    if (updatedDays[dayIndex] && updatedDays[dayIndex].timeSlots[slotIndex]) {
      updatedDays[dayIndex].timeSlots[slotIndex][field] = value;
      setDays(updatedDays);

      if (setFieldValue) {
        const dayName = updatedDays[dayIndex].day;
        setFieldValue(`timeSlots.${dayName}`, [...updatedDays[dayIndex].timeSlots]);
      }
    }
  };

  const currentAppointmentType = values?.appointmentType || '';

  const handleAppointmentTypeChange = (type: string) => {
    if (setFieldValue) {
      setFieldValue('appointmentType', type);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Typography size="lg" as="h5" className="font-bold">
        Shift Period
      </Typography>
      <Container hasBorders styling="px-5 py-5 xl:px-10 sm:py-8.5">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3.5">
            <Typography size="md" as="h4" className="font-semibold">
              Select a type of appointment for this doctor.
            </Typography>
            <div className="flex flex-wrap gap-4">
              <CustomCheckbox
                styling="!text-md !font-normal"
                label="Face to Face"
                checked={currentAppointmentType === 'face-to-face'}
                onChange={() => handleAppointmentTypeChange('face-to-face')}
              />
              <CustomCheckbox
                label="Remote"
                styling="!text-md !font-normal"
                checked={currentAppointmentType === 'remote'}
                onChange={() => handleAppointmentTypeChange('remote')}
              />
              <CustomCheckbox
                label="Both"
                styling="!text-md !font-normal"
                checked={currentAppointmentType === 'both'}
                onChange={() => handleAppointmentTypeChange('both')}
              />
            </div>
          </div>
          <hr className="w-full text-light-gray" />
          <div className="space-y-3.5">
            <Typography size="md" as="h4" className="font-semibold">
              Day and timing
            </Typography>

            <div className="flex flex-col gap-5">
              {days.map((day, index) => (
                <DaySchedule
                  key={index}
                  day={day.day}
                  dayLetter={day.letter}
                  timeSlots={day.timeSlots}
                  isEnabled={day.enabled}
                  onToggleDay={(enabled) => toggleDay(index, enabled)}
                  onAddTimeSlot={() => addTimeSlot(index)}
                  onRemoveTimeSlot={(slotIndex) => removeTimeSlot(index, slotIndex)}
                  onUpdateTimeSlot={(slotIndex, field, value) => updateTimeSlot(index, slotIndex, field, value)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShiftPeriod;
