import Bar from '../Bar';
import './VisualizationArea.css'

export default function VisualizationArea() {

    const arr = [];
    const min = 1;
    const max = 30;
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      arr.push(randomNumber);
    }

    return (
        <div className='visualization-area'>
            {
                arr.map((num, i) => (
                    <Bar key={i} value={num}></Bar>
                ))
            }
        </div>
    )
}