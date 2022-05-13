import React, { useState } from 'react';

const SkillView = ({ data }) => {
  const renderStars = (rating) => {
    const stars = [];
    let yellow = 0;

    if (rating <= 100 && rating > 91) {
      yellow = 5;
    } else if (rating <= 90 && rating > 71) {
      yellow = 4;
    } else if (rating <= 70 && rating > 51) {
      yellow = 3;
    } else if (rating <= 50 && rating > 36) {
      yellow = 2;
    } else {
      yellow = 1;
    }

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          className={`fas fa-star mr-1 ${
            yellow >= i ? 'text-yellow-400' : 'text-gray-400'
          }`}
          key={i}
        />
      );
    }

    return <div>{stars}</div>;
  };

  const getRatingBar = (rating) => {
    console.log('rating:', rating);
    if (rating <= 100 && rating > 91)
      return (
        <span
          className={'w-12 h-3 bg-purple-600 inline-block rounded-lg mr-4'}
        ></span>
      );
    else if (rating <= 90 && rating > 71)
      return (
        <span
          className={'w-12 h-3 bg-green-600 inline-block rounded-lg mr-4'}
        ></span>
      );
    else
      return (
        <span
          className={'w-12 h-3 bg-orange inline-block rounded-lg mr-4'}
        ></span>
      );
  };

  return (
    <div className="">
      <div className={'font-medium text-gray-600'}>
        <div className="bg-white mx-auto">
          <div className="shadow-box p-0">
            {data &&
              data?.length &&
              data.map((range, i) => (
                <div key={i}>
                  {range?.wide_range?.map((info, index) => (
                    <div
                      className="relative border-b border-gray-400"
                      key={info.topic}
                    >
                      <div className="w-full mb-2 text-left">
                        <div className={'grid grid-cols-12 mt-4'}>
                          <span className={'col-span-4'}>
                            <span className="text-base text-gray-600 font-semibold">
                              {info.topic}
                            </span>
                          </span>
                          <span className={'col-span-4'}>
                            {renderStars(9 * 10)}
                          </span>
                          <span className={'col-span-4'}>4 Years</span>
                        </div>
                      </div>

                      <div className="relative overflow-auto transition-all duration-700">
                        <div className="grid grid-cols-12 ">
                          <div className={'col-span-8'}>
                            <div className={' grid grid-cols-2 '}>
                              {info.concepts.map((subtopic) => (
                                <React.Fragment key={subtopic.name}>
                                  <span className="col-span-1 text-slate-400">
                                    {subtopic.name}
                                  </span>
                                  <span className="col-span-1">
                                    {getRatingBar(subtopic.rating * 10)}
                                    {subtopic.rating * 10}
                                    {'%'}
                                  </span>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>

                          <div className={'col-span-4'}>
                            <div className={'flex flex-col gap-1 pb-3'}>
                              <span className="font-medium text-gray-800 text-xs">
                                Other developers in Thinkify
                              </span>
                              <div className={'flex'}>
                                <span className="w-3 h-3 bg-purple-600 inline-block mr-2" />
                                <span className="font-medium text-gray-800 text-xs">
                                  Top 10%
                                </span>
                              </div>
                              <div className={'flex'}>
                                <span className="w-3 h-3 bg-green-600 inline-block mr-2" />
                                <span className="font-medium text-gray-800 text-xs">
                                  Top 20%
                                </span>
                              </div>
                              <div className={'flex'}>
                                <span className="w-3 h-3 bg-orange inline-block mr-2" />
                                <span className="font-medium text-gray-800 text-xs">
                                  Top 60%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillView;
