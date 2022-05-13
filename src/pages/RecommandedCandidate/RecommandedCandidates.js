import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth';
import {
  getRecruterCandidates,
  getUserWithSkills,
} from '../../services/candidates';
import RecrutersCandidates from './RecrutersCandidates';
import ThinkifyCandidates from './ThinkifyCandidates';

const RecommandedCandidates = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(1);
  const [recruterCandidates, setRecruterCandidates] = useState([]);
  const [thinkifyCandidates, setThinkifyCandidates] = useState([]);

  useEffect(() => {
    (async () => {
      const skills = ['react'];
      const result = await getUserWithSkills(skills);
      if (result && result.code === 200) {
        setThinkifyCandidates(result.skilledUser);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getRecruterCandidates(
        'ak@thinkify.io' || currentUser.email
      );
      if (result && result.code === 200) {
        setRecruterCandidates(result.data.candidates);
        console.log('RecommandedCandidates', result);
      }
    })();
  }, [currentUser]);

  const handleToggleTab = (e) => {
    setActiveTab(e.target.dataset.tab);
  };

  return (
    <div className="container m-auto pt-4">
      <div className="flex">
        <div
          className={`flex-1 border font-medium text-center px-4 py-2 cursor-pointer ${
            activeTab == 1 && 'bg-blue-500 text-white'
          }`}
          onClick={handleToggleTab}
          data-tab="1"
        >
          Thinkify Candidates
        </div>
        <div
          className={`flex-1 border font-medium text-center px-4 py-2 cursor-pointer ${
            activeTab == 2 && 'bg-blue-500 text-white'
          }`}
          onClick={handleToggleTab}
          data-tab="2"
        >
          Recruters Candidates
        </div>
      </div>
      <div className="relative overflow-x-auto drop-shadow-lg sm:rounded-lg">
        {activeTab == 1 && (
          <ThinkifyCandidates candidates={thinkifyCandidates} />
        )}
        {activeTab == 2 && (
          <RecrutersCandidates candidates={recruterCandidates} />
        )}
      </div>
    </div>
  );
};

export default RecommandedCandidates;
