import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination(props) {

    const ONE_PAGE_DISPLAY_COUNT = 100;


    const calculatePageCount = () => {
        return Math.ceil(props.total_count / ONE_PAGE_DISPLAY_COUNT)
    };

    const handlePageClick = (e) => {
        props.setPage(e.selected + 1)
        console.log(e);
    };
  
    // ページネーションを表示
    return (
        <div className="text-center">
            <ReactPaginate
                pageCount={calculatePageCount()} //総ページ数
                marginPagesDisplayed={2} //終端に表示する件数
                pageRangeDisplayed={3} //選択位置の前後で表示する件数
                onPageChange={handlePageClick} //ページクリック時にハンドルするメソッド
                containerClassName="pagination" //pageのulタグに設定するclass
                pageClassName="page-item" //pageのliタグに設定するclass
                pageLinkClassName="page-link" //pageのaタグに設定するclass
                activeClassName="active" //現在activeなpageに設定するclass
                activeLinkClassName="active"
                previousLinkClassName="previous-link" 
                nextLinkClassName="next-link"
                previousLabel="<<" //previousに設定するラベル名
                nextLabel=">>" //nextに設定するラベル名
                disabledClassName="disabled-button" //previous・nextが押せなくなった状態の表示
                breakLabel="・・・"  //pageの省略表示
            />
        </div>
    );
}
  
export default Pagination;