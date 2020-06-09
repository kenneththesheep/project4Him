import React from "react";

//import axios from 'axios';
import All from "../components/all";
import Request from "../components/request";
import Header from "../components/header";
import Homepage from "../pages/homepage"
import {DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import axios from 'axios';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

    const cookies = new Cookies();
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            requestedStuff: [],
            unsortedStuff: []
        };
        this.handleLogout = this.handleLogout.bind(this);
    }





handleLogout = () => {
    console.log( "delete")
    console.log(sessionStorage)
  }
    repopulate(){

              const url = '/inventories.json';

              axios.get(url)
                .then((response) => {
                    let data2="";
                    let data3 =[];
                    let data4="";
                  const data = response.data
                  console.log(data)
                  data.forEach((element,index)=>
                    {
                        for(let count =0; count<element.total_quantity; count++)
                        {
                            data3.push(element);
                        }
                    }
                    )
                  console.log(data3)
                  data4= data3.map((data,index)=>
                    {
                        return {
                            id:index+1,
                            icon: "⭕️",
                            status: "Unsorted",
                            title: "myLord",
                            content: data.name}
                    }
                    )
                  console.log(data4)
                  this.setState({ unsortedStuff: data4 })

                }).catch((error)=>{
                  console.log(error);
                })
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


                <Tabs  defaultActiveKey="home" id="uncontrolled-tab-example">
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
                    <Tab eventKey="movement" title="Movement">
                                    <DndProvider backend = { HTML5Backend }>

                                    <Header />
                                    <Homepage
                                    unsortedArray = {this.state.unsortedStuff}
                                    />

                                </DndProvider>
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
                <div className="row">
                <div className ="col-12 text-center mt-5">
                    <button onClick={()=>{ this.repopulate() }}>
                        Reproduce data first
                    </button>
                </div>
                </div>


            </div>
        );
    }
}

export default App;