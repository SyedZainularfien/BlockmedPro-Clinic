import { useFormik } from 'formik';
import React, { FC } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { specialisationValidationSchema } from '@/formik/validations/dashboard';

const specializationData = [
  { id: 1, name: 'General Practice/Family Medicine', price: 100 as string | number },
  { id: 2, name: 'Dermatologist', price: 150 as string | number },
  { id: 3, name: 'Orthopedics', price: 600 as string | number },
  { id: 4, name: 'Cardiologist', price: 200 as string | number },
  { id: 5, name: 'Pediatrician', price: 120 as string | number },
  { id: 6, name: 'Psychiatrist', price: 180 as string | number },
  { id: 7, name: 'Neurologist', price: 250 as string | number },
  { id: 8, name: 'Gynecologist', price: 140 as string | number },
];

const SpecialisationAndPricing: FC = () => {
  const formik = useFormik({
    initialValues: {
      selectedSpecializations: [1, 2, 3, 4],
      specializations: specializationData,
      newSpecialtyInput: '',
    },
    validationSchema: specialisationValidationSchema,
    onSubmit: (values) => {
      const submitData = {
        selectedSpecializations: values.selectedSpecializations,
        specializations: values.specializations,
      };
      console.log('Form values:', submitData);
      toast.success('Specializations and pricing updated successfully');
    },
  });

  const { values, setFieldValue, handleSubmit, handleReset } = formik;

  const handleRemoveSpecialization = (id: number): void => {
    const updatedSelected = values.selectedSpecializations.filter((specId: number) => specId !== id);
    setFieldValue('selectedSpecializations', updatedSelected);
  };

  const handleAddSpecialization = () => {
    if (values.newSpecialtyInput?.trim()) {
      const newId = Math.max(...values.specializations?.map((s) => s.id)) + 1;
      const newSpecialization = {
        id: newId,
        name: values.newSpecialtyInput?.trim(),
        price: 0 as string | number,
      };

      const updatedSpecializations = [...values.specializations, newSpecialization];
      const updatedSelected = [...values.selectedSpecializations, newId];

      setFieldValue('specializations', updatedSpecializations);
      setFieldValue('selectedSpecializations', updatedSelected);
      setFieldValue('newSpecialtyInput', '');
    }
  };

  const handlePriceChange = (id: number, newPrice: string) => {
    const price: string | number = newPrice === '' ? '' : parseInt(newPrice) || 0;
    const updatedSpecializations = values.specializations.map((spec) => (spec.id === id ? { ...spec, price } : spec));
    setFieldValue('specializations', updatedSpecializations);
  };

  const handleNewSpecialtyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('newSpecialtyInput', e.target.value);
  };

  const getSelectedSpecializations = () => {
    return values.specializations.filter((spec) => values.selectedSpecializations.includes(spec.id));
  };

  return (
    <Container hasBorders>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-5 px-5 sm:py-7 sm:px-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <Typography size="lg" className="text-black font-bold">
              Specialized In
            </Typography>

            <Container hasBorders>
              <div className="p-4 sm:px-6 sm:pt-4 sm:pb-5 flex flex-col gap-5">
                <div className="flex items-center">
                  <Typography size="md" className="text-black font-semibold">
                    Selected Specialization
                  </Typography>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  {getSelectedSpecializations().map((spec) => (
                    <div
                      key={spec.id}
                      className="px-4 py-2 flex items-center gap-2.5 rounded-2xl bg-blue-50 border border-blue-200"
                    >
                      <Typography size="md" className="text-primary-light font-semibold">
                        {spec.name}
                      </Typography>
                      <Iconify
                        icon="proicons:cancel-circle"
                        size={16}
                        className="text-primary-light cursor-pointer hover:text-primary-dark transition-colors"
                        onClick={() => handleRemoveSpecialization(spec.id)}
                      />
                    </div>
                  ))}

                  <div className="px-4 py-2 flex items-center gap-2 rounded-2xl border border-gray-300 bg-white">
                    <input
                      type="text"
                      value={values.newSpecialtyInput}
                      onChange={handleNewSpecialtyInputChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSpecialization();
                        }
                      }}
                      placeholder="Enter specialty name"
                      className="flex-1 outline-none text-md font-semibold text-gray-700 placeholder-gray-400 bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddSpecialization}
                      disabled={!values.newSpecialtyInput?.trim()}
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-light hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      <Iconify icon="zondicons:add-outline" size={12} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </Container>

            {/* Pricing Cards */}
            <div className="flex flex-col gap-7.5">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getSelectedSpecializations().map((spec) => (
                  <div key={spec.id} className="py-5 px-6 flex flex-col gap-4 border border-gray-200 rounded-2xl">
                    <Typography size="md" className="text-black font-semibold leading-tight">
                      {spec.name}
                    </Typography>
                    <div className="bg-gray-100 w-full rounded-xl p-4 flex justify-between items-center">
                      <Typography size="md" className="text-gray-600 font-semibold">
                        Price:
                      </Typography>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={spec.price === '' ? '' : spec.price}
                          onChange={(e) => handlePriceChange(spec.id, e.target.value)}
                          className="w-20 text-right outline-none bg-transparent text-black font-bold text-base appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-black font-bold">$</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {values.selectedSpecializations.length === 0 && (
                <div className="text-center py-8">
                  <Typography size="md" className="text-gray-500">
                    No specializations selected. Click Add Speciality to get started.
                  </Typography>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-start sm:items-center gap-2.5">
                <Button onClick={handleReset} type="button" variant="outlined" className="w-full max-w-[250px]">
                  Cancel
                </Button>
                <Button
                  disabled={values.selectedSpecializations.length === 0}
                  type="submit"
                  variant="primary"
                  className="w-full max-w-[250px]"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default SpecialisationAndPricing;
