import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
// const initialItems = [
//   { id: 1, description: "Passport", packed: false },
//   { id: 2, description: "scoks", packed: false },
//   { id: 3, description: "charger", packed: false },
//   { id: 4, description: "shoes", packed: true },
// ];

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}
function App() {
  const [allList, setAllList] = useState([]);

  function addToList(list) {
    setAllList((items) => {
      return [...items, list];
    });
  }

  function handleToggle(id) {
    setAllList((item) => {
      return item.map((a) => (a.id == id ? { ...a, packed: !a.packed } : a));
    });
  }

  function handleDelete(id) {
    setAllList((item) => {
      return item.filter((a) => a.id != id);
    });
  }

  return (
    <div className="app">
      <Logo />
      <Form addToList={addToList} allList={allList} />
      <PAckingList
        allList={allList}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
      <Status allList={allList} />
    </div>
  );
}
function Form({ allList, addToList }) {
  const [description, setDescripiton] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    addToList(newItem);

    setDescripiton("");
    setQuantity(1);
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What you want for a trip 🤷‍♂️</h3>

        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="items.."
          value={description}
          onChange={(e) => setDescripiton(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </>
  );
}
function PAckingList({ allList, handleToggle, handleDelete }) {
  return (
    <div className="list">
      <ul>
        {allList.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Item({ item, handleToggle, handleDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => {
          handleToggle(item.id);
        }}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}
function Status({ allList }) {
  const size = allList.length;
  return (
    <footer className="stats">
      💼You have {size} item on yourf list , and you already packed{" "}
      <strong>{allList.filter((x) => x.packed == false).length}</strong> items
    </footer>
  );
}

export default App;
