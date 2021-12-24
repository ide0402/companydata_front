import React, {useState, useEffect} from 'react';
import 'react-tabs/style/react-tabs.css';
import Modal from "react-modal"

Modal.setAppElement("#modal");

function Displaybox(props){
    const [modalIsOpen, setIsOpen] = useState(false);

    const createCheckBoxArea = () => {
        console.log('マウント')
        return (
            <ul className="list row p-2 h5 mb-2 mt-2">
            {props.display_column.map( (element, index) => {
                return (
                    <li key={index} className="list__item col">
                        <label className="label--checkbox">
                            <input type="checkbox" className="checkbox" name="checkbox_display_column" value={element['column_name']} onChange={ (evt) => handleChange(evt)} />
                            {element['japanese_column_name']}
                        </label>
                    </li>
                )
            })}
            </ul>
        )
    }

    const onClickApplyButton = () => {
        let new_display_column = props.display_column;
        document.getElementsByName('checkbox_display_column').forEach( (checkbox_display_column) =>{
            let target_column = new_display_column.find( 
                (column_list) => column_list.column_name == checkbox_display_column.value )
            target_column.status = checkbox_display_column.checked
            let target_column_index = new_display_column.findIndex( 
                (column_list) => column_list.column_name == checkbox_display_column.value )
            new_display_column.splice( target_column_index, 1, target_column);
            console.log(new_display_column)
            props.setDisplayColumn(new_display_column)
            setIsOpen(false)
        })
    }

    const handleChange = (event) => {
        // console.log(event.target.checked)
        // console.log(!event.target.checked)
        // event.target.checked = !event.target.checked
    }

    useEffect( () => {

        if (document.getElementsByName('checkbox_display_column') != null && modalIsOpen){
            addCheckToCheckbox();
        } else {
            console.log('未処理');
        }
    })

    const addCheckToCheckbox = async () => {
        const CHECKBOX_LIST = document.getElementsByName('checkbox_display_column')
        await waitProcessUntilDOMLoaded(CHECKBOX_LIST)
        CHECKBOX_LIST.forEach((checkbox_display_column) => {
            checkbox_display_column.checked = props.display_column.find( (column_list) => column_list.column_name == checkbox_display_column.value ).status;
        })    
    }

    const waitProcessUntilDOMLoaded = (element) => {
        const ID = setInterval(() => {
            if (element.length > 0){
                clearInterval(ID);
            } else if (time > 10){
                clearInterval(ID);
                alert('処理に時間がかかっています。\n後ほど再度実行してください。')
            }
        },1000)
    }

    return (
        <div className="display_box">
        <button onClick={() => setIsOpen(true)}>表示項目</button>
        <Modal isOpen={modalIsOpen}  onRequestClose={() => setIsOpen(false)}>
            <div className="modal-container_custom">
                <h2 className="modal-title_custom">表示項目を編集</h2>
                <div className="modal-content_custom">
                    <div className="row p-2 h5 mb-2 mt-2">
                        <div className="col">◇表示四半期データ</div>
                    </div>
                    <ul className="list row p-2 h5 mb-2 mt-2">                    
                        <li className="list__item col">
                            <label className="label--checkbox">
                                <input type="radio" className="checkbox" name="display_quarter" />
                                Q1
                            </label>
                        </li>
                        <li className="list__item col">
                            <label className="label--checkbox">
                                <input type="radio" className="checkbox" name="display_quarter"/>
                                Q2
                            </label>
                        </li>
                        <li className="list__item col">
                            <label className="label--checkbox">
                                <input type="radio" className="checkbox" name="display_quarter" />
                                Q3
                            </label>
                        </li>
                        <li className="list__item col">
                            <label className="label--checkbox">
                                <input type="radio" className="checkbox" name="display_quarter" />
                                Q4
                            </label>
                        </li>
                        <li className="list__item col">
                            <label className="label--checkbox">
                                <input type="radio" className="checkbox" name="display_quarter" />
                                ALL
                            </label>
                        </li>
                    </ul>
                    <div className="row p-2 h5 mb-2 mt-2">
                        <div className="col">◇表示指標</div>
                    </div>
                    {createCheckBoxArea()}                    
                </div>
                <div className="modal-footer_custom">
                    <button onClick={() => setIsOpen(false)}>キャンセル</button>
                    <button onClick={() => onClickApplyButton()}>適用</button>
                </div>
            </div>
        </Modal>
      </div>   
    );
}



export default Displaybox