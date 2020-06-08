import axios from 'axios';
import Async from 'react-async';
let  data2 = "";
             const url = '/inventories.json';
             axios.get(url)
                .then((response) => {

                  data2 = response.data.map((data,index)=>
                    {
                        return {
                            id:index+1,
                            icon: "⭕️",
                            status: "Unsorted",
                            title: "myLord",
                            content: data.name}
                    }
                    )
                  console.log(data2);


                }).catch((error)=>{
                  console.log(error);
                })
export {data2};