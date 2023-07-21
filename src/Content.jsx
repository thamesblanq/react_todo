import { useState } from 'react';
const Content = () => {
    const [name, setName] = useState('Eric');
    const [count, setCount] = useState(0);
    const handleNameChange = () => {
        const names = ["Eric", "Blanq", "James"];
        const int = Math.floor(Math.random() * names.length);
        setName(names[int]);
    }

    const handleClick = () => {
        setCount(count + 1);
        console.log(`${count} -initial state`);
    }
    const handleClick2 = () => {
        console.log(`${count} -current state`);
    }
 

  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello {name}!
        </p>
        <button onClick={handleNameChange}>Change Name</button>
        <button onClick={handleClick}>Click It</button>
        <button onClick={handleClick2}>Click It</button>
    </main>
  )
}

export default Content