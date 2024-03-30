// import './Task.css'
// function Task(){
//     return(
//         <div className="task">
//             <p>Hello world</p>
//             <div className="buttons">
//             <button className="up">⬆️</button>
//             <button className="down">⬇️</button>
//             <button className="delete">🗑️</button>
//             </div>
//         </div>
//     )
// }

// export default Task
import React from 'react';
import './Task.css';

function Task({ task, index, moveTaskUp, moveTaskDown, deleteTask }) {
    const handleUpClick = () => {
        moveTaskUp(index);
    };

    const handleDownClick = () => {
        moveTaskDown(index);
    };

    const handleDeleteClick = () => {
        deleteTask(index);
    };

    return (
        <div className="task">
            <p>{task}</p>
            <div className="buttons">
                <button className="up" onClick={handleUpClick}>⬆️</button>
                <button className="down" onClick={handleDownClick}>⬇️</button>
                <button className="delete" onClick={handleDeleteClick}>🗑️</button>
            </div>
        </div>
    )
}

export default Task;

