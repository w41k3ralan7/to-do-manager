
// import './List.css'
// import { useState } from 'react';
// import Task from './Task';
// function List() {
//     const [tasks, setTasks] = useState([]);

//     const addTask = () => {
//         setTasks([...tasks, <Task key={tasks.length} />])
//     }

//     return (
//         <div className="list">
//             <div className="inputtask">
//                 <input type="text" />
//                 <button className="add" onClick={addTask}>➕</button>
//             </div>
//             <div className="listitems">
//             {tasks}
//             </div>
//         </div>
//     )
// }

// export default List;

import React, { useState, useEffect } from 'react';
import './List.css';
import Task from './Task';

function List() {
    const [tasks, setTasks] = useState(null); // Initialize to null
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        // Load tasks from local storage when component mounts
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        // Save tasks to local storage whenever tasks state changes
        if (tasks !== null) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    const addTask = () => {
        if (taskInput.trim() !== '') {
            setTasks(prevTasks => {
                if (prevTasks === null) {
                    return [taskInput];
                }
                return [...prevTasks, taskInput];
            });
            setTaskInput('');
        }
    };

    const moveTaskUp = (index) => {
        if (index > 0) {
            const newTasks = [...tasks];
            const temp = newTasks[index];
            newTasks[index] = newTasks[index - 1];
            newTasks[index - 1] = temp;
            setTasks(newTasks);
        }
    };

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const newTasks = [...tasks];
            const temp = newTasks[index];
            newTasks[index] = newTasks[index + 1];
            newTasks[index + 1] = temp;
            setTasks(newTasks);
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    // Render loading message if tasks are not loaded yet
    if (tasks === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="list">
            <div className="inputtask">
                <input type="text" value={taskInput} onChange={handleInputChange} />
                <button className="add" onClick={addTask}>➕</button>
            </div>
            <div className="listitems">
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        task={task}
                        index={index}
                        moveTaskUp={moveTaskUp}
                        moveTaskDown={moveTaskDown}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
        </div>
    )
}

export default List;

