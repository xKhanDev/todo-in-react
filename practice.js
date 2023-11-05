import React from 'react'
import "./style.css";

const storeLocalData = () => {
    const lists = localStorage.getItem("id");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Practice = () => {
    const [inputDt, setInputDt] = React.useState("");
    const [items, setItems] = React.useState(storeLocalData());
    const [isEditItem, setIsEditItem] = React.useState("");
    const [toggleBtn, setToggleBtn] = React.useState(false)

// adding new List Item
    const addItems = () => {
        if(!inputDt){
            alert("Please Fill Input");
        }
        else if(inputDt && toggleBtn){
            setItems(items.map((curElem)=>{
                if(curElem.id === isEditItem){
                    return ({...curElem,name:inputDt})
                }
                else{
                    return curElem;
                }
            }))
            setInputDt("")
            setToggleBtn(false)
            setIsEditItem(null)
        }
        else{
            const newInputData ={
                id : new Date().getTime().toString(),
                name : inputDt,
            }
            setItems([...items,newInputData])
            setInputDt("")
        }
    }

// deleting List item
const deleteItem = (index) =>{
    const deleteLi = items.filter((curElem)=>{
        return curElem.id !== index;
    })
    setItems(deleteLi)
}
// Removing All Items
const removeAll = () => {
    setItems([])
}
// editing Item
const editItem = (index) =>{
    const updateListItem = items.find((curElem)=>{
        return curElem.id === index;
    })
    setInputDt(updateListItem.name)
    setToggleBtn(true)
    setIsEditItem(index)
}

// using local storage
React.useEffect(()=>{
    localStorage.setItem("id",JSON.stringify(items))
},[items])
    return (
        <>
            <div className="container">
                <form className="form">
                    <input type="text" placeholder='✍ Add List ...'
                        value={inputDt}
                        onChange={(e) => { setInputDt(e.target.value) }} />
                    {
                        toggleBtn ? (<i id='add' class="fa-solid fa-pen-to-square" onClick={addItems}></i>)
                        : (<i id='add' class="fa-solid fa-plus" onClick={addItems}></i>)
                    }
                </form>

                <div className="list">
                    <ul>
                        {
                            items.map((item) => {
                                return <>
                                    <li key={item.id}>
                                        <span> {item.name} </span>
                                        <i id='edit' class="fa-solid fa-pen-to-square" onClick={()=>{editItem(item.id)}}></i>
                                        <i id='delete' class="fa-solid fa-trash" onClick={()=>{deleteItem(item.id)}}></i>
                                    </li>
                                </>
                            })
                        }
                    </ul>
                </div>
                <button id='checkout' onClick={removeAll}>Checkout</button>
            </div>
        </>
    )
}

export default Practice;
