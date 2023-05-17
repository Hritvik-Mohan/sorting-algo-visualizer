import { useEffect, useState } from 'react';
import Bar from '../Bar';
import './VisualizationArea.css'

export default function VisualizationArea() {

    const [arr, setArr] = useState([]);
    const [sorting, setSorting] = useState(false);

    useEffect(() => {
        generateRandomArr();
    }, []);

    const generateRandomArr = () => {
        const min = 1;
        const max = 30;
        const randomArray = [];
        for (let i = 0; i < 15; i++) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            randomArray.push(randomNumber);
        }
        setArr(randomArray);
    };


    const bubbleSort = async () => {
        setSorting(true); // Start sorting
        const newArray = [...arr]; // Create a copy of the array

        for (let i = 0; i < newArray.length - 1; i++) {
            for (let j = 0; j < newArray.length - i - 1; j++) {
                // Compare adjacent elements
                if (newArray[j] > newArray[j + 1]) {
                    // Swap elements if they are in the wrong order
                    const temp = newArray[j];
                    newArray[j] = newArray[j + 1];
                    newArray[j + 1] = temp;
                    // Update the array state after each swap with delay
                    await delay(100);
                    setArr([...newArray]);
                }
            }
        }

        setTimeout(() => {
            setSorting(false); // Sorting completed  
        }, newArray.length * (newArray.length - 1) * 100);
    }

    const delay = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    return (
        <>
            <div className='navbar'>
                <form className='navbar-container'>
                    <div>
                        <div>
                            {/* <label>Select Algorithm</label> */}
                        </div>
                        <select name="cars" id="cars">
                            <option value="">Bubble Sort</option>
                            <option value="">Insertion Sort</option>
                            <option value="">Selection Sort</option>
                            <option value="">Quick Sort</option>
                            <option value="">Merge Sort</option>
                        </select>
                    </div>
                    {/* 
                <div>
                    <div>
                        <label>Size</label>
                    </div>
                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange"></input>
                </div>

                <div>
                    <div>
                        <label>Speed</label>
                    </div>
                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange"></input>
                </div> */}

                    <div>
                        <button type='button' onClick={generateRandomArr} className='nav-button'>Generate</button>
                    </div>

                    <div>
                        <button type='button' onClick={bubbleSort} className='nav-button'>Visualize</button>
                    </div>
                </form>
            </div>
            {/* <button onClick={bubbleSort} disabled={sorting}>
                {sorting ? 'Sorting...' : 'Start Bubble Sort'}
            </button> */}
            <div className='visualization-area'>
                {
                    arr.map((num, i) => (
                        <Bar key={i} value={num}></Bar>
                    ))
                }
            </div>
        </>
    )
}