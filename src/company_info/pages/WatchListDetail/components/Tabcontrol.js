import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Calender from './Calender'

class Tabcontrol extends Component {

    render(){
        return (      
            <Tabs>
                <TabList>
                    <Tab>株価</Tab>
                    <Tab>四半期決算</Tab>
                    <Tab>通期決算</Tab>
                    <Tab>経済指標との関連</Tab>
                </TabList>
  
                <TabPanel>
                    <div>aaaa</div>
                    <div><Calender /></div>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        );
    }
}

export default Tabcontrol