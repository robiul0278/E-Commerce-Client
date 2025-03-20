import { Button } from "antd";

/* eslint-disable react/prop-types */
const Pagination = ({setLimit, setPage,page,totalPage,limit}) => {
  const handleLimitChange = (e) => {
    const item = parseInt(e.target.value)
    console.log(item);
    setLimit(item);
    setPage(0)
}

const handlePrv = () => {
    if(page > 0){
        setPage(page - 1)
    }
}
const handleNext = () => {
    if(page < totalPage.length - 1){
        setPage(page + 1)
    }
}
  return (
    <div className='pagination'>
    <Button onClick={handlePrv}>Prv</Button>
    {
        totalPage.map(number => <Button
        className={page === number && 'selected'}
            onClick={() => { setPage(number) }}
            key={number}
        >{number}</Button>)
    }
    <Button onClick={handleNext}>Next</Button>
    <select value={limit} onChange={handleLimitChange}>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
    </select>
</div>
)}

export default Pagination;