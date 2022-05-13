import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const status = {
  'NOT REVIEWED': 'text-blue-500 bg-blue-200',
  REJECT: 'text-red-500 bg-red-200',
  SHORTLIST: 'text-green-500 bg-green-200',
};

const RecrutersCandidates = ({ candidates }) => {
  const history = useHistory();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedCandidates, setselectedCandidates] = useState(candidates);
  const handleFilter = (e) => {
    e.stopPropagation();
    const value = e.target.dataset.value;
    if (value) {
      setSelectedFilter(value);
      if (value === 'ALL') {
        setselectedCandidates(candidates);
      } else {
        setselectedCandidates(candidates.filter((c) => c.status === value));
      }
    }
  };

  const handleRedirect = (linkedInProfile) => {
    history.push(`/?find=${linkedInProfile}&hf=true`);
  };

  return (
    <div>
      <div className="flex gap-4 my-4" onClick={handleFilter}>
        <div
          className={`bg-slate-200 rounded-full px-4 py-2 cursor-pointer ${
            selectedFilter === 'ALL' && '!bg-purple-200 text-purple-500'
          }`}
          data-value="ALL"
        >
          All
        </div>
        <div
          className={`bg-slate-200  rounded-full px-4 py-2 cursor-pointer ${
            selectedFilter === 'NOT REVIEWED' && 'text-blue-500 !bg-blue-200'
          }`}
          data-value="NOT REVIEWED"
        >
          NOT REVIEWED
        </div>
        <div
          className={`bg-slate-200  rounded-full px-4 py-2 cursor-pointer ${
            selectedFilter === 'REJECT' && 'text-red-500 !bg-red-200'
          }`}
          data-value="REJECT"
        >
          REJECT
        </div>
        <div
          className={`bg-slate-200  rounded-full px-4 py-2 cursor-pointer ${
            selectedFilter === 'SHORTLIST' && 'text-green-500 !bg-green-200'
          }`}
          data-value="SHORTLIST"
        >
          SHORTLIST
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {selectedCandidates.map((candiate) => (
            <tr
              key={candiate._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td scope="row" className="px-6 py-4">
                <div
                  className="font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleRedirect(candiate.linkedInProfile)}
                >
                  {candiate.name}
                </div>
                <div className="text-sm text-gray-500">{candiate.email}</div>
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
    </div>
  );
};

export default RecrutersCandidates;
