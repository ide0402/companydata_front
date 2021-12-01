import React from 'react';
import { Link } from 'react-router-dom';


function ShowCompanyDetailButton(props) {

    return (
        <div className="position-relative">
            <Link to={'/watchlist/' + props.watchlist_id } className="showdetail_button btn w-auto h-auto"><span>詳細</span></Link>
        </div>
    )
}

export default ShowCompanyDetailButton