import React, {useEffect, useState} from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';
import AddWatchListButton from './components/AddWatchListButton';
import Pagination from './components/Pagination';
import renewPic from './images/renew.jpeg';


function Search() {
    const [datas, setData] = useState([]);
    const [query, setQuery] = useState([]);
    const [total_count, setTotalCount] = useState([]);
    const [page, setPage] = useState([]);

    useEffect ( () => {
        getPost();
    }, []);

    useEffect(() => {
        getPost();
    }, [query])

    useEffect(() => {
        getPost();
    }, [page])

    const getPost = () => {
        axios
            .get('/api/companylist/', {
                params: {
                    query: query,
                    page: page,
                }
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setData(res.data.results);
                setTotalCount(res.data.count);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getQuery = (e) => {
        setPage([]);
        setQuery(e.target.value);
    }

    const getNewCompanyList = () => {
        if (confirm('最新の情報を取得します。よろしいですか？\n※30秒ほど時間がかかります。')){
            axios
                .get('/search/newlist/')
                .then(res => {
                    getPost();
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    alert('完了しました。')
                })

        }
    }

    return (
        <div className="w-75">
            <input 
                type="text" 
                className="w-25 mb-3" 
                onChange={getQuery}
                placeholder="銘柄名やコードを入力"
            />
            <div className="text-right p-1"><button onClick={getNewCompanyList}><img src={renewPic} alt="再更新" /><span>最新データを取得</span></button></div>
            <table className="table table-bordered custom-table">
                <tbody>
                    <tr>
                        <th>企業名</th>
                        <th>証券コード</th>
                        <th>ウォッチリスト</th>
                    </tr>
                    {datas.map((data, index) => (
                    <tr key={ index }>
                        <td className="text-left">{ data.company_name }</td>
                        <td>{ data.company_code }</td>
                        <td><AddWatchListButton list_id={ data.id } /></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                total_count = {total_count}
                setPage = { setPage }
            />
        </div>
    )
}

export default Search