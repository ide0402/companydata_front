import React, {Component} from 'react';
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import DjangoCSRFToken from 'django-react-csrftoken'

function getCookie(name) {
  let cookieValue = null;

  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();

          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

              break;
          }
      }
  }
  return cookieValue;
}
 
class Calender extends Component {

  setCalendarDate(start, end, label){
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    const headers = {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      }
    }
    console.log(headers);
    const data = {
      'startDate': start,
      'endDate': end,
    };
    axios.post('http://localhost:8000/test/', {data}, {headers})
      .then(response => {
        console.log(response);
        console.log(response.data);
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

  render(){

    return (
    <form id="test" name="test"  action="/test/" method="post">
      <DjangoCSRFToken />
      <DateRangePicker
        initialSettings={{
          startDate: moment().toDate(),
          endDate: moment().toDate(),
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
        onCallback={this.setCalendarDate}
      >
        <input 
          type="text" 
          className="text-right" 
          id="stock_calendar"
        />
      </DateRangePicker>
    </form>  
    );
  }
}

export default Calender