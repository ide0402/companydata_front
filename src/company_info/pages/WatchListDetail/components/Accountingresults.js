import React, {useEffect, useState} from 'react';
import Selectbox from './Selectbox';
import Displaybox from './Displaybox';

function Accountingresults(props){

    const FORM_OPTION = {
        'quarter': '四半期決算',
        'annual': '通期決算',
    }

    const ACCOUNTING_TYPE_OPTION = {
        'quarter': '四半期ごと',
        'total': '累計',
    }

    const extractNecessaryDataFromAccountingData = () => {
        let necessary_accounting_data = props.accounting_data;
        if (props.form_type == 'annual'){
            necessary_accounting_data =  props.accounting_data.filter(function(data, index){
                if ((data.accounting_type).indexOf(props.accounting_type) >= 0 && data.fiscal_period == 'Q4') return true;
            });
        } else if (props.form_type == 'quarter') {
            necessary_accounting_data = props.accounting_data.filter(function(data, index){
                if ((data.accounting_type).indexOf(props.accounting_type) >= 0) return true;
            });
        }
        necessary_accounting_data = convertFormat(necessary_accounting_data);
        return necessary_accounting_data;
    }


    const convertFormat = (accounting_data) => {
        let regex = RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/);
        for (let i = 0; i < accounting_data.length; i++){
            props.default_display_column.forEach(element => {
                let column_name = element['column_name']
                if (regex.test(accounting_data[i][column_name])){
                    accounting_data[i][column_name] = accounting_data[i][column_name].toLocaleString( undefined, { maximumFractionDigits: 20 });
                }
            })
        }
        return accounting_data
    }

    const ACCOUNTING_DATA = extractNecessaryDataFromAccountingData();

    return (
        <div className="pt-4">
            <div className="h2">{FORM_OPTION[props.form_type]}</div>
            <div className="d-flex flex-row-reverse">
                <button>CSVダウンロード</button>
                <Displaybox
                    display_column={props.display_column}
                    setDisplayColumn={props.setDisplayColumn} 
                />
                <Selectbox 
                    placeholder_type="accounting_type"
                    statehook={props.setAccountingType}
                    state={props.accounting_type}
                    option_list={ACCOUNTING_TYPE_OPTION}
                    setAccountingType={props.setAccountingType}
                    form_type={props.form_type}
                    setFormType={props.setFormType}
                />
                <Selectbox 
                    placeholder_type="form_type"
                    statehook={props.setFormType}
                    state={props.form_type}
                    option_list={FORM_OPTION}
                    setAccountingType={props.setAccountingType}
                    form_type={props.form_type}
                    setFormType={props.setFormType}
                />
            </div>

            {/* ここ */}
            <table className="table table-bordered custom-table">
                <tbody>
                    <tr>
                    {props.display_column.map((element, index) => (
                        <th key={index}>{element['japanese_column_name']}</th>
                    ))}
                    </tr>
                    {ACCOUNTING_DATA.map((data, index) => (
                    <tr key={index}>
                        {props.display_column.map((element, index_col) => (
                        <td key={index_col}>{data[element['column_name']]}</td>
                        ))}                        
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>  
    );  
}

export default Accountingresults