import React, { useState } from 'react'

import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Carousel from 'react-bootstrap/Carousel'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane';
import { storage } from '../firebase';
import SplitButton from 'react-bootstrap/SplitButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Popup from "reactjs-popup";

class All extends React.Component {
  constructor() {
    super();

    this.state = {
      inventories: [],
      stockToOrder: [],
      addForm: false,
      productName: '',
      total_quantity: '',
      remarks: '',
      selectedFile: null,
      image: null,
      url: '',
      progress: 0,
      searchResult: 0,
      category: ''
    }

    this.handleChange = this
      .handleChange
      .bind( this );
    this.handleUpload = this.handleUpload.bind( this );
  }

  changeSearchHandler( event ) {
    this.setState( {
      searchResult: event.target.value
    } );
    console.log( this.state.searchResult )
    //console.log(this.props)

    //this.props.callBackFromForm(event);

    //console.log("change", event.target.value);
  }

  getSearchPosts = () => {

    this.setState( {
      addForm: false
    } )

    const url = '/inventories.json';


    axios.get( url, {
      params: {
        foo: 'searchName',
        productName: this.state.searchResult
      }
    } )
      .then( (response) => {
        console.log( 'something' )
        const data = response.data
        this.setState( {
          inventories: data
        } )
        this.setState( {
          searchResult: ''
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  handleChange = e => {
    if ( e.target.files[ 0 ] ) {
      const image = e.target.files[ 0 ];
      this.setState( () => ({
        image
      }) );
    }
  }

  handleUpload = () => {
    const {image} = this.state;
    const uploadTask = storage.ref( `images/${image.name}` ).put( image );
    uploadTask.on( 'state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
        this.setState( {
          progress
        } );
      },
      (error) => {
        // error function ....
        console.log( error );
      },
      () => {
        // complete function ....
        storage.ref( 'images' ).child( image.name ).getDownloadURL().then( url => {
          console.log( url );
          this.setState( {
            url
          } );
        } )
      } );
  }
  /*fileChangedHandler=(event)=> {
      console.log(this)
    this.setState({ selectedFile: event.target.files })
  }

  uploadHandler=()=> {
      let bucketName = 'images';
      let file = this.state.selectedFile[0];
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
      let uploadTask = storageRef.put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
              console.log(uploadTask.storage)
              console.log(uploadTask.snapshot)
              console.log*uploadTask

          }

          )
                  firebase.storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then(url => console.log(url));

      console.log(this.state.selectedFile)
      const uploadTask = storage.ref(`/${this.state.selectedFile.name}`).put(this.state.selectedFile);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(uploadTask)
          this.setState({progress:progress});
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("entered herherhehrehrhe")
          this.setState({image: `gs://sleepybird-3254a.appspot.com/goblin.jpg`})
          console.log(storage)
              storage.ref("images").getDownloadURL().then(function(url){
                  console.log(url)
              })
          storage
            .ref("images")
            .child(this.state.selectedFile.name)
            .getDownloadURL()
            .then(url => {
              console.log("jhfldhflhslkfhasdklfhdsklhflkash")
              console.log(url)
              this.setState({url});
            });
        }
      );
  }*/
  changeNameHandler( event ) {
    this.setState( {
      productName: event.target.value
    } );
    //console.log(this.props)

    //console.log("change", event.target.value);
  }
  changeQuantityHandler( event ) {
    this.setState( {
      total_quantity: event.target.value
    } );
    //console.log(this.props)

    //console.log("change", event.target.value);
  }
  changeRemarksHandler( event ) {
    this.setState( {
      remarks: event.target.value
    } );
    //console.log(this.props)

    //console.log("change", event.target.value);
  }
  submitNew() {
    console.log( `product Name is ${this.state.productName}` )
    console.log( `Quantity is ${parseInt(this.state.total_quantity)}` )
    console.log( `product Name is ${this.state.remarks}` )
    console.log( `category is ${this.state.category}` )
    const url = '/inventories';
    axios.post( url, {
      name: this.state.productName,
      remarks: this.state.remarks,
      image_url: this.state.url,
      total_quantity: 0,
      unsorted_quantity: 0,
      sorted_quantity: 0,
      inventory_id: '',
      category: this.state.category


    } )
      .then( (response) => {

        console.log( 'plikca' )
        console.log( response )
        alert(`You have successfully upload ${this.state.productName}`);
        this.setState( {
          productName: '',
          total_quantity: '',
          remarks: '',
          category: '',
          url: null
        } )

      } ).catch( (error) => {
      console.log( error );
      console.log( error.response.data )
    } )

  }
  getPosts() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  getPostsAToZ() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'name',
        order: 'asc'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }

  getPostsZToA() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'name',
        order: 'des'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }

  getPostsQauantityAsc() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'quantity',
        order: 'asc'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }

  getPostsQuantityDes() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'quantity',
        order: 'des'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  zeroStock() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'zero'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  otherStock() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'others'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  drinkStock() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'drinks'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  foodStock() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'food'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  cleanStock() {
    this.setState( {
      addForm: false
    } )
    const url = '/inventories.json';

    axios.get( url, {
      params: {
        type: 'clean'
      }
    } )
      .then( (response) => {

        const data = response.data

        this.setState( {
          inventories: data
        } )

      } ).catch( (error) => {
      console.log( error );
    } )
  }
  handleRadioClick = (event) => {
    console.log( 'test' )
    console.log( event.target.value )
    console.log( this.state.addForm )
    this.setState( {
      category: event.target.value
    } )
  }
  addForm = () => {

    this.setState( {
      addForm: true
    } )
    console.log( this.refs[ 'tab1' ] )
    console.log( this.refs[ 'tab2' ] )
  }
  createPosts() {

    const url = '/inventories';
    console.log( 'going to create post' );
    axios.post( url, {
      name: 'Fred',
      remarks: 'Flintstone',
      quantity: 3
    } )
      .then( (response) => {

        console.log( 'plikca' )
        console.log( response )

        //this.setState({ title: "data", content:"meow" })

      } ).catch( (error) => {
      console.log( error );
      console.log( error.response.data )
    } )
  }

  add_quantity( event ) {
    //console.log(event.target.id);
    //console.log(this.state.inventories[parseInt(event.target.id)]);
    let addInventoryQuantity = this.state.inventories;
    addInventoryQuantity[ event.target.id ].total_quantity++;
    addInventoryQuantity[ event.target.id ].unsorted_quantity++;
    this.setState( {
      inventories: addInventoryQuantity
    } );

    const url = '/inventories/' + addInventoryQuantity[ event.target.id ].id + '.json';

    const payload = {
      name: addInventoryQuantity[ event.target.id ].name,
      total_quantity: addInventoryQuantity[ event.target.id ].total_quantity,
      unsorted_quantity: addInventoryQuantity[ event.target.id ].unsorted_quantity,
      remarks: addInventoryQuantity[ event.target.id ].remarks,
      user_id: addInventoryQuantity[ event.target.id ].user_id
    }
    const url2 = '/items';
    const payload2 = {
      inventory_id: parseInt( addInventoryQuantity[ event.target.id ].id ),
      status: 'Unsorted'
    }
    console.log( url );

    console.log( payload )

    const requestOne = axios.put( url, payload );
    const requestTwo = axios.post( url2, payload2 );
    axios
      .all( [ requestOne, requestTwo ] )
      .then(
        axios.spread( (...responses) => {
          const responseOne = responses[ 0 ];
          const responeTwo = responses[ 1 ];


          // use/access the results
          console.log( responseOne, responeTwo );
        } )
    )
      .catch( function ( error ) {
        console.log( error )
        console.log( 'whoopsy doopsy' );
      } );



  }


  subtract_quantity( event ) {
    //console.log(event.target.id);
    //console.log(this.state.inventories[parseInt(event.target.id)]);
    let subtractInventoryQuantity = this.state.inventories;

    if ( subtractInventoryQuantity[ event.target.id ].total_quantity > 0 ) {
      subtractInventoryQuantity[ event.target.id ].total_quantity--;
      subtractInventoryQuantity[ event.target.id ].unsorted_quantity--;
      this.setState( {
        inventories: subtractInventoryQuantity
      } );

      const url = '/inventories/' + subtractInventoryQuantity[ event.target.id ].id + '.json';
      console.log( url );
      const payload = {
        name: subtractInventoryQuantity[ event.target.id ].name,
        total_quantity: subtractInventoryQuantity[ event.target.id ].total_quantity,
        unsorted_quantity: subtractInventoryQuantity[ event.target.id ].unsorted_quantity,
        remarks: subtractInventoryQuantity[ event.target.id ].remarks,
        user_id: subtractInventoryQuantity[ event.target.id ].user_id
      }

      const url2 = '/items/2';
      const payload2 = {
        inventory_id: parseInt( event.target.id ),
        status: 'Unsorted'
      }

      console.log( url );
      const requestOne = axios.put( url, payload );

      axios
        .all( [ requestOne ] )
        .then(
          axios.spread( (...responses) => {
            const responseOne = responses[ 0 ];


            // use/access the results
            console.log( responseOne );
          } )
      )
        .catch( function ( error ) {
          console.log( error )
          console.log( 'whoopsy doopsy' );
        } );
    } else {
      alert( 'Quantity is 0.' )
    }
  }

  request_item( event ) {
    console.log( 'request' )
    alert( `${this.state.inventories[event.target.id].name} is requested` )
    var currentRequestArray = this.state.stockToOrder;
    currentRequestArray.push( this.state.inventories[ event.target.id ].name );
    this.setState( {
      stockToOrder: currentRequestArray
    } );
    this.props.productArray( currentRequestArray );

  }



  render() {

    const inventories = this.state.inventories.map( (inventory, index) => {
      //console.log(inventory)
      let button_plus_id = `${index}`
      return (

      <div className="col-4 mb-3">
        <div className="row">
          <div className=" col-12">

            <Popup trigger={<img className="carouselImage"
                 src={ inventory.image_url || 'http://via.placeholder.com/400x300' }
                 height="120"
                 width="160"/>} closeOnDocumentClick position="right" offsetY={50} closeOnEscape>
    <div><p>{inventory.remarks}</p></div>
  </Popup>
      </div>
        </div>
        <div className="h-25 row">
          <div className="col-12 pt-1">
            <p>
              Invetory Name:
              { inventory.name }
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>
              Quantity:
              { inventory.total_quantity }
              <button onClick={ () => {
                                  this.add_quantity( event )
                                } } id={ button_plus_id }>
                +
              </button>
            </p>
          </div>
        </div>
        <br />
        <button onClick={ () => {
                            this.request_item( event )
                          } } id={ button_plus_id }>
          Request
        </button>
      </div>

      );



    } );

    let togglevView = ''
    if ( !this.state.addForm ) {
      console.log( 'hello' )
      togglevView = (

        <div>
          <div className="row pt-4">
            <div className="col-3 text-center">
              <Dropdown as={ ButtonGroup }>
                <Button variant="dark">
                  Sort By
                </Button>
                <Dropdown.Toggle split
                                 variant="dark"
                                 id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item onSelect={ () => {
                                              this.getPosts()
                                            } }>
                    View All
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.getPostsAToZ()
                                            } }>
                    Name(A-Z)
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.getPostsZToA()
                                            } }>
                    Name(Z-A)
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.getPostsQauantityAsc()
                                            } }>
                    Quantity(Ascending)
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.getPostsQuantityDes()
                                            } }>
                    Quantity(Descending)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-3 text-center">
              <Dropdown as={ ButtonGroup }>
                <Button variant="dark">
                  Filter
                </Button>
                <Dropdown.Toggle split
                                 variant="dark"
                                 id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item onSelect={ () => {
                                              this.zeroStock()
                                            } }>
                    Out Of Stock
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.drinkStock()
                                            } }>
                    Category: Drink
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.cleanStock()
                                            } }>
                    Category: Cleaning Product
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.foodStock()
                                            } }>
                    Category: Food
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={ () => {
                                              this.otherStock()
                                            } }>
                    Category: Others
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-6 text-center">
              <input value={ this.state.productSearch }
                     ref="inputBox"
                     onChange={ (event) => {
                                  this.changeSearchHandler( event );
                                } } /><button onClick={ this.getSearchPosts }>
                🔍
              </button>
            </div>
          </div>
          <div className="row control">
            { inventories }
          </div>
        </div>
      );

    } else {
      togglevView = (


        <div className="col-7 text-center ">
          <div className="row mt-5">
            <div className="col -12 text-left">
              <input className="inputwidht"
                     placeholder="Enter your Product"
                     value={ this.state.productName }
                     ref="inputBox"
                     onChange={ (event) => {
                                  this.changeNameHandler( event );
                                } }></input>
              <br /><br />
              <input className="inputwidht"
                     placeholder="Enter remarks"
                     value={ this.state.remarks }
                     ref="inputBox"
                     onChange={ (event) => {
                                  this.changeRemarksHandler( event );
                                } }></input>
              <br /><br /><br />
              <label>
                Category(Select One):
              </label>
              <ToggleButtonGroup type="radio"
                                 name="options"
                                 defaultValue={ 1 }>
                <ToggleButton onClick={ this.handleRadioClick } value={ "food" }>
                  Food
                </ToggleButton>
                <ToggleButton onClick={ this.handleRadioClick } value={ "drinks" }>
                  Drinks
                </ToggleButton>
                <ToggleButton onClick={ this.handleRadioClick } value={ "clean" }>
                  Cleaning Product
                </ToggleButton>
                <ToggleButton onClick={ this.handleRadioClick } value={ "others" }>
                  Others
                </ToggleButton>
              </ToggleButtonGroup>
              <br /><br />
              <input type="file" onChange={ this.handleChange } />
              <button onClick={ this.handleUpload }>
                Upload
              </button>
              <br />
              <img src={ this.state.url || 'http://via.placeholder.com/400x300' }
                   alt="Uploaded images"
                   height="120"
                   width="160"/>
              <button className="buttonposition" onClick={ () => {
                                                             this.submitNew()
                                                           } }>
                Submit
              </button>
            </div>
          </div>
        </div>
      );


    }
    // console.log(inventories)
    return (
    <div>
      <div className="row justify-content-start ">
        <div className="col-2">
        </div>
        <div ref="tab1" className={ this.state.addForm ? 'selectedTab col-3 border-top border-left border-right border-dark rounded-top ' : 'notSelectedTab col-3 border-top border-left border-right border-bottom border-dark rounded-top' }>
          <h2 onClick={ () => {
                          this.addForm()
                        } }>Add Form</h2>
        </div>
        <div ref="tab2" className={ this.state.addForm ? 'notSelectedTab col-3 border-top border-left border-right border-bottom border-dark rounded-top' : 'selectedTab col-3 border-top border-left border-right border-dark rounded-top ' }>
          <h2 onClick={ () => {
                          this.getPosts()
                        } }>View</h2>
        </div>
        <div className="col-3 border-bottom border-dark  ">
        </div>
      </div>
      <div className="row justify-content-start">
        <div className="col-2">
        </div>
        <div className="col-9 border-bottom border-left border-right text-left border-dark">
          { togglevView }
        </div>
      </div>

    </div>
    );
  }
}

export default All