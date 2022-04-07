import React, { useState } from "react";
import { withRouter } from "react-router";
import { findCandidate } from "../services/candidates";

const Find = () => {
  const [candidate, setCandidate] = useState("");

  const handleFind = async (event) => {
    event.preventDefault();
    const { data } = event.target.elements;
    try {
      const res = await findCandidate({ email: data?.value });
      console.log("candidate", res);
      setCandidate(res);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-4 px-4 grid grid-cols-6 gap-6">
      <div className="flex flex-col items-center justify-center col-span-2">
        <form
          onSubmit={handleFind}
          className="bg-white shadow rounded w-full p-6 mt-4"
        >
          <p
            tabindex="0"
            className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
          >
            Search Candidate
          </p>
          <div className={"mt-8"}>
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
      {candidate && (
        <div className="bg-white p-3 shadow-sm rounded-sm col-span-4">
          <div>
		  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide">{candidate?.name}</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">email</div>
                <div className="px-4 py-2">
					<a className="text-blue-800" href={`mailto:${candidate?.email}`}>
                    {candidate?.email}
                  	</a>
					
				</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Phone</div>
                <div className="px-4 py-2">{candidate?.contact}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">currentSalary</div>
                <div className="px-4 py-2">{candidate?.currentSalary}</div>
              </div>
			  <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">expectedSalary</div>
                <div className="px-4 py-2">{candidate?.expectedSalary}</div>
              </div>
              
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">linkedInProfile</div>
                <div className="px-4 py-2">{candidate?.linkedInProfile}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Github</div>
                <div className="px-4 py-2">{candidate?.gitHub}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Last updated time</div>
                <div className="px-4 py-2">{new Date(candidate?.date).toGMTString().substring(0,16)}</div>
              </div>
            </div>
          </div>
          <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
            Edit Information
          </button>
		  </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Find);
