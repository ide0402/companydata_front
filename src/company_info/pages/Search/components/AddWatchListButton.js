import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function AddWatchListButton(props) {
    const navigate = useNavigate();

    const addWatchList = () => {
        if (confirm('ウォッチリストに追加しますか？')){
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    
            const headers = {
                headers: {
                  'X-CSRFToken': Cookies.get('csrftoken'),
                }
            }
            const data = {
                'id': props.list_id,
            };
    
            axios.post(props.list_id + '/store/', data, headers)
            .then(response => {
                alert('ウォッチリストに追加しました。');
                navigate('/search');
            })
            .catch(error => {
                if (error.response) {
                    //レスポンスの結果がエラーの時
                    console.log(error.response.data);
                } else if (error.request) {
                    //レスポンスが受け取れなかった時
                    console.log(error.request);
                } else {
                    //リクエストを準備している時にエラーが起きた時
                    console.log('Error', error.message);
                }
            })    
        }
    }

    return (
        <div className="position-relative">
            <button onClick={addWatchList} className="add_list_button btn w-auto h-auto">
                <span>追加</span>
                <i className="fas fa-angle-right fa-position-right"></i>
            </button>
        </div>
    )
}


export default AddWatchListButton