'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import AppointmentDetailComponent from '@/components/ui/appointment-details';
import { content } from '@/data';

const AppointmentDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const patient = useMemo(() => {
    return (
      content.patients.find((p) => p.patientId === id) || content.appointmentsDiary.find((p) => p.patientId === id)
    );
  }, [id]);

  useEffect(() => {
    if (!patient) {
      router.push('/404');
    }
  }, [patient, router]);

  const [appointmentType, setAppointmentType] = useState<'face-to-face' | 'remote'>(
    patient?.appointmentType?.toLowerCase().includes('face') ? 'face-to-face' : 'remote'
  );

  const [selectedTime, setSelectedTime] = useState<string>(patient?.time || '01:30 pm');
  const [specialist, setSpecialist] = useState<{ label: string; value: string } | null>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const combinedData = {
    appointmentType,
    selectedTime,
    specialist,
    selectedDate,
  };

  const handleSubmit = () => {
    router.push(`/appointments/appointment-invoice/${id}`);
    console.log('Appointment Details', id, combinedData);
  };

  return (
    <AppointmentDetailComponent
      data={patient}
      onConfirm={handleSubmit}
      specialist={specialist}
      title="Appointment Details"
      setSelectedDate={setSelectedDate}
      selectedTime={selectedTime}
      setSpecialist={setSpecialist}
      appointmentType={appointmentType}
      setSelectedTime={setSelectedTime}
      setAppointmentType={setAppointmentType}
      subTitle="Book Appointment For Patient"
    />
  );
};

export default AppointmentDetails;
