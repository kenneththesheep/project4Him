import React from "react";

//import axios from 'axios';
import All from "../components/all";
import Request from "../components/request";
import Header from "../components/header";
import Header2 from "../components/header2";
import Header3 from "../components/header3";
import Header4 from "../components/header4";
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
import Collapse from 'react-bootstrap/Collapse'
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
            unsortedStuff: [],
            initialPage: true
        };
        this.handleLogout = this.handleLogout.bind(this);
    }


toggleAway =()=>{
    this.setState({initialPage: false})
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
        let test =""
        if(this.state.initialPage)
        {
            test=(
            <div class="row">
                <div class ="col-12 text-center pt-5 pb-5">
                    <img className="frontcompanylogo" src="/companylogo.png" onClick={()=>{ this.toggleAway() }}/>
                </div>
            </div>
                )
        }
        else(
            test =(
                <div className="fadeintrick">
            <img className="companylogo2" src="/companylogo.png"/>

                <Tabs  defaultActiveKey="home" id="uncontrolled-tab-example" >
                    <Tab eventKey="home" title="Home">
                        <Header4 />
                        <div className = "row">
                            <div className ="col-8">


                                <h2>Mako House Inventory Management System </h2>
                                <p>The future solution for the modern home. Do not fret as our system will help you manage what you deem as a "Sephiroth-level" disaster.</p>
                                <h2>Who we are</h2>
                                <p>TThe Shinra Electric Power Company, also known as Shinra Inc. (神羅カンパニー, Shinra Kanpanī?, lit. Shinra Company) and sometimes spelled Shin-Ra, is an industrial enterprise in the world of Final Fantasy VII. It is primarily a power company, supplying mako energy and making electricity easily and widely available. Its reach sees its presence as a megacorporation with significant underhanded influence into societal, infrastructural, and political spheres. Shinra also operates in genetic engineering, space exploration, and projects its power through a military that includes the elite group SOLDIER. Their military power, combined with their commercial monopoly on mako energy, gives Shinra a measure of control over the world populace.</p>
                                <h2>What we do</h2>
                                <p>Property upkeep covers such tasks as maintaining the structural soundness of the house; keeping plumbing, electrical wiring, and the heating/cooling system in good working order; maintaining or replacing major appliances (water heater, washer, dryer, refrigerator, etc.); and checking the house periodically for safety (good lighting, handrails where needed, rugs and carpets securely anchored, etc.) and security (locks and other security devices) measures.

Exterior property maintenance includes keeping the roof, paint, or siding of the house in good shape; snow and ice removal; and lawn care or landscaping.

Purchasing, insuring, and maintaining an automobile is generally considered a form of property upkeep, whether the car is kept in a garage or parked outside on the street.</p>

                            </div>
                            <div className ="col-4">

                            </div>
                        </div>

                    </Tab>

                    <Tab eventKey="inventory" title="Inventory">
                        <Header2 />

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
                    <Tab eventKey="allocation" title="Allocation">
                                    <DndProvider backend = { HTML5Backend }>

                                    <Header />
                                    <Homepage
                                    unsortedArray = {this.state.unsortedStuff}
                                    />

                                </DndProvider>
                    </Tab>
                    <Tab eventKey="cart" title="Cart">
                        <Header3 />
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
                )
            )

        return (
            <div>
            {test}
            </div>
        );
    }
}

export default App;