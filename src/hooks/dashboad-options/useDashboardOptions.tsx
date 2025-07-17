import { useEffect, useState } from 'react';

export const useDashboardSections = () => {
  const [dashboardOptions, setDashboardOptions] = useState({
    doctors: true,
    ratings: true,
    totalRevenue: true,
    ourSpecialties: true,
    clinicalDiseases: true,
    appointmentReports: true,
    appointmentOverview: true,
    patientDemographics: true,
  });

  const [tempDashboardOptions, setTempDashboardOptions] = useState({ ...dashboardOptions });

  useEffect(() => {
    const savedOptions = localStorage.getItem('dashboardOptions');
    if (savedOptions) {
      const parsedOptions = JSON.parse(savedOptions);
      setDashboardOptions(parsedOptions);
      setTempDashboardOptions(parsedOptions);
    }
  }, []);

  const handleSaveOptions = (onClose?: () => void) => {
    setDashboardOptions({ ...tempDashboardOptions });
    localStorage.setItem('dashboardOptions', JSON.stringify(tempDashboardOptions));
    onClose?.();
  };

  return {
    dashboardOptions,
    tempDashboardOptions,
    setTempDashboardOptions,
    handleSaveOptions,
  };
};
