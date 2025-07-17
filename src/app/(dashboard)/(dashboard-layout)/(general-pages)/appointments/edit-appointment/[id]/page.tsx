'use client';

import { NextPage } from 'next';
import React, { useEffect, useMemo, useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import AppointmentDetailComponent from '@/components/ui/appointment-details';
import { content } from '@/data';

const EditAppointment: NextPage = () => {
  const { id } = useParams();
  const router = useRouter();
  // Find patient by ID
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

  // if (!patient) return null;

  const [appointmentType, setAppointmentType] = useState<'face-to-face' | 'remote'>(
    patient?.appointmentType?.toLowerCase().includes('face') ? 'face-to-face' : 'remote'
  );

  const [selectedTime, setSelectedTime] = useState<string>(patient?.time || '01:30 pm');
  const [specialist, setSpecialist] = useState<{ label: string; value: string } | null>();

  const handleSubmit = () => {
    console.log({
      patient,
      appointmentType,
      date: format(new Date(), 'yyyy-MM-dd'),
      time: selectedTime,
      specialist,
    });
    router.push('/appointments');
    toast.success('Appointment Updated Successfully');
  };

  return (
    <AppointmentDetailComponent
      isEdit
      data={patient}
      specialist={specialist}
      title="Edit Appointment"
      onConfirm={handleSubmit}
      selectedTime={selectedTime}
      setSpecialist={setSpecialist}
      appointmentType={appointmentType}
      setSelectedTime={setSelectedTime}
      subTitle="Edit Appointment For Patient"
      setAppointmentType={setAppointmentType}
    />
  );
};

export default EditAppointment;
