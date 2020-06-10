import React, { useState } from "react";
import Item from "../components/item";
import DropWrapper from "../components/dropwrapper";
import Col from "../components/col";
import axios from 'axios';
import {data2} from '../data/tryData'
//import { data} from "../data";
//console.log(this.props.unsortedArray)

console.log(data2);

const Homepage = (props) => {
console.log(props.unsortedArray);
console.log(props.unsortedArray.length)
let data ="";
data=props.unsortedArray;
console.log(data2)

console.log(data)

const statuses = [{
    status: "Unsorted",
    icon: "⭕️",
    color: "#EB5A46"
}, {
    status: "Store Room",
    icon: "🔆️",
    color: "#00C2E0"
}, {
    status: "Living Room",
    icon: "📝",
    color: "#C377E0"
}, {
    status: "Kitchen",
    icon: "✅",
    color: "#3981DE"
}];

    const [items, setItems] = useState(data);
    console.log("Entry to this point")

        const removal=event=>{
        console.log(event.target.id)
        console.log(items[event.target.id-1]);
        let salamender = items;
        salamender.splice(event.target.id,1);
        setItems(salamender);
    }

    const repopulate=()=>{
        console.log("repopulate")
        //data = props.unsortedArray;
        //console.log(data);
        //setItems(data);

        const url = '/items.json';

              axios.get(url)
                .then((response) => {

                    let data2="";
                    let data3 =[];
                    let data4="";
                  const data = response.data
                  console.log(data)

                  console.log(data3)
                  data4= data.map((data,index)=>
                    {
                        return {
                            id:index+1,
                            icon: "⭕️",
                            status: data.status,
                            title: "myLord",
                            content: data.inventory.name,
                            item_id: data.id,
                            inventory_id: data.inventory_id
                        }

                    }
                    )
                  console.log(data4)
                  setItems(data4)

                  //setItems(data);

                }).catch((error)=>{
                  console.log(error);
                })

    }
    //const [items, setItems] = useState(data);
    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);
        console.log("Hakamatatata")
        console.log(item)
        console.log(status);
        const url = '/items/' +item.item_id+".json";
        const payload = {status: status}
        axios.put(url,payload)
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{
                  console.log(error);
                })

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [ ...newItems ];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];

        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

    return (
        <div>
        <div className={"row"}>

            {statuses.map(s => {
                return (
                    <div key={status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}: {s.icon}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Col>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <div><Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} ></Item>

                                    <button onClick={()=>{removal(event)}} id = {i.id}>X</button></div>
                                        )
                                }
                            </Col>
                        </DropWrapper>

                    </div>
                );
            })}

        </div>
        <button onClick={()=>{ repopulate() }}>
                            Populate the dashboard
        </button>
        </div>
    );
};




export default Homepage;