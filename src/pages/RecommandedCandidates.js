import React from 'react';

const candiates = [
  {
    name: 'test1',
    email: 'test1@gmail.com',
    linkdin: 'test1',
  },
  {
    name: 'test2',
    email: 'test2@gmail.com',
    linkdin: 'test2',
  },
  {
    name: 'test3',
    email: 'test3@gmail.com',
    linkdin: 'test3',
  },
  {
    name: 'test4',
    email: 'test4@gmail.com',
    linkdin: 'test4',
  },
  {
    name: 'test5',
    email: 'test5@gmail.com',
    linkdin: 'test5',
  },
  {
    name: 'test6',
    email: 'test6@gmail.com',
    linkdin: 'test6',
  },
];

const RecommandedCandidates = () => {
  return (
    <div className="container m-auto pt-4">
      <div class="relative overflow-x-auto drop-shadow-lg sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Linkdin
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {candiates.map((candiate) => (
              <tr
                key={candiate.email}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {candiate.name}
                </th>
                <td class="px-6 py-4">{candiate.email}</td>
                <td class="px-6 py-4">{candiate.linkdin}</td>
                <td class="px-6 py-4 text-right">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecommandedCandidates;
