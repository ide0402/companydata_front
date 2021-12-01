import React, {useState, useEffect} from 'react';
import 'react-tabs/style/react-tabs.css';

function Selectbox(props){

    useEffect( () => {
        if (document.getElementById('awesomeness-' + props.placeholder_type + props.state) != null){
            document.getElementById('awesomeness-' + props.placeholder_type + props.state).checked = true;
        }
    })

    // props placeholder_type, select_option
    const PLACEHOLDER_TEXT = {
        'form_type': '決算種類',
        'accounting_type': '四半期データ',
        'display':'表示項目',
    }

    const handleChange = (option) => {
        if (option in props.option_list){
            props.statehook(option);
            if (props.placeholder_type == 'form_type' && option == 'annual'){
                props.setAccountingType('total');
                setAccountingTypeDisabledStatus(true);
            }
        }
    }

    return (
        <div className="select_box">
            <ul className="select">
                <li>
                    <input className="select_close" type="radio" name={"awesomeness_" + props.placeholder_type} id={"awesomeness-close_" + props.placeholder_type} value="" onChange={() => handleChange('')}/>
                    <span className="select_label select_label-placeholder">{PLACEHOLDER_TEXT[props.placeholder_type]}</span>
                </li>

                <li className="select_items">
                    <input className="select_expand" type="radio" name={"awesomeness_"+ props.placeholder_type} id={"awesomeness-opener_" + props.placeholder_type} onChange={() => handleChange('')}/>
                    <label className="select_closeLabel" htmlFor={"awesomeness-close_" + props.placeholder_type}></label>

                    <ul className="select_options">
                    {Object.keys(props.option_list).map((option, index) => (
                        <li key={index} className="select_option">
                            <input className="select_input" type="radio" name={"awesomeness_" + props.placeholder_type} id={'awesomeness-' + props.placeholder_type + option} onChange={() => handleChange(option)}/>
                            <label className="select_label" htmlFor={'awesomeness-' + props.placeholder_type + option}>{props.option_list[option]}</label>
                        </li>                            
                    ))}
                    </ul>

                    <label className="select_expandLabel" htmlFor={"awesomeness-opener_" + props.placeholder_type}></label>
                </li>
            </ul>
        </div>
    )
}

export default Selectbox