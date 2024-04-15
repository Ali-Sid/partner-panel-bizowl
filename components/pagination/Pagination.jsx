import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = () => {
    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="previous"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination
