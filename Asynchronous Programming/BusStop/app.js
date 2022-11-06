async function getInfo() {
   const StopIdElement = document.getElementById("stopId").value;
   const Url = `http://localhost:3030/jsonstore/bus/businfo/${StopIdElement}`;
   const BusList = document.getElementById("buses");
   const StopNameElement = document.getElementById("stopName");

   StopIdElement.value = "";
   BusList.textContent = "";
   try{
       const reponse = await fetch(Url);
       const data = await reponse.json();

       StopNameElement.textContent = data.name;
       Object.entries(data.buses).forEach(([busNumber, timeArrive]) => {
        const li = document.createElement("li");
        li.textContent = `Bus ${busNumber} arrives in ${timeArrive} minutes`;
        BusList.appendChild(li);
       })
       
       
   } catch (error){
      StopNameElement.textContent = `Error`;
   }
}

