import React from 'react'

import axios from 'axios';


class All extends React.Component {
    constructor(){
  super()

  this.state = {
    inventories : [],
    stockToOrder : []
  }
}
    getPosts(){

              const url = '/inventories.json';

              axios.get(url)
                .then((response) => {

                  const data = response.data

                  this.setState({ inventories: data })

                }).catch((error)=>{
                  console.log(error);
                })
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
        console.log (url);
        console.log(payload)
            axios
              .put(url, payload)
              .then(function (response) {
                console.log(response)
                console.log("Success")
              })
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
        const payload = {name: subtractInventoryQuantity[event.target.id].name, total_quantity: subtractInventoryQuantity[event.target.id].total_quantity, unsorted_quantity: subtractInventoryQuantity[event.target.id].unsorted_quantity, remarks: subtractInventoryQuantity[event.target.id].remarks, user_id: subtractInventoryQuantity[event.target.id].user_id }
        console.log (url);
        console.log(payload)
            axios
              .put(url, payload)
              .then(function (response) {
                console.log(response)
              })
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
            <React.Fragment key={index}>
            <div className = "card cardInventory" >
            <p>{inventory.user.email}</p>
            <p>Invetory Name: {inventory.name}</p>
            <p><button onClick={()=>{ this.add_quantity(event) }} id = {button_plus_id}>+</button>
            Quantity: {inventory.total_quantity}
            <button onClick={()=>{ this.subtract_quantity(event) }} id = {button_plus_id}>-</button></p>
            <p>Remarks {inventory.remarks}</p>
            <br/>
            <button onClick={()=>{this.request_item(event)}} id = {button_plus_id}>Request</button>
          </div>
          </React.Fragment>
          );

        });
        // console.log(inventories)
        return (
          <div>
          <div className = "row">
            <div className = "col-4 text-center border">
                <button onClick={()=>{ this.createPosts() }}>Create</button>
            </div>
          </div>
          <div className = "row">
            <div className = "col-4 text-center">
            <div class Name = "row">
            <div className = "col-12 mb-5">
            <button onClick={()=>{ this.getPosts() }}>
                Click to see all inventories
            </button>
            </div>
            </div>


            {inventories}
            </div>
          </div>
          </div>
        );
    }
}

export default All