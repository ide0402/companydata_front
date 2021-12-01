import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function DeleteWatchListButton(props) {
    const postDelete = () => {
        if (confirm('ウォッチリストから削除してもよろしいですか？')){
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    
            const headers = {
                headers: {
                  'X-CSRFToken': Cookies.get('csrftoken'),
                }
            }
            const data = {
                'watchlist_id': props.list_id,
            };
    
            axios.post(props.list_id + '/delete/', data, headers)
            .then(response => {
                alert('ウォッチリストから削除しました。')
                props.getPost();
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
            <button onClick={postDelete} className="delete_button btn w-auto h-auto"><span>削除</span></button>   
        </div>
    )
}


export default DeleteWatchListButton