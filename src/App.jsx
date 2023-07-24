import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';
import { useState, useEffect } from 'react';

function App() {
const API_URL = ' http://localhost:3500/items';

const [items, setItems] = useState([]);

const [newItem, setNewItem] = useState('');
const [search, setSearch] = useState('');
const [fetchError, setFetchError] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      if(!response.ok) throw Error('Did not receive expected data');
      const listItems = await response.json();
      setItems(listItems);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  //simulating a very long loading time from database
  setTimeout(() => {
    (async () => await fetchItems())();
  }, 2000)

 
}, [])


//adds a new item
const addItem = async (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const myNewItem = {id, checked: false, item };
  const listItems = [...items, myNewItem];
  setItems(listItems);

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URL, postOptions);
  //apiRequest only sends back the errMsg so if there is a result that means that there is an error
  if (result) setFetchError(result);
}

// handles the checking of the checkbox
const handleCheck = async (id) => {
  const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked }: item);
  setItems(listItems);

  const myItem = listItems.filter((item) => item.id === id);
  const updateOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ checked: myItem[0].checked })
  };
  const reqUrl = `${API_URL}/${id}`;
  const result = await apiRequest(reqUrl, updateOptions);
  if(result) setFetchError(result);
}


//onChange hook is used for input element while onClick can be used for buttons and other elements
//handles the deletion  of an item
const handleDelete = async (id) => {
  const listItems = items.filter((item) => item.id !== id);//creates a new array that items whose id is not equal to the id passed in
  setItems(listItems);

  const deleteOptions = { method: 'DELETE' }
  const reqUrl = `${API_URL}/${id}`;
  const result = await apiRequest(reqUrl, deleteOptions);
  if(result) setFetchError(result);
}

//handles the submission of a new list
const handleSubmit = (e) => {
  e.preventDefault();
  if (!newItem) return;
  //addItem
  addItem(newItem);
  setNewItem(''); 
}



  return (
    <>
      <div className="App">
        <Header title="Grocery List" />
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem 
          search={search}
          setSearch={setSearch}
        />
        <main>
          {isLoading && <p>Loading Items...</p>}
          {fetchError && (<p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>)}
          {!fetchError && !isLoading && (
              <Content 
              items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          )}
        </main>
        <Footer length={items.length} />
      </div>
    </>
  )
}

export default App
