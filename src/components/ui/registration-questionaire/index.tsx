import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/shared/button';
import Container from '@/components/shared/container';
import DashboardWrapper from '@/components/shared/dashboard-wrapper';
import InputSelectField from '@/components/shared/input-fields/input-select-field';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { registrationQuestionaireInitialvalues } from '@/formik/initial-values/dashboard';
import { registrationQuestionaireSchema } from '@/formik/validations/dashboard';
import ActivityLogs from '../activity-logs';
import SeverityGauge from '../severity-gauge';

const RegistrationQuestionaire = () => {
  const { sleepLevels, exerciseLevels, improveSleepOptions, overallHealthOptions, howOftenOptions, typesOfExercises } =
    content?.registrationQuestionaire;

  const formik = useFormik({
    initialValues: registrationQuestionaireInitialvalues,
    onSubmit: (values) => {
      console.log(values);
      toast.success('Registration Questionnaire Submitted Successfully');
    },
    validationSchema: registrationQuestionaireSchema,
  });

  const { values, errors, touched, setFieldValue, handleBlur, handleSubmit } = formik;

  return (
    <DashboardWrapper title="Registration Questionnaire" subTitle="See all questionnaires patient filled before">
      <div className="flex flex-col xl:flex-row gap-5">
        {/* Left side */}
        <section className="w-full xl:w-[70%]">
          <Container hasBorders>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 px-7.5 py-6">
                <div className="flex flex-col gap-4">
                  <Typography size={'lg'} as={'p'} className="text-black font-bold">
                    Date of Registration
                  </Typography>
                  <div className="px-5 py-3.5 border border-light-gray w-fit rounded-2xl">
                    <Typography size={'md'} as={'p'} className="text-dark-gray font-semibold">
                      03:30 PM-18 Oct 2024
                    </Typography>
                  </div>
                </div>
                <hr className="w-full text-light-gray" />
                <SeverityGauge
                  value={values.sleepHours}
                  levels={sleepLevels}
                  onChange={(value: any) => {
                    setFieldValue('sleepHours', value);
                  }}
                  title="Sleep Duration"
                />

                <hr className="w-full text-light-gray" />
                <div className="flex flex-col md:flex-row gap-5 md:gap-7.5">
                  <InputSelectField
                    name="improveSleep"
                    onBlur={handleBlur}
                    onSelect={(value: any) => {
                      setFieldValue('improveSleep', value);
                    }}
                    value={values.improveSleep}
                    label="Want to Improve Sleep?"
                    options={improveSleepOptions}
                    error={errors.improveSleep && touched.improveSleep ? errors.improveSleep : ''}
                  />
                  <InputSelectField
                    onBlur={handleBlur}
                    name="overallHealth"
                    label="Overall Health"
                    onSelect={(value: any) => {
                      setFieldValue('overallHealth', value);
                    }}
                    value={values.overallHealth}
                    options={overallHealthOptions}
                    error={errors.overallHealth && touched.overallHealth ? errors.overallHealth : ''}
                  />
                </div>
                <hr className="w-full text-light-gray" />
                <SeverityGauge
                  title="Exercise"
                  value={values.exerciseValue}
                  levels={exerciseLevels}
                  onChange={(value: any) => {
                    setFieldValue('exerciseValue', value);
                  }}
                />
                <hr className="w-full text-light-gray" />
                <div className="flex flex-col md:flex-row gap-5 md:gap-7.5">
                  <InputSelectField
                    name="howOften"
                    label="How Often"
                    onBlur={handleBlur}
                    value={values.howOften}
                    onSelect={(value: any) => {
                      setFieldValue('howOften', value);
                    }}
                    options={howOftenOptions}
                    error={errors.howOften && touched.howOften ? errors.howOften : ''}
                  />
                  <InputSelectField
                    onBlur={handleBlur}
                    name="typesOfExercises"
                    label="Type of Exercise"
                    onSelect={(value: any) => {
                      setFieldValue('typesOfExercises', value);
                    }}
                    options={typesOfExercises}
                    value={values.typesOfExercises}
                    error={errors.typesOfExercises && touched.typesOfExercises ? errors.typesOfExercises : ''}
                  />
                </div>
                <hr className="w-full text-light-gray" />
                <div className="flex justify-end">
                  <Button type="submit" className="min-w-[118px] w-full sm:w-fit">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </Container>
        </section>
        {/* Activity Logs */}
        <section className="w-full xl:w-[30%]">
          <ActivityLogs />
        </section>
      </div>
    </DashboardWrapper>
  );
};

export default RegistrationQuestionaire;
