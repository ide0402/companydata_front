import React, {useEffect, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Calendar from './components/Calendar'
import Accountingresults from './components/Accountingresults'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import axios from 'axios';
import Cookies from 'js-cookie';


function WatchListDetail() {
    const { id } = useParams();
    const [company_name, setCompanyName] = useState('')
    // for calendar components
    const [stock_info, setStockInfo] = useState([]);
    const [date_range, setDateRange] = useState({
        // default range is past a week
        start_date: moment().subtract(6, 'days').toDate(),
        end_date: moment().toDate()
    });
    // for Accountingresults Components
    const [accounting_data, setAccountingData] = useState([]);
    const DEFAULT_DISPLAY_COLUMN = [
        {'column_name':'period',             'japanese_column_name':'期間',    'status':true},
        {'column_name':'fiscal_period',      'japanese_column_name':'四半期',   'status':true},
        {'column_name':'revenue',            'japanese_column_name':'売上',    'status':true},
        {'column_name':'operating_income',   'japanese_column_name':'営業利益', 'status':true},
        {'column_name':'net_income',         'japanese_column_name':'純利益',   'status':true},
        {'column_name':'earnings_per_share', 'japanese_column_name':'EPS',     'status':true}
    ]

    const [form_type, setFormType] = useState('quarter')
    const [accounting_type, setAccountingType] = useState('quarter')
    // const [fiscal_type, setFiscalType] = useState('quarterly')
    const [display_column, setDisplayColumn] = useState(DEFAULT_DISPLAY_COLUMN)
    let cik_code = ''

    useEffect ( () => {
        sendAccountingDataRequest();
    },[]);


    const sendAccountingDataRequest = () => {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  
        const headers = {
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        }
        const data = {
            'request_message': 'request accounting data',
        };

        axios
            .post(id + '/api/', data, headers)
            .then(res => {
                console.log(res.data);
                cik_code = res.data.cik;
                setCompanyName(res.data.company_name);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                connectAccountingAPI(cik_code)
            });
    }

    const connectAccountingAPI = (cik_code) => {
        axios
            .get('/api/accounting/', {
                params: {
                    cik: cik_code,
                }
            })
            .then(res => {
                let get_data = res.data;
                get_data = acountingDataSortByPeriod(get_data)
                setAccountingData(get_data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const acountingDataSortByPeriod = (data) => {
        data = data.sort(function(a,b){
            if (a.period > b.period ) return 1;
            if (b.period > a.period ) return -1;         
            return 0;
        })
        return data
    }
 
    return (
        <div>
            <div className="h1">{company_name}</div>
            <Tabs>
                <TabList>
                    <Tab>株価</Tab>
                    <Tab>決算情報</Tab>
                    <Tab>経済指標との関連</Tab>
                </TabList>

                <TabPanel>
                    <Calendar 
                        watchlist_id={ id }
                        date_range={ date_range }
                        setDateRange={ setDateRange }
                        stock_info={ stock_info }
                        setStockInfo={ setStockInfo }
                    />
                </TabPanel>
                <TabPanel>
                    <Accountingresults
                        accounting_data={ accounting_data }
                        accounting_type={ accounting_type }
                        setAccountingType={ setAccountingType }
                        form_type={ form_type }
                        setFormType={ setFormType }
                        display_column={display_column}
                        setDisplayColumn={setDisplayColumn}
                        default_display_column={DEFAULT_DISPLAY_COLUMN}
                    />
                </TabPanel>
                <TabPanel>
                    <h2>Any content 3</h2>
                </TabPanel>
            </Tabs>

        </div>
    )
}

export default WatchListDetail