import { useEffect, useState } from 'react';
import Bar from '../Bar';
import './VisualizationArea.css'

export default function VisualizationArea() {

    const [arr, setArr] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");

    useEffect(() => {
        generateRandomArr();
    }, []);

    const generateRandomArr = () => {
        const min = 1;
        const max = 30;
        const randomArray = [];
        for (let i = 0; i < 10; i++) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            randomArray.push(randomNumber);
        }
        setArr(randomArray);
    };

    const delay = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    const bubbleSort = async () => {
        setSorting(true);
        const newArray = [...arr];

        for (let i = 0; i < newArray.length - 1; i++) {
            for (let j = 0; j < newArray.length - i - 1; j++) {

                if (newArray[j] > newArray[j + 1]) {

                    const temp = newArray[j];
                    newArray[j] = newArray[j + 1];
                    newArray[j + 1] = temp;

                    await delay(100);
                    setArr([...newArray]);
                }
            }
        }

        setSorting(false);
    }

    const insertionSort = async () => {
        setSorting(true);
        const newArray = [...arr];

        for (let i = 1; i < newArray.length; i++) {
            const current = newArray[i];
            let j = i - 1;

            while (j >= 0 && newArray[j] > current) {
                newArray[j + 1] = newArray[j];
                j--;
            }

            newArray[j + 1] = current;

            await delay(100);
            setArr([...newArray]);
        }

        setSorting(false);
    };

    const selectionSort = async () => {
        setSorting(true);
        const newArray = [...arr]; 

        for (let i = 0; i < newArray.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < newArray.length; j++) {

                if (newArray[j] < newArray[minIndex]) {
                    minIndex = j;
                }
            }


            const temp = newArray[i];
            newArray[i] = newArray[minIndex];
            newArray[minIndex] = temp;


            await delay(100);
            setArr([...newArray]);
        }

        setSorting(false);
    }

    const quickSort = async () => {
        setSorting(true);
        const newArray = [...arr];

        async function partition(low, high) {
            const pivot = newArray[high];
            let i = low - 1;

            for (let j = low; j <= high - 1; j++) {
                if (newArray[j] < pivot) {
                    i++;

                    const temp = newArray[i];
                    newArray[i] = newArray[j];
                    newArray[j] = temp;


                    await delay(100);
                    setArr([...newArray]);
                }
            }


            const temp = newArray[i + 1];
            newArray[i + 1] = newArray[high];
            newArray[high] = temp;

            await delay(100);
            setArr([...newArray]);

            return i + 1;
        }

        async function quickSortRecursive(low, high) {
            if (low < high) {
                const pivotIndex = await partition(low, high);
                await quickSortRecursive(low, pivotIndex - 1);
                await quickSortRecursive(pivotIndex + 1, high);
            }
        }

        await quickSortRecursive(0, newArray.length - 1);

        setSorting(false);
    }

    const mergeSort = async () => {
        setSorting(true);
        const newArray = [...arr];

        async function merge(left, middle, right) {
            const n1 = middle - left + 1;
            const n2 = right - middle;

            const L = newArray.slice(left, middle + 1);
            const R = newArray.slice(middle + 1, right + 1);

            let i = 0;
            let j = 0;
            let k = left;

            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    newArray[k] = L[i];
                    i++;
                } else {
                    newArray[k] = R[j];
                    j++;
                }
                k++;


                await delay(100);
                setArr([...newArray]);
            }

            while (i < n1) {
                newArray[k] = L[i];
                i++;
                k++;

                await delay(100);
                setArr([...newArray]);
            }

            while (j < n2) {
                newArray[k] = R[j];
                j++;
                k++;


                await delay(100);
                setArr([...newArray]);
            }
        }

        async function mergeSortRecursive(left, right) {
            if (left < right) {
                const middle = Math.floor((left + right) / 2);

                await mergeSortRecursive(left, middle);
                await mergeSortRecursive(middle + 1, right);

                await merge(left, middle, right);
            }
        }

        await mergeSortRecursive(0, newArray.length - 1);

        setSorting(false);
    }

    const performSorting = async (algorithm) => {
        switch (algorithm) {
            case "bubbleSort":
                await bubbleSort();
                break;

            case "insertionSort":
                await insertionSort();
                break;

            case "selectionSort":
                await selectionSort();
                break;

            case "quickSort":
                await quickSort();
                break;

            case "mergeSort":
                await mergeSort();
                break;

            default:
                break;
        }
    }

    return (
        <>
            <div className='navbar'>
                <form className='navbar-container'>
                    <div>
                        <div>
                            <label>Select Algorithm</label>
                        </div>
                        <select name="algorithm" id="algorithm" value={selectedAlgorithm} onChange={(e) => setSelectedAlgorithm(e.target.value)}>
                            <option value="bubbleSort">Bubble Sort</option>
                            <option value="insertionSort">Insertion Sort</option>
                            <option value="selectionSort">Selection Sort</option>
                            <option value="quickSort">Quick Sort</option>
                            <option value="mergeSort">Merge Sort</option>
                        </select>
                    </div>


                    <div>
                        <button type='button' onClick={generateRandomArr} className='nav-button'>Generate</button>
                    </div>

                    <div>
                        <button
                            type='button'
                            onClick={() => performSorting(selectedAlgorithm)}
                            disabled={sorting}
                            className='nav-button'
                        >
                            Visualize
                        </button>
                    </div>
                </form>
            </div>
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