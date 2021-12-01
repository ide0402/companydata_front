import React, {useEffect, useState} from 'react';
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function Calendar(props){

    const setCalendarDate = (start, end, label) => {
        props.setDateRange({
            start_date: start,
            end_date: end
        })
    }

    const sendGetRequest = () => {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  
        const headers = {
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        }
        const data = {
            'startDate': props.date_range.start_date,
            'endDate': props.date_range.end_date,
            'watchlist_id': props.watchlist_id,
        };

        axios.post('http://localhost:8000/test/', data, headers)
        .then(response => {
            let stock_info = response.data;
            stock_info = JSON.parse(stock_info).close;
            props.setStockInfo(stock_info);
        })
        .catch(error => {
            if (error.response) {
                //レスポンスの結果がエラーの時
                //設定の　validateStatus　でエラーになるHttpステータスの範囲を変更できる。
                console.log('レスポンス');
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                //レスポンスが受け取れなかった時
                //error.requestは環境に応じて以下のインスタンスを取る
                //  ブラウザ： XMLHttpRequest
                //  node.js: http.ClientRequest
                console.log('リクエスト');
                console.log(error.request);
            } else {
                //リクエストを準備している時にエラーが起きた時
                console.log('その他');
                console.log('Error', error.message);
            }
        })
    }

    useEffect ( () => {
        sendGetRequest();
    }, [props.date_range]);

    const displayStockPrice = () =>{
        if (props.stock_info == []){
            return (<div>データなし</div>)
        } else {
            return (
                <table className="table table-bordered pt-4 custom-table">
                    <tbody>
                        <tr>
                            <th>日付</th>
                            <th>終値</th>
                        </tr>            
                        {Object.keys(props.stock_info).map(function (key, index) {
                            return (
                                <tr key={index}>
                                    <td key={key}>{key}</td>
                                    <td key={index}>{props.stock_info[key]}</td>
                                </tr>
                            )
                        })}              
                    </tbody>
                </table>
            )
        }
    }
  
    return (
        <div>
            <div className="text-right">
                <DateRangePicker
                    initialSettings={{
                        startDate: props.date_range.start_date,
                        endDate: props.date_range.end_date,
                        alwaysShowCalendars: true,
                        autoApply: true,
                        locale: {
                            format: 'yyyy/MM/DD',
                            separator: '~',
                            applyLabel: "適用",
                            cancelLabel: "キャンセル",
                            customRangeLabel: "期間を指定",
                            daysOfWeek:['日','月','火','水','木','金','土'],
                            monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        },
                        ranges: {
                            '本日': [moment().toDate(), moment().toDate()],
                            '昨日': [
                                moment().subtract(1, 'days').toDate(),
                                moment().subtract(1, 'days').toDate(),
                            ],
                            '過去7日間': [
                                moment().subtract(6, 'days').toDate(),
                                moment().toDate(),
                            ],
                            '過去30日間': [
                                moment().subtract(29, 'days').toDate(),
                                moment().toDate(),
                            ],
                            '今月': [
                                moment().startOf('month').toDate(),
                                moment().endOf('month').toDate(),
                            ],
                            '先月': [
                                moment().subtract(1, 'month').startOf('month').toDate(),
                                moment().subtract(1, 'month').endOf('month').toDate(),
                            ],
                        },
                    }}
                    onCallback={setCalendarDate}
                >
                    <input 
                        type="text" 
                        className="" 
                        id="stock_calendar"
                    />
                </DateRangePicker>
            </div>
            <div className="pt-4">{displayStockPrice()}</div>
        </div>
  
    );  
}

export default Calendar