import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth';
import {
  getUserWithSkills,
  getRecruterCandidates,
} from '../services/candidates';

const status = {
  'NOT REVIEWED': 'text-blue-500 bg-blue-200',
  REJECT: 'text-red-500 bg-red-200',
  SHORTLIST: 'text-green-500 bg-green-200',
};

const RecommandedCandidates = () => {
  const [thinkifyCandidates, setThinkifyCandidates] = useState([]);
  const [recruterCandidates, setRecruterCandidates] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(1);

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
      const result = await getRecruterCandidates(currentUser.email);
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
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              {thinkifyCandidates.map((candiate) => (
                <tr
                  key={candiate._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td scope="row" className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {candiate.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candiate.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span>Current Salary : </span> {candiate.currentSalary}
                    </div>
                    <div>
                      <span>Expected Salary : </span> {candiate.expectedSalary}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab == 2 && (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              {recruterCandidates.map((candiate) => (
                <tr
                  key={candiate._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td scope="row" className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {candiate.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candiate.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-2 rounded-full ${
                        status[candiate.status]
                      }`}
                    >
                      {candiate.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecommandedCandidates;
