/*async function solve() {
    const InfoBox = document.getElementById("info");
    const BtnDepart = document.getElementById("depart");
    const BtnArrive = document.getElementById("arrive");
    let StopId = 'depot';

    const Url = `http://localhost:3030/jsonstore/bus/schedule/${StopId}`;
    try{
        const response = await fetch(Url);
        const data = await response.json();
    
        function depart() {
            
            InfoBox.textContent = `Next stop ${data.next}`;
            BtnDepart.disabled = "disabled";
            BtnArrive.disabled = "block";
            StopId.textContent = data.name;
        }
    
        function arrive() {
            InfoBox.textContent = `Arriving at ${data.name}`;
            BtnArrive.style.disabled = "true";
            BtnDepart.style.disabled = "block";
            StopId.textContent = data.name;
        }
    
        return {
            depart,
            arrive
        };
    } catch (error) {
       InfoBox.textContent = `Error`;
       BtnArrive.disabled = "true";
       BtnDepart.disabled = "true";
    }
    
}

let result = solve();
*/

function solve() {

    const label = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depott'
    };

    async function depart() {
        //get info for next stop
        //display next stop

        departBtn.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const response = await fetch(url);
        if (response.status !== 200) {
            label.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
        stop = await response.json();

        label.textContent = `Next Stop ${stop.name}`
        arriveBtn.disabled = false;
    }

    function arrive() {
        label.textContent = `Arriving at ${stop.name}`

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
