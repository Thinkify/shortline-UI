import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createCandidates, findCandidate } from '../services/candidates';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { showErrorNotification, showSuccessNotification } from '../utils/toast';

const validationSchema = Yup.object().shape({
  currentSalary: Yup.string().required('Current CTC is required'),
  expectedSalary: Yup.string().required('Expected CTC is required'),
  noticePeriod: Yup.string().required('NoticePeriod is required'),
});

const Update = () => {
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const {
    register,
    reset,
    formState: { errors },
    watch,
    handleSubmit,
    control,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'offersInHand',
    control,
  });
  const formRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        // var profile = whatIsTheQueryKey(value);
        //   setCandidateSearch({ email });
        const res = await findCandidate({ email });
        console.log('=====', res);
        if (!res.message) {
          const {
            name,
            contact,
            email,
            currentSalary,
            expectedSalary,
            noticePeriod,
            gitHub,
            linkedInProfile,
            offersInHand,
          } = res;
          setValue('name', name);
          setValue('contact', contact);
          setValue('email', email);
          setValue('currentSalary', currentSalary);
          setValue('expectedSalary', expectedSalary);
          setValue('noticePeriod', noticePeriod);
          setValue('gitHub', gitHub);
          setValue('linkedInProfile', linkedInProfile);
          setValue('offersInHand', offersInHand);
          setLoading(false);
        }
      } catch (error) {
        showErrorNotification(`Something went wrong`);
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data, null, 2));
    const responce = await createCandidates({
      ...data,
    });

    if (responce?.data?.code == 200) {
      showSuccessNotification(`User Updated Successfully`);
    } else {
      showErrorNotification(`Something went wrong`);
    }
  };

  return (
    <div className="h-full w-full py-4 px-4">
      <div className="flex flex-col items-center justify-start py-2">
        <div className="mt-5 md:mt-0 md:col-span-2">
          {loading ? (
            <CircularProgress />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={'text-black'}
              ref={formRef}
            >
              <div className="shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 md:grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        defaultValue={getValues('name')}
                        autoComplete="given-name"
                        {...register('name')}
                        disabled
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control disabled:bg-slate-200 disabled:cursor-not-allowed ${
                          errors?.name ? 'is-invalid' : ''
                        }`}
                      />
                      <div className="text-red-500">
                        {errors?.name?.message}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact
                      </label>
                      <input
                        type="text"
                        id="contact"
                        defaultValue={getValues('contact')}
                        autoComplete="given-name"
                        {...register('contact')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control disabled:bg-slate-200 disabled:cursor-not-allowed ${
                          errors?.contact ? 'is-invalid' : ''
                        }`}
                        disabled
                      />
                      <div className="text-red-500">
                        {errors?.contact?.message}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email-address"
                        defaultValue={getValues('email')}
                        autoComplete="email"
                        {...register('email')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control disabled:bg-slate-200 disabled:cursor-not-allowed ${
                          errors?.email ? 'is-invalid' : ''
                        }`}
                        disabled
                      />
                      <div className="text-red-500">
                        {errors?.email?.message}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current CTC
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        autoComplete="given-name"
                        defaultValue={getValues('currentSalary')}
                        {...register('currentSalary')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${
                          errors?.currentSalary ? 'is-invalid' : ''
                        }`}
                      />
                      <div className="text-red-500">
                        {errors?.currentSalary?.message}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expected Salary
                      </label>
                      <input
                        type="text"
                        id="expectedSalary"
                        autoComplete="given-name"
                        defaultValue={getValues('expectedSalary')}
                        {...register('expectedSalary')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${
                          errors?.expectedSalary ? 'is-invalid' : ''
                        }`}
                      />
                      <div className="text-red-500">
                        {errors?.expectedSalary?.message}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="noticePeriod"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notice Period
                      </label>
                      <select
                        defaultValue={getValues('noticePeriod')}
                        {...register('noticePeriod', { required: true })}
                        id="noticePeriod"
                        name="noticePeriod"
                        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-control ${
                          errors?.noticePeriod ? 'is-invalid' : ''
                        }`}
                      >
                        <option value="immediate">immediate</option>
                        <option value="less than 15 days">
                          less than 15 days
                        </option>
                        <option value="less than 30 days">
                          less than 30 days
                        </option>
                        <option value="less than 90 days">
                          less than 90 days
                        </option>
                      </select>
                      <div className="text-red-500">
                        {errors?.noticePeriod?.message}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="gitHub"
                        className="block text-sm font-medium text-gray-700"
                      >
                        GitHub
                      </label>
                      <input
                        type="text"
                        id="gitHub"
                        defaultValue={getValues('gitHub')}
                        autoComplete="gitHub"
                        {...register('gitHub')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control disabled:bg-slate-200 disabled:cursor-not-allowed ${
                          errors?.gitHub ? 'is-invalid' : ''
                        }`}
                        disabled
                      />
                      <div className="text-red-500">
                        {errors?.gitHub?.message}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="linkedIn-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        LinkedInProfile
                      </label>
                      <input
                        type="text"
                        id="linkedInProfile"
                        defaultValue={getValues('linkedInProfile')}
                        autoComplete="given-linkedInProfile"
                        {...register('linkedInProfile')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control disabled:bg-slate-200 disabled:cursor-not-allowed ${
                          errors?.linkedInProfile ? 'is-invalid' : ''
                        }`}
                        disabled
                      />
                      <div className="text-red-500">
                        {errors?.linkedInProfile?.message}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="offersInHand"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of offersInHand
                      </label>
                      <select
                        name="offersInHand"
                        {...register('offersInHand')}
                        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-control disabled:bg-slate-200 disabled:cursor-not-allowed`}
                        
                        defaultValue={getValues('offersInHand').length || 0}
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.offersInHand?.message}
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 grid grid-cols-6 gap-4">
                      {fields.map((item, i) => (
                        <div
                          key={i}
                          className="col-span-6 grid grid-cols-6 gap-4"
                        >
                          <div className="col-span-3 ">
                            <label className="block text-sm font-medium text-gray-700">
                              Company
                            </label>
                            <input
                              name={`offersInHand[${i}]company`}
                              {...register(`offersInHand.${i}.company`)}
                              type="text"
                              disabled
                              className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control disabled:bg-slate-200 disabled:cursor-not-allowed ${
                                errors.offersInHand?.[i]?.company
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <div className="text-red-500">
                              {errors.offersInHand?.[i]?.company?.message}
                            </div>
                          </div>
                          <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              {' '}
                              Salary offered
                            </label>
                            <input
                              name={`offersInHand[${i}]offer`}
                              {...register(`offersInHand.${i}.offer`)}
                              type="text"
                              disabled
                              className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control disabled:bg-slate-200 disabled:cursor-not-allowed ${
                                errors.offersInHand?.[i]?.offer
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <div className="text-red-500">
                              {errors.offersInHand?.[i]?.offer?.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Update;
