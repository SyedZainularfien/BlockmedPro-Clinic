'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Container from '@/components/shared/container';
import { Typography } from '@/components/shared/typography';

const DoctorCard = ({ doctor }: { doctor: any }) => {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/doctors/${doctor._id}`);
  };

  return (
    <Container hasBorders leftBorder styling="">
      <div className="px-4 md:px-10 pt-5 pb-9">
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <button onClick={handleViewProfile} className="cursor-pointer">
              <Typography size={'md'} className="text-primary-light font-semibold">
                View Profile
              </Typography>
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-center">
            <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-1/2 items-start">
              <div className="rounded-full border-2 border-light-gray p-1">
                <Image src={doctor.image} alt={doctor.name} height={132} width={132} className="object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <Typography size="xl" className="text-blue font-bold">
                  {doctor.name}
                </Typography>
                <div className="flex flex-col gap-1.5">
                  <Typography size="md" className="text-dark-gray font-semibold">
                    Registration# {doctor.registration}
                  </Typography>
                  <Typography size="md" className="text-dark-gray font-semibold">
                    {doctor.email}
                  </Typography>
                  <Typography size="md" className="text-dark-gray font-semibold">
                    {doctor.qualification}
                  </Typography>
                  <Typography size="md" className="text-dark-gray font-semibold">
                    {doctor.specialty}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:w-1/2">
              <Typography size="md" className="text-blue font-semibold">
                Bio:
              </Typography>
              <Typography size="md" className="text-dark-gray font-semibold">
                {doctor.bio}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DoctorCard;
