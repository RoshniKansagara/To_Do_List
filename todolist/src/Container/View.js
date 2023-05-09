import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../Assests/style.css';

function View()
{
    let[todo, setTodo] = useState(null);
    let[search, setNewSearch] = useState("");

    useEffect(()=>{
        fetch('http://localhost:3001/todo',{
        }).then(res=>{
            res.json().then(record=>{
                setTodo(record);
            })
        }).catch(err=>{console.log(err)})
    })



    // DELETE DATA

    const deleteData=(id)=>{
        // console.log(id);
        fetch("http://localhost:3001/todo/"+id,{
            method :"DELETE",
            headers: {
                    "Content-Type": "application/json"
                }
        }).then(res=>{console.log("Record Deleted")}).catch(err=>{console.log(err)})
    }

    // SEARCH

    const handleSearchChange = (e) => {
        setNewSearch(e.target.value);
    };

    const handleClick = event => {
        if (event.target.style.textDecoration) {
            event.target.style.removeProperty('text-decoration');
        } else {
            event.target.style.setProperty('text-decoration', 'line-through');
        }
    };

    return(
        <div align="center" className='main'>
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search Task" className='searchData'/>
            <br/><br/>
            <table>
                <tr>
                    <td className='title'>No</td>
                    <td className='title'>Name</td>
                    <td className='title'>Date</td>
                    <td className='title'>Type</td>
                    <td className='title'>Action</td>
                </tr>
                {todo !=null?todo.filter((v)=>{
                            if(search ===''){
                                return v;
                            }
                            else if(v.name.toLowerCase().includes(search.toLowerCase()))
                            {
                                return v;
                            }   
                        }).map((v,i)=>{

                            var colorName = 'rgb(212, 227, 229)';

                            if(v.type =='Family'){
                                colorName ='skyblue'
                            }else if(v.type == 'Personal'){
                                colorName ='pink';
                            }
                            else if(v.type == "Office"){
                                colorName ='lightblue';
                            }
                            else if(v.type == "Studies"){
                                colorName ='#f1f1f1';
                            }
                            else if(v.type == "Other"){
                                colorName ='yellow';
                            }
                    return(
                    
                        <tr style={{backgroundColor : colorName}}>
                            <td className='taskes'>{i+1}</td>
                            <td onClick={handleClick} className='taskes'>{v.name}</td>
                            <td onClick={handleClick} className='taskes'>{v.date}</td>
                            <td onClick={handleClick}>{v.type}</td>
                            <td className='deletebtn'><button onClick={(e)=>deleteData(v.id)} className="dbtn">Delete</button></td>
                        </tr>
                    )
                }):"NOT FOUND"}
            </table>
            <NavLink to='/'><button className='taskbtn'>Add Task</button></NavLink>
        </div>
    )
}
export default View;