import React, { useEffect, useState } from 'react';
import { getUserWithSkills } from '../services/candidates';

const RecommandedCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    (async () => {
      const skills = ['react'];
      const result = await getUserWithSkills(skills);
      if (result && result.code === 200) {
        setCandidates(result.skilledUser);
        console.log('RecommandedCandidates', result);
      }
    })();
  }, []);

  return (
    <div className="container m-auto pt-4">
      <div className="relative overflow-x-auto drop-shadow-lg sm:rounded-lg">
        {candidates.length > 0 && (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Linkdin
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candiate) => (
                <tr
                  key={candiate._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {candiate.name}
                  </th>
                  <td className="px-6 py-4">{candiate.email}</td>
                  <td className="px-6 py-4">{candiate.linkedInProfile}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Link
                    </a>
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
