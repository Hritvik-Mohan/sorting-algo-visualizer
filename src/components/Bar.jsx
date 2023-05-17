import './Bar.css'

export default function Bar({ value }) {

    console.log(value);

    const barStyle = {
        "backgroundColor": "#23f7",
        // "width": "100%",
        "width": "20px",
        "height": `${value}rem`
        /* Additional styling properties */
    }
    
    return (
        <div className='bar' style={barStyle}>  
        </div>
    )
}