import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { findCandidate } from "../services/candidates";
import { useHistory, useLocation } from "react-router";
import whatIsTheQueryKey from "../utils/findapi.utlis";

const Find = () => {
  const [candidate, setCandidate] = useState("");
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateEmptyError, setCandidateEmptyError] = useState(false);


  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const hideFindBox = params.get("hf");

  const goToAddIngo = () => {
	const key = Object.keys(candidateSearch);
	history.push(`/add?${key[0]}=${candidateSearch[key[0]]}`);
  }

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
    const slug = params.get("find");
    if (slug) {
      findAndSetCandidate(slug);
    }
  }, [location?.search]);

  const handleFind = async (event) => {
    event.preventDefault();
    const { data } = event.target.elements;
    findAndSetCandidate(data?.value);
  };

  return (
    <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-4 px-4 grid grid-cols-6 gap-6">
      {!hideFindBox && (
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
      )}
      {candidate?.email && (
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
                    <a
                      className="text-blue-800"
                      href={`mailto:${candidate?.email}`}
                    >
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
                  <div className="px-4 py-2 font-semibold">
                    Last updated time
                  </div>
                  <div className="px-4 py-2">
                    {new Date(candidate?.date).toGMTString().substring(0, 16)}
                  </div>
                </div>
              </div>
            </div>
            <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
              Edit Information
            </button>
          </div>
        </div>
      )}
      {candidateEmptyError && (
        <div
          id="alert-additional-content-4"
          class="p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200  col-span-4 flex justify-center items-center flex-col"
          role="alert"
        >
          <div class="flex items-center">
            <svg
              class="mr-2 w-5 h-5 text-blue-700 dark:text-blue-800"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-blue-700 dark:text-blue-800">
              This is a warning alert
            </h3>
          </div>
          <div class="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
            We current dont have the info of the candiate. Your can add the details.
          </div>
          <div class="flex">
            <button
				onClick={goToAddIngo}
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-800 dark:hover:bg-blue-900"
            >
              <svg
                class="-ml-0.5 mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
			  Add infomation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Find);
