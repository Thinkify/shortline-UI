import React, { useContext, useEffect, useState } from 'react';
import { candidateStatus } from '../constants';
import { AuthContext } from '../context/Auth';
import {
  getRecruterCandidateStatus,
  setRecruterCandidateStatus,
} from '../services/candidates';

const CandidateStatus = ({ candidateEmail }) => {
  const { currentUser } = useContext(AuthContext);
  const [status, setStatus] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await getRecruterCandidateStatus(
          currentUser.email,
          candidateEmail
        );
        setStatus(res.status);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [candidateEmail, currentUser.email]);

  const handleStatusClicked = async (status) => {
    const payload = {
      recruterEmail: currentUser.email,
      candidateEmail: candidateEmail,
      status,
    };
    try {
      setStatus(status);
      await setRecruterCandidateStatus(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center px-4">
      <button
        className={`bg-gray-200 px-4 py-1 font-semibold rounded-md ${
          status === candidateStatus.NOT_REVIEWED ? '!bg-sky-200' : ''
        }`}
        onClick={() => handleStatusClicked(candidateStatus.NOT_REVIEWED)}
      >
        Not Screened
      </button>
      <button
        className={`bg-gray-200 px-4 py-1 font-semibold rounded-md ${
          status === candidateStatus.REJECT ? '!bg-red-200' : ''
        }`}
        onClick={() => handleStatusClicked(candidateStatus.REJECT)}
      >
        Reject
      </button>
      <button
        className={`bg-gray-200 px-4 py-1 font-semibold rounded-md ${
          status === candidateStatus.SHORTLIST ? '!bg-green-200' : ''
        }`}
        onClick={() => handleStatusClicked(candidateStatus.SHORTLIST)}
      >
        Shortlist
      </button>
    </div>
  );
};

export default CandidateStatus;
