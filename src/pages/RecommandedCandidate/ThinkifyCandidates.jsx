import React from 'react';

const ThinkifyCandidates = ({ candidates }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        {candidates.map((candiate) => (
          <tr
            key={candiate._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td scope="row" className="px-6 py-4">
              <div className="font-medium text-gray-900">{candiate.name}</div>
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
