import React from 'react';
import { Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';

import { Header } from './company_info/components/Header';
import  WatchList  from './company_info/pages/WatchList/WatchList';
import  WatchListDetail  from './company_info/pages/WatchListDetail/WatchListDetail';
import  Search  from './company_info/pages/Search/Search';
import './App.scss';

export const App = () => {
    const { pathname } = useLocation();  
    return(
        <div>
                <Header />
                <div className="container">
                    <div className="p-5">
                        {/* <div className="table-responsive"> */}
                            <Routes>
                                {/* <Navigate from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}
                                <Route path='/' element={<WatchList />} />
                                <Route path='/search' element={<Search />} />
                                <Route path='/watchlist/:id' element={<WatchListDetail />} />
                                <Route render={() => <h4>not found...</h4>} />
                            </Routes>
                        {/* </div> */}
                    </div>
                </div>

        </div>
    );  
};

export default App;






// import React, { Component } from "react";
// import './App.css';
// import Calender from './Calender'

// class App extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       counter:0,
//       msg:'count start',
//     }
//     this.doAction = this.doAction.bind(this)
//   }

//   doAction(event){
//     this.setState({
//       counter:this.state.counter + 1,
//       msg:'*** count: ' + this.state.counter + ' ***' 
//     })
//   }

//   render() {
//     return (
//       <div className="container">
//         <div>
//           <Calender />
//         </div>
//       </div>
//     )
//   }
// }

// export default App;
