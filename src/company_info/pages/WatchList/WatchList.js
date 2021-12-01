import React, {useEffect, useState} from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';
import DeleteWatchListButton from './components/DeleteWatchListButton'
import ShowCompanyDetailButton from './components/ShowCompanyDetailButton'



function WatchList() {
    const [datas, setData] = useState([]);

    useEffect ( () => {
        getPost();
    }, []);

    const getPost = () => {
        axios
            .get('/api/watchlist/')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <div className="h2">ウォッチリスト</div>
            <table className="table table-bordered custom-table">
                <tbody>
                    <tr>
                        <th>企業名</th>
                        <th>証券コード</th>
                        <th colSpan="2">アクション</th>
                    </tr>
                    {datas.map((data, index) => (
                        <tr key={ index }>
                            <td className="text-left">{ data.company_name }</td>
                            <td>{ data.company_code }</td>
                            <td><ShowCompanyDetailButton watchlist_id={ data.id }/></td>
                            <td><DeleteWatchListButton list_id={ data.id } getPost={ getPost }/></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}


export default WatchList