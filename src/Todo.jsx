import React, { useState, useEffect } from 'react'

function Todo() {

    const [inpVal, setInpuVal] = useState('');
    const [list, setList] = useState([]);

    const getData = async () => {
        let url = `http://localhost:8080/todo`;
        let res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        let data = await res.json();

        setList(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setList([...list, {
        //     task:inpVal,
        //     check: false
        // }])
        // setInpuVal('')

        let inpObj = {
            task:inpVal,
            check: false
        }

        let url = `http://localhost:8080/todo`;
        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inpObj)
        })

        let data = await res.json();

        console.log('PST', data)

        getData()

        setInpuVal('')
    }

    const deleteTask = async (id) => {
        // let newTodo = []
        // for (let i = 0; i < list.length; i++) {
        //     if (i !== delIdx) {
        //         newTodo.push(list[i])
        //     }
        // }
        // setList(newTodo)

        let url = `http://localhost:8080/todo/?id=${id}`;
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })


        getData()

    }

    const handleToggle = async (id,item) => {
        // let newList = [...list] 
        // newList[idx].check = !newList[idx].check
        // setList(newList)
        let url = `http://localhost:8080/todo/${id}`;
        let res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...item,
                check: !item.check
            })
        })

        await res.json();


        getData()
    }

    useEffect(() => {
        getData()
    },[])



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={inpVal}
                    onChange={(e) => {
                        setInpuVal(e.target.value);
                    }}
                    placeholder="Enter the task" />

                <button type='submit'>Add</button>

            </form>
            <ul>
                {list.map((item, idx) => (
                    <li key={idx}>
                        <input type="checkbox"
                        checked={item.check}
                        onClick={() => handleToggle(item._id, item)} 
                        />

                        <span style={{
                            textDecoration: item.check ? 'line-through' : 'none'
                        }}>{item.task}</span>

                        <button onClick={() => {
                            deleteTask(item._id)
                        }}>Del</button>
                    </li>


                ))}
            </ul>
        </div>
    )
}

export default Todo;