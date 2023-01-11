import "./App.css";

var sleeptime = 750;


function App() {

    const reset = () => {
        console.log('reset');
        document.getElementById('btn').disabled = false;
        var tableElem = document.getElementById('sample-table');
        for(let i = 0; i < 100; i++){
        tableElem.tBodies[0].deleteRow(0);
    }
        // window.location.reload();
    }
    
    const change = () => {
        console.log('change');
        document.getElementById('btn').disabled = true;


        const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
        var people = parseInt(document.getElementById('people').value);
        var column = parseInt(document.getElementById('column').value);
        
        var gou = [];
        for(let i = 0; i < people; i++){
            gou[i] = i + 1;
        }

        const columns = [];
        for(let i = 0; i < people / column; i++){
            columns[i] = [];
            for(let j = 0; j < column; j++){
                columns[i][j] = gou.splice(Math.floor(Math.random() * gou.length), 1)[0];
            }
        }
        console.log(columns);

        //   次回
        const creatroom = async function(){

            for(let row = 0; row < people / column; row++){
                const tr = document.createElement('tr');
                document.querySelector('tbody').appendChild(tr);
                for(let col = 0; col < column; col++){
                    if(columns[row][col] === undefined){
                        break;
                    }
                    const td = document.createElement('td');
                    td.textContent = "";
                    tr.appendChild(td);
                    td.setAttribute("id", "num" + row + col); //それぞれの場所に名前を付ける
                }   
            }
            //ここで席がわかる
            await sleep(500);
            for(let row = 0; row < people / column; row++){
                for(let col = 0; col < column; col++){
                    document.getElementById("num" + row + col).textContent = columns[row][col];
                    await sleep(sleeptime);
                }
            }
        }

        creatroom();
        
    };

    return (
        <div>
            <h2><span>席替え</span></h2>
            人数<input type="number" id="people" ></input>
            列<input type="number" id="column" ></input>
            <button onClick={change} id="btn" disabled={false} >change</button>
            <button onClick={reset} id="reset" >reset</button>
            <table id="sample-table">
            <thead>
                <tr>
                    <th colSpan="2">黒板</th>
                </tr>
            </thead>
            <tbody>
                    
            </tbody>
            </table>
        </div>
    );
}

export default App;