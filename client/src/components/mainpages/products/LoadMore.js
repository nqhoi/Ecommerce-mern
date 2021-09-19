import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';
import './LoadMore.css'

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page
  const [result] = state.productsAPI.result

    return (
        <div className="loadMore">
            {
              result < page * 9 ? "" : 
              <button onClick={() => setPage(page+1)}>Load More</button>
            }
        </div>
    )
}

export default LoadMore
