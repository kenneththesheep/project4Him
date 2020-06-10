import React from 'react'

import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Carousel from 'react-bootstrap/Carousel'
class All extends React.Component {
    constructor(){
  super()

  this.state = {
    inventories : [],
    stockToOrder : [],
    addForm: false,
    productName:"",
    total_quantity:"",
    remarks: ""
  }
}

    changeNameHandler(event) {
        this.setState({ productName: event.target.value });
        //console.log(this.props)

        //console.log("change", event.target.value);
    }
    changeQuantityHandler(event) {
        this.setState({ total_quantity: event.target.value });
        //console.log(this.props)

        //console.log("change", event.target.value);
    }
    changeRemarksHandler(event) {
        this.setState({ remarks: event.target.value });
        //console.log(this.props)

        //console.log("change", event.target.value);
    }
    submitNew(){
        console.log(`product Name is ${this.state.productName}`)
        console.log(`Quantity is ${parseInt(this.state.total_quantity)}`)
        console.log(`product Name is ${this.state.remarks}`)
        const url = '/inventories';
        axios.post(url,{
                        name: this.state.productName,
                        remarks: this.state.remarks,
                        image_url: "blank",
                        total_quantity: 0,
                        unsorted_quantity: 0,
                        sorted_quantity: 0,
                        inventory_id: ""


                        })
                    .then((response) => {

                    console.log("plikca")
                    console.log(response)

                            this.setState({productName: "", total_quantity:"", remarks:""})

                    }).catch((error)=>{
                    console.log(error);
                    console.log(error.response.data   )
                    })

    }
    getPosts(){
            this.setState({addForm:false})
              const url = '/inventories.json';

              axios.get(url)
                .then((response) => {

                  const data = response.data

                  this.setState({ inventories: data })

                }).catch((error)=>{
                  console.log(error);
                })
            }
    addForm(){

              this.setState({addForm:true})
            }
    createPosts(){

              const url = '/inventories';
              console.log("going to create post");
              axios.post(url,{
                            name: 'Fred',
                            remarks: 'Flintstone',
                            quantity: 3
                        })
                .then((response) => {

                  console.log("plikca")
                  console.log(response)

                  //this.setState({ title: "data", content:"meow" })

                }).catch((error)=>{
                  console.log(error);
                  console.log(error.response.data   )
                })
            }

    add_quantity(event){
        //console.log(event.target.id);
        //console.log(this.state.inventories[parseInt(event.target.id)]);
        let addInventoryQuantity = this.state.inventories;
        addInventoryQuantity[event.target.id].total_quantity++;
        addInventoryQuantity[event.target.id].unsorted_quantity++;
        this.setState({inventories: addInventoryQuantity});

        const url = '/inventories/' + addInventoryQuantity[event.target.id].id + ".json";

        const payload = {name: addInventoryQuantity[event.target.id].name, total_quantity: addInventoryQuantity[event.target.id].total_quantity, unsorted_quantity: addInventoryQuantity[event.target.id].unsorted_quantity, remarks: addInventoryQuantity[event.target.id].remarks, user_id: addInventoryQuantity[event.target.id].user_id }
        const url2 = '/items';
        const payload2 = {inventory_id:parseInt (addInventoryQuantity[event.target.id].id), status: "Unsorted"}
        console.log (url);

        console.log(payload)

        const requestOne = axios.put(url,payload);
        const requestTwo = axios.post(url2, payload2);
            axios
          .all([requestOne, requestTwo])
            .then(
            axios.spread((...responses) => {
            const responseOne = responses[0];
            const responeTwo = responses[1];


      // use/access the results
            console.log(responseOne, responeTwo);
                })
                )
              .catch(function (error) {
                console.log(error)
                console.log("whoopsy doopsy");
              });



          }


    subtract_quantity(event){
        //console.log(event.target.id);
        //console.log(this.state.inventories[parseInt(event.target.id)]);
        let subtractInventoryQuantity = this.state.inventories;

        if ( subtractInventoryQuantity[event.target.id].total_quantity>0)
        {
        subtractInventoryQuantity[event.target.id].total_quantity--;
        subtractInventoryQuantity[event.target.id].unsorted_quantity--;
        this.setState({inventories: subtractInventoryQuantity});

        const url = '/inventories/' + subtractInventoryQuantity[event.target.id].id + ".json";
        console.log(url);
        const payload = {name: subtractInventoryQuantity[event.target.id].name, total_quantity: subtractInventoryQuantity[event.target.id].total_quantity, unsorted_quantity: subtractInventoryQuantity[event.target.id].unsorted_quantity, remarks: subtractInventoryQuantity[event.target.id].remarks, user_id: subtractInventoryQuantity[event.target.id].user_id }

        const url2 = '/items/2';
        const payload2 = {inventory_id:parseInt (event.target.id), status: "Unsorted"}

        console.log (url);
       const requestOne = axios.put(url,payload);

            axios
          .all([requestOne])
            .then(
            axios.spread((...responses) => {
            const responseOne = responses[0];


      // use/access the results
            console.log(responseOne);
                })
                )
              .catch(function (error) {
                console.log(error)
                console.log("whoopsy doopsy");
              });
          }
          else
          {
            alert("Quantity is 0.")
          }
          }

          request_item(event){
            console.log("request")
            alert( `${this.state.inventories[event.target.id].name} is requested`)
            var currentRequestArray = this.state.stockToOrder;
            currentRequestArray.push(this.state.inventories[event.target.id].name);
            this.setState({stockToOrder: currentRequestArray});
            this.props.productArray(currentRequestArray);

          }



    render() {

        const inventories = this.state.inventories.map((inventory, index)=>{
          //console.log(inventory)
          let button_plus_id = `${index}`
          return  (
            <Carousel.Item>
            <div class="row">
                <div class = "col-8 border carouselBox">
                    <img className="carouselImage"  src="/egg-thumb.jpg"/>
                    <p>Invetory Name: {inventory.name}</p>
                    <p>
                    Quantity: {inventory.total_quantity}
                    <button onClick={()=>{ this.add_quantity(event) }} id = {button_plus_id}>+</button></p>
                    <p>Remarks {inventory.remarks}</p>
                    <br/>
                    <button onClick={()=>{this.request_item(event)}} id = {button_plus_id}>Request</button>
                </div>
            </div>

          </Carousel.Item>
          );



        });

                  let togglevView = ""
          if(!this.state.addForm)
          {
            console.log("hello")
            togglevView =(


                    <div className ="col-8 pl-2 pr-2 text-center">
                        <h1>  My current inventories  </h1>
                         <Carousel>
                            {inventories}
                        </Carousel>
                    </div>
                    );

          }
          else
          {
            togglevView =(


                        <div className ="col-7 text-center border ">
                            <div className ="row mb-5">
                                <h1>  Add to Arsenal </h1>
                            </div>
                            <div className ="row">
                                <div className = "col -4">
                                    <p> Name of Product: </p>

                                    <p> Remarks: </p>
                                </div>
                                <div className = "col -8 text-left">
                                    <p> <input value={this.state.productName} ref="inputBox" onChange={(event)=>{this.changeNameHandler(event);}}></input> </p>

                                    <p> <input value={this.state.remarks} ref="inputBox" onChange={(event)=>{this.changeRemarksHandler(event);}}></input> </p>
                                </div>
                            </div>
                            <div className="row">
                                <button onClick={()=>{ this.submitNew() }}>
                                    Submit
                                </button>

                            </div>



                        </div>
                        );


          }
        // console.log(inventories)
        return (
          <div>

          <div className = "row pt-5">
            <div className = "col-4 text-center">
            <div class Name = "row">
            <div className = "col-12 mb-5 ">
            <button onClick={()=>{ this.addForm() }}>Add Form</button>
            <br/><br/>
            <button onClick={()=>{ this.getPosts() }}>
                Click to see all inventories
            </button>
            </div>
            </div>

            </div>
                {togglevView}
          </div>
          </div>
        );
    }
}

export default All