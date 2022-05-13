import React from 'react';
import { useHistory } from 'react-router-dom';

const ThinkifyCandidates = ({ candidates }) => {
  const history = useHistory();

  const handleRedirect = (linkedInProfile) => {
    history.push(`/?find=${linkedInProfile}&hf=true`);
  };
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        {candidates.map((candiate) => (
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
  );
};

export default ThinkifyCandidates;