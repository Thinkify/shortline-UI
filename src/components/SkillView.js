import React, { useState } from 'react';

const SkillView = ({ data }) => {
  const [openAccodingId, setOpenAccodingId] = useState(-1);

  const handleClick = (event, i) => {
    event.stopPropagation();
    if (openAccodingId === i) {
      setOpenAccodingId(-1);
    } else {
      setOpenAccodingId(i);
    }
  };

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
    <div>
      <div className={'font-medium text-gray-600'}>
        <div className={'grid grid-cols-12 my-4'}>
          <span className={'col-span-4'}>Skill</span>
          <span className={'col-span-4'}>Vetting results</span>
          <span className={'col-span-4'}>Years of experience</span>
        </div>
        <div className="bg-white mx-auto">
          <div className="shadow-box p-0">
            {data &&
              data?.length &&
              data.map((range, i) => (
                <div key={i}>
                  {range?.wide_range?.map((info, index) => (
                    <div
                      className="relative border-t border-gray-200"
                      key={info.topic}
                    >
                      <button
                        type="button"
                        className="w-full px-0 py-6 text-left"
                        onClick={(e) => handleClick(e, index)}
                      >
                        <div className={'grid grid-cols-12 mt-4'}>
                          <span className={'col-span-4'}>
                            {openAccodingId === index ? (
                              <i className="fas fa-chevron-up my-1 mr-2 text-gray-400" />
                            ) : (
                              <i className="fas fa-chevron-down my-1 mr-2 text-gray-400" />
                            )}
                            <span className="text-lg text-gray-600 font-semibold">
                              {info.topic}
                            </span>
                          </span>
                          <span className={'col-span-4'}>
                            {renderStars(9 * 10)}
                          </span>
                          <span className={'col-span-4'}>4 Years</span>
                        </div>
                      </button>

                      <div
                        className={`pl-4 border-b border-gray-200 relative overflow-auto transition-all duration-700 ${
                          openAccodingId === index ? 'h-auto' : 'h-0'
                        }`}
                      >
                        <div className="grid grid-cols-12 ">
                          <div className={'col-span-8'}>
                            <div className={' grid grid-cols-2 '}>
                              {info.concepts.map((subtopic) => (
                                <React.Fragment key={subtopic.name}>
                                  <span className={'col-span-1'}>
                                    {subtopic.name}
                                  </span>
                                  <span className={'col-span-1'}>
                                    {getRatingBar(subtopic.rating * 10)}
                                    {subtopic.rating * 10}
                                    {'%'}
                                  </span>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>

                          <div className={'col-span-4'}>
                            <div className={'flex flex-col pb-3'}>
                              <span
                                className={'font-medium text-gray-800 text-xs'}
                              >
                                {' '}
                                How they compare with other developers in
                                Thinkify
                              </span>
                              <div className={'flex flex-row mt-1'}>
                                <span
                                  className={
                                    'w-3 h-3 bg-purple-600 inline-block mr-4'
                                  }
                                ></span>
                                <span
                                  className={
                                    'font-medium text-gray-800 text-xs'
                                  }
                                >
                                  Top 10%
                                </span>
                              </div>
                              <div className={'flex flex-row mt-1'}>
                                <span
                                  className={
                                    'w-3 h-3 bg-green-600 inline-block mr-4'
                                  }
                                ></span>
                                <span
                                  className={
                                    'font-medium text-gray-800 text-xs'
                                  }
                                >
                                  Top 20%
                                </span>
                              </div>
                              <div className={'flex flex-row mt-1'}>
                                <span
                                  className={
                                    'w-3 h-3 bg-orange inline-block mr-4'
                                  }
                                ></span>
                                <span
                                  className={
                                    'font-medium text-gray-800 text-xs'
                                  }
                                >
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
