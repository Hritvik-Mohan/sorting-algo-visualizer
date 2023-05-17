import './Navbar.css'

export default function Navbar() {
    return (
        <div className='navbar'>
            <form className='navbar-container'>
                <div>
                    <div>
                        <label>Select Algorithm</label>
                    </div>
                    <select name="cars" id="cars">
                        <option value="">Bubble Sort</option>
                        <option value="">Insertion Sort</option>
                        <option value="">Selection Sort</option>
                        <option value="">Quick Sort</option>
                        <option value="">Merge Sort</option>
                    </select>
                </div>

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
                </div>

                <div>
                    <button className='nav-button'>Generate</button>
                </div>

                <div>
                    <button className='nav-button'>Visualize</button>
                </div>
            </form>
        </div>
    )
}