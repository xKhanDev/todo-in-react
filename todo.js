import React from 'react'
import "./style.css";

// getting local strorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("myTodoListKey")
  if (lists) {
    // list is in form of String but we want in Array
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = React.useState("");
  const [items, setItems] = React.useState(getLocalData());
  const [isEditItem, setIsEditItem] = React.useState("");
  const [toggleBtn, setToggleBtn] = React.useState(false);

  // add item function
  const addItems = () => {
    if (!inputData) {
      alert("Please Fill Input...");
    }
    else if (inputData && toggleBtn) {
      setItems(items.map((curElem) => {
        if (curElem.id === isEditItem) {
          return { ...curElem, name: inputData }
        }
        else {
          return curElem;
        }
      }))
      // removing input text and changing icon after submittion
      setInputData("");
      setIsEditItem(null);
      setToggleBtn(false);
    }
    else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      //Letter inputData change kia newInputData say. vid Time (2:35:33)
      setItems([...items, newInputData]);
      setInputData("");
    }
  }
  // Edit the Item
  const editItem = (index) => {
    const edit_todo_item = items.find((curElem) => {
      return curElem.id === index;
    })
    setInputData(edit_todo_item.name);
    setIsEditItem(index);
    setToggleBtn(true);
  }

  // delete item section
  // ye index clicked item k 'id' ko Get kar raha hai
  const deleteItem = (index) => {
    const updatedItem = items.filter(curElem => {
      return curElem.id !== index;
    })
    setItems(updatedItem)
  }

  // remove all items
  const removeAll = () => {
    setItems([]);
  }

  // adding Local Storage
  React.useEffect(() => {
    // local storage is store only String(we don't know input is what?)
    // JSON.stringify(items) -> to convert items from Array to String
    localStorage.setItem("myTodoListKey", JSON.stringify(items));
  }, [items])

  return (
    <>
      <div className="container">
        <figure>
          <img src={"images/main.png"} alt="" />
          <figcaption>
            Add Your Work Here 😍
          </figcaption>
        </figure>

        <form className="form">
          <input type="text" placeholder='✍ Add List ...'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {
            toggleBtn ? (<i id='add' class="fa-solid fa-pen-to-square" onClick={addItems}></i>) :
              (<i id='add' class="fa-solid fa-plus" onClick={addItems}></i>)
          }
        </form>

        <div className="list">
          <ul>
            {
              items.map((item) => {
                return <>
                  <li key={item.id}>
                    <span> {item.name} </span>
                    <i id='edit' class="fa-solid fa-pen-to-square" onClick={() => editItem(item.id)}></i>
                    <i id='delete' class="fa-solid fa-trash" onClick={() => { deleteItem(item.id) }}></i>
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

export default Todo;
