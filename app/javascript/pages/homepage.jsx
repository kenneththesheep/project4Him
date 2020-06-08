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
//data= data2;
//              const url = '/inventories.json';
//              axios.get(url)
//                 .then((response) => {

//                   data = response.data.map((data,index)=>
//                     {
//                         return {
//                             id:index+1,
//                             icon: "⭕️",
//                             status: "Unsorted",
//                             title: "myLord",
//                             content: "Nothing"}
//                     }
//                     )
//                   console.log(data);


//                 }).catch((error)=>{
//                   console.log(error);
//                 })
//                 console.log(data);

data = [{
    id: 1,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 1",
    content: "Phiont Electric Viewer"
}, {
    id: 2,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 2",
    content: "Lucell Direct Bracket"
}, {
    id: 3,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 3",
    content: "Phance Gel Audible Bridge"
}, {
    id: 4,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 4",
    content: "Cosche Air Electric Lifter"
}, {
    id: 5,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 5",
    content: "Reusync Output Adapter"
}, {
    id: 6,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 6",
    content: "Tripod Remote Direct Adapter"
}, {
    id: 7,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 7",
    content: "Bruckfunc Gel Lifter"
}, {
    id: 8,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 8",
    content: "Truns GPS Receiver"
}, {
    id: 9,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 9",
    content: "Onesche Gel Bracket"
}, {
    id: 10,
    icon: "⭕️",
    status: "Unsorted",
    title: "Item 10",
    content: "Sirfunc HD Case"
}];
//console.log(data2)
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
    const repopulate=()=>{
        console.log("repopulate")
        data = props.unsortedArray;
        console.log(data);

    }
    //const [items, setItems] = useState(data);
    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

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
        <div className={"row"}>

            {statuses.map(s => {
                return (
                    <div key={status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Col>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                }
                            </Col>
                        </DropWrapper>

                    </div>
                );
            })}
                       <button onClick={()=>{ repopulate() }}>
                            Repopulate
                        </button>
        </div>
    );
};




export default Homepage;