import React from "react";

//import axios from 'axios';
import All from "../components/all";
import Request from "../components/request";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            requestedStuff: []
        };
    }



    render() {

        const productArray = event => {
            //console.log(event)
            //console.log("Something Something Something")
            this.setState({ requestedStuff: event })
        }

        const deleteRequestItem = event => {

            let updateRequestItem =[]
            updateRequestItem= this.state.requestedStuff;
            updateRequestItem.splice(event, 1);
            this.setState({ requestedStuff: updateRequestItem });
            updateRequestItem = []

        }
        const resetArray = test => {

            let updateRequestItem = this.state.requestedStuff;
            updateRequestItem.splice(0, updateRequestItem.length);
            this.setState({ requestedStuff: updateRequestItem });

        }
        return (
            <div>
                <Tabs  defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Home">
                        <div className="row ">
                            <div className="col-12 mt-5 text-center">
                                <h1>Find my stuff</h1>
                            </div>
                        </div>


                    </Tab>

                    <Tab eventKey="inventory" title="Inventory">
                        <div className="row ">
                            <div className="col-12 mt-5 text-center">
                                <h1>Inventory Management</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mt-5 text-center">
                                <div className="row">
                                    <div className="col-12">
                                        <All
                                        productArray = {productArray}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="request" title="Request">
                        <div className = "row">
                            <div className = "col-12 text-center">
                                <h1> Request Form </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Request
                                    requestArray = {this.state.requestedStuff}
                                    callBackFromDeleteRequestItem = {deleteRequestItem}
                                    reset = {resetArray}
                                />
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default App;