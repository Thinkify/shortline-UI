import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { findCandidate } from '../services/candidates';
import { useHistory, useLocation } from 'react-router';
import AddCandidateBanner from '../components/AddCandidateBanner';
import SkillView from '../components/SkillView';
import CandidateStatus from '../components/CandidateStatus';
import whatIsTheQueryKey from '../utils/findapi.utlis';
import data from '../utils/demo';
import { Avatar } from '@mui/material';
import { stringAvatar, stringToColor } from '../utils/mui.utils';

const images = {
  flipkart: 'flipkart.png',
  amazon: 'amazon.png',
};

const Home = () => {
  const [candidate, setCandidate] = useState('');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [candidateEmptyError, setCandidateEmptyError] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const hideFindBox = params.get('hf');

  const goToAddIngo = () => {
    debugger;
    const key = Object.keys(candidateSearch);
    history.push(`/add?${key[0]}=${candidateSearch[key[0]]}`);
  };

  const findAndSetCandidate = async (value) => {
    try {
      var profile = whatIsTheQueryKey(value);
      setCandidateSearch({ [profile]: value });
      const res = await findCandidate({ [profile]: value });
      if (res.message) {
        setCandidateEmptyError(true);
        setCandidate('');
      } else {
        setCandidate(res);
        setCandidateEmptyError(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get('find');
    if (slug) {
      findAndSetCandidate(slug);
    }
  }, [location?.search]);

  const handleFind = async (event) => {
    event.preventDefault();
    const { data } = event.target.elements;
    findAndSetCandidate(data?.value);
  };

  const handleEdit = () => {
    history.push(`/update/${candidate.email}`);
  };

  console.log('Candiate Skills', candidate);

  return (
    <div className="h-full w-full p-2">
      {!hideFindBox && (
        <div className="flex flex-col items-center justify-center col-span-2">
          <form
            onSubmit={handleFind}
            className="bg-white shadow rounded w-full p-4 mt-4"
          >
            <p
              tabIndex="0"
              className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
            >
              Search Candidate
            </p>
            <div className={'mt-8'}>
              <label
                id="data"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Find by Email / Github / Linkedin / phone number
              </label>
              <input
                aria-labelledby="data"
                type="text"
                name="data"
                placeholder="search"
                className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                Find
              </button>
            </div>
          </form>
        </div>
      )}
      {candidate.email && (
        <div>
          <div className="flex p-4 gap-2">
            <div className="flex-[0.1]">
              <Avatar
                {...stringAvatar(candidate?.name || '')}
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: stringToColor(candidate?.name || ''),
                  fontSize: 16,
                }}
                src="/images/avatar.png"
              />
            </div>
            <div className="flex-1 text-left flex flex-col gap-2">
              <div className="font-bold text-lg">
                {candidate?.name}
                <span onClick={handleEdit} className="cursor-pointer ml-4">
                  <i className="fas fa-edit" color="action" />
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <img src="/images/email.png" alt="email" /> {candidate?.email}
                </div>
                <div className="flex items-center gap-2">
                  <img src="/images/phone.png" alt="email" />{' '}
                  {candidate?.contact}
                </div>
              </div>
              <CandidateStatus candidateEmail={candidate.email} />
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex">
              <div className="flex-1">Current Salary</div>
              <div className="flex-1 font-semibold">
                {candidate?.currentSalary}
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">Expected Salary</div>
              <div className="flex-1 font-semibold">
                {candidate?.expectedSalary}
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">Notice period</div>
              <div className="flex-1 font-semibold">30 days</div>
            </div>
            <div className="flex">
              <div className="flex-1">other offer</div>
              <div className="flex-1 font-semibold">Flipkart</div>
            </div>
            <div className="mt-4">Skill set & test results</div>
            <SkillView data={data} />
          </div>
        </div>
      )}
      {candidateEmptyError && (
        <AddCandidateBanner onClickHandler={goToAddIngo} />
      )}
    </div>
  );
};

export default withRouter(Home);
