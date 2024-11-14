interface Props {
  setCurrentPageNumber: (n: number) => void,
  currentPageNumber: number,
  totalPages: number,
}

export default function PageControls({ setCurrentPageNumber, currentPageNumber, totalPages }: Props){

  

  const handlePageChange = (direction: 'left' | 'right') => {

    let newPage = currentPageNumber;
    if(direction === 'left' && currentPageNumber > 1){
      newPage--;
    }
    else if(direction === 'right' && currentPageNumber < totalPages){
      newPage++;
    }

    setCurrentPageNumber(newPage);
  }

  return (
    <div className='page-controls'>
      <PageArrow 
        handleClick={handlePageChange}
        direction="left"
        isDisabled={currentPageNumber <= 1? true : false}
      />
      <PageNumber 
        currentPage={currentPageNumber}
        totalPages={totalPages}
      />
      <PageArrow 
        handleClick={handlePageChange}
        direction="right"
        isDisabled={currentPageNumber >= totalPages? true : false}
      />
    </div>
  );
}

interface PageArrowProps {
  handleClick: (d: 'left' |'right') => void,
  direction: 'left' | 'right',
  isDisabled: boolean
}

function PageArrow({handleClick, direction, isDisabled}: PageArrowProps){

  const icon = direction === 'left'? '<-' : '->';

  return (
    <button className={`arrow-${direction} ` + (isDisabled? `disabled-arrow`: ` `)} onClick={() => handleClick(direction)} >
      {icon}
    </button>
  );

}

interface PageNumberProps {
  currentPage: number,
  totalPages: number
}

function PageNumber({ currentPage, totalPages }: PageNumberProps){

  return(
    <p>
      {currentPage + " / " + totalPages}
    </p>
  );
}