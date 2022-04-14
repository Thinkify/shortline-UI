import React, { useState } from 'react';
import AccordionLayout from './AccordionLayout/AccordionLayout';

const Accordion = ({data}) => {
    const [activeIndex, setActiveIndex] = useState(-1);

  return (
      <div className='flex flex-col justify-center items-center'>
        {
            data?.length ? data.map((item, index) => {
                return <AccordionLayout 
                title="Accordion 1"
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              >
                This is Accordion 1 Content    
              </AccordionLayout>
            }) : null
        }
    </div>
  );
};

export default Accordion;