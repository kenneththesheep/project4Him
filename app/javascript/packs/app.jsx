import React from 'react';

//import axios from 'axios';
import All from '../components/all';
import Request from '../components/request';
import Help from '../components/help';
import Header from '../components/header';
import Header2 from '../components/header2';
import Header3 from '../components/header3';
import Header4 from '../components/header4';
import Header5 from '../components/header5';
import Homepage from '../pages/homepage'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane';
import axios from 'axios';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import Collapse from 'react-bootstrap/Collapse'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Card from 'react-bootstrap/Card'

import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

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
    this.handleLogout = this.handleLogout.bind( this );
  }


  toggleAway = () => {
    this.setState( {
      initialPage: false
    } )
  }


  handleLogout = () => {
    console.log( 'delete' )
    console.log( sessionStorage )
  }
  repopulate() {

    const url = '/inventories.json';

    axios.get( url )
      .then( (response) => {
        let data2 = '';
        let data3 = [];
        let data4 = '';
        const data = response.data
        console.log( data )
        data.forEach( (element, index) => {
          for (let count = 0; count < element.total_quantity; count++) {
            data3.push( element );
          }
        }
        )
        console.log( data3 )
        data4 = data3.map( (data, index) => {
          return {
            id: index + 1,
            icon: '⭕️',
            status: 'Unsorted',
            title: 'myLord',
            content: data.name
          }
        }
        )
        console.log( data4 )
        this.setState( {
          unsortedStuff: data4
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }




  render() {
    function CustomToggle( {children, eventKey} ) {
      const decoratedOnClick = useAccordionToggle( eventKey, () => console.log( 'totally custom!' ),
      );

      return (
      <button type="button"
              style={ { backgroundColor: 'transparent', width: '75px', border: 'transparent' } }
              onClick={ decoratedOnClick }>
        { children }
      </button>
      );
    }
    const productArray = event => {
      //console.log(event)
      //console.log("Something Something Something")
      this.setState( {
        requestedStuff: event
      } )
    }

    const deleteRequestItem = event => {

      let updateRequestItem = []
      updateRequestItem = this.state.requestedStuff;
      updateRequestItem.splice( event, 1 );
      this.setState( {
        requestedStuff: updateRequestItem
      } );
      updateRequestItem = []

    }
    const resetArray = test => {

      let updateRequestItem = this.state.requestedStuff;
      updateRequestItem.splice( 0, updateRequestItem.length );
      this.setState( {
        requestedStuff: updateRequestItem
      } );

    }
    let test = ''
    if ( this.state.initialPage ) {
      test = (
        <div class="row">
          <div class="col-12 text-center pt-5 pb-5">
            <img className="frontcompanylogo"
                 src="/companylogo.png"
                 onClick={ () => {
                             this.toggleAway()
                           } }/>
        </div>
        </div>
      )
    }
    else (
      test = (
        <div className="fadeintrick">
          <img className="companylogo2" src="/companylogofront.png"/>
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab className="bodyText"
                 eventKey="home"
                 title="About">
              <Header4 />
              <div className="row">
                <div className="col-8 text-center">
                  <Accordion defaultActiveKey="0">
                    <h2 className="bodyTitle mt-3">Who we are</h2>
                    <br />
                    <CustomToggle eventKey="0">
                      <img className="icon-tab" src = "/ff7tag.png"/>
        </CustomToggle>
                    <br />
                    <Accordion.Collapse eventKey="0">
                      <div className="mt-4">
                        <p className="bodyText">
                          TThe Shinra Electric Power Company, also known as Shinra Inc. (神羅カンパニー, Shinra Kanpanī?, lit. Shinra Company) and sometimes spelled Shin-Ra, is an industrial enterprise in the world of Final Fantasy VII. It is primarily a power
                          company, supplying mako energy and making electricity easily and widely available.
                        </p>
                        <p className="bodyText">
                          Its reach sees its presence as a megacorporation with significant underhanded influence into societal, infrastructural, and political spheres. Shinra also operates in genetic engineering, space exploration, and projects its power
                          through a military that includes the elite group SOLDIER. Their military power, combined with their commercial monopoly on mako energy, gives Shinra a measure of control over the world populace.
                        </p>
                      </div>
                    </Accordion.Collapse>
                    <h2 className="bodyTitle mt-4">Mako House Inventory Management System</h2>
                    <br />
                    <CustomToggle eventKey="1">
                      <img className="icon-tab" src = "/ff7tag.png"/>
        </CustomToggle>
                    <Accordion.Collapse eventKey="1">
                      <div className="mt-4">
                        <p className="bodyText">
                          The future solution for the modern home. Do not fret as our system will help you manage what you deem as a "Sephiroth-level" disaster.
                        </p>
                        <ol>
                          <li className="bodyText">
                            Live update of purchases management
                          </li>
                          <li className="bodyText">
                            Live update of location of items for efficient store management
                          </li>
                          <li className="bodyText">
                            Quick contact to supply team when supply is low
                          </li>
                        </ol>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              </div>
            </Tab>
            <Tab eventKey="inventory" title="Inventory">
              <Header2 />
              <div className="row">
                <div className="col-12 mt-5 text-center">
                  <div className="row">
                    <div className="col-12">
                      <All productArray={ productArray } />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="allocation" title="Allocation">
                <div class="row">
                    <div class="col-12">
                        <Header />

                    </div>
                </div>

                <div class="row">
                    <div class="col-3 text-center">
                        <img className="unsorted" src = "/cart3.png"/>
                    </div>
                    <div class="col-3 text-center">
                        <img className="toilet" src = "/toilet.png"/>
                    </div>
                    <div class="col-3 text-center">
                        <img className="livingroom" src = "/livingroom.png"/>
                    </div>
                    <div class="col-3   ">
                        <img className="kitchen" src = "/kitchen.png"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <DndProvider backend={ HTML5Backend }>

                            <Homepage unsortedArray={ this.state.unsortedStuff } />
                        </DndProvider>
                    </div>
                </div>
            </Tab>

            <Tab eventKey="cart" title="Cart">
              <Header3 />
              <div className="row">
                <div className="col-12">
                  <Request requestArray={ this.state.requestedStuff }
                           callBackFromDeleteRequestItem={ deleteRequestItem }
                           reset={ resetArray } />
                </div>
              </div>
            </Tab>
            <Tab eventKey="help" title="Help">
                <Header5 />
              <div className="row">
                <div className="col-12 mt-3">
                  <Help />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      )
    )

    return (
    <div className="backbodyApp">
      { test }
    </div>
    );
  }
}

export default App;