import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { findCandidate } from "../services/candidates";
import { useHistory, useLocation } from "react-router";
import AddCandidateBanner from "../components/AddCandidateBanner";
import SkillView from "../components/SkillView";
import whatIsTheQueryKey from "../utils/findapi.utlis";
import data from "../utils/demo";
import { Avatar } from "@mui/material";
import { stringAvatar, stringToColor } from "../utils/mui.utils";

const images = {
  flipkart: "flipkart.png",
  amazon: "amazon.png",
};

const skills = [
  "HTML",
  "CSS",
  "JS",
  "Bootstrap",
  "jQuery",
  "ReactJS",
  "Redux",
  "NextJS",
];

const Find = () => {
  const [candidate, setCandidate] = useState("");
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateEmptyError, setCandidateEmptyError] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const hideFindBox = params.get("hf");

  const goToAddIngo = () => {
    debugger;
    const key = Object.keys(candidateSearch);
    history.push(`/add?${key[0]}=${candidateSearch[key[0]]}`);
  };

  const findAndSetCandidate = async (value) => {
    try {
      var profile = whatIsTheQueryKey(value);
      setCandidateSearch({ [profile]: value });
      const res = await findCandidate({ [profile]: value });
      if (res.message) {
        setCandidateEmptyError(true);
        setCandidate("");
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

  const handleEdit = () => {
    history.push(`/update/${candidate.email}`);
  };

  return (
    <div className="h-full w-full py-4 px-4">
      {!hideFindBox && (
        <div className="flex flex-col items-center justify-center col-span-2">
          <form
            onSubmit={handleFind}
            className="bg-white shadow rounded w-full p-6 mt-4"
          >
            <p
              tabIndex="0"
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
        <div
          className={`bg-white overflow-auto h-11/12 p-3 shadow-sm rounded-sm ${
            candidate?.email && hideFindBox ? "col-span-6" : "col-span-4"
          }`}
        >
          <div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2 px-4 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <Avatar
                    {...stringAvatar(candidate.name || "")}
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: stringToColor(candidate.name || ""),
                      fontSize: 16,
                    }}
                  />
                </span>
                <span className="tracking-wide capitalize">
                  {candidate?.name}
                </span>

                {candidate.linkedInProfile && (
                  <a
                    href={`https://www.linkedin.com/in/${candidate.linkedInProfile}/`}
                  >
                    <img
                      className="h-4 mb-1 w-4 inline-block"
                      src="/images/linkendin.png"
                      alt=""
                    />
                  </a>
                )}
                {candidate.gitHub && (
                  <a href={`https://github.com/${candidate.gitHub}/`}>
                    <img
                      className="h-4 w-4 mb-1 inline-block"
                      src="/images/github.png"
                      alt=""
                    />
                  </a>
                )}
              </div>
              <div className="flex justify-end">
                <span onClick={handleEdit} className="cursor-pointer">
                  <i className="fas fa-edit" color="action" />
                </span>
              </div>
            </div>
            <div className="text-gray-700 py-4 px-1">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">Email</div>
                  <div className="px-4 py-1">
                    <a
                      className="text-blue-800"
                      href={`mailto:${candidate?.email}`}
                    >
                      {candidate?.email}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">Phone</div>
                  <div className="px-4 py-1">{candidate?.contact}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">Current Salary</div>
                  <div className="px-4 py-1">{candidate?.currentSalary}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">Expected Salary</div>
                  <div className="px-4 py-1">{candidate?.expectedSalary}</div>
                </div>
                {candidate.offersInHand && (
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-1 font-semibold">
                      Offer Candidate have
                    </div>
                    <div>
                      {candidate.offersInHand.map((offers) => (
                        <div className={"px-4 py-1 "} id={offers.company}>
                          <img
                            className="h-5 w-5 inline-block"
                            src={`/images/${
                              images[offers.company.toLowerCase()]
                            }`}
                            alt=""
                          />
                          <span className="font-semibold">
                            {offers.company}
                          </span>{" "}
                          of <span className="py-2">{offers.offer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">
                    Last updated time
                  </div>
                  <div className="px-4 py-1">
                    {new Date(candidate?.date).toGMTString().substring(0, 16)}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">YOE</div>
                  <div className="px-4 py-1">5+ Year of experience</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">Skills</div>
                  <div className="px-4 py-1 flex flex-wrap ">
                    {/* <p> */}
                    {skills.map((skill) => (
                      <span class="list-none text-white  rounded-lg bg-indigo-700 border p-1">
                        {skill}
                      </span>
                    ))}
                    {/* </p> */}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-1 font-semibold">
                    Vetting Rejected
                  </div>
                  <div className="px-4 py-1">
                    {new Date(candidate?.date).toGMTString().substring(0, 16)}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={"flex justify-between my-4 px-4"}>
              <span className={"mx-1"}>
                <button className="bg-blue-200 font-bold rounded-md px-3 py-1 text-black  hover:bg-blue-300 active:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300">
                  Skill
                </button>
              </span>
              <span className={"mx-1"}>
                <button className="bg-red-200 font-bold rounded-md px-3 py-1 text-black  hover:bg-red-300 active:bg-red-300 focus:outline-none focus:ring focus:ring-red-300">
                  Vetting results
                </button>
              </span>
              <span className={"mx-1"}>
                <button className="bg-green-200 font-bold rounded-md px-3 py-1 text-black  hover:bg-green-300 active:bg-green-300 focus:outline-none focus:ring focus:ring-green-300">
                  Years of experience
                </button>
              </span>
            </div> */}
          </div>
          <SkillView data={data} />
        </div>
      )}
      {candidateEmptyError && (
        <AddCandidateBanner onClickHandler={goToAddIngo} />
      )}
    </div>
  );
};

export default withRouter(Find);
