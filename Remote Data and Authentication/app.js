function attachEvents() {
    document.getElementById("submit").addEventListener("click", sending);
    document.getElementById("refresh").addEventListener("click", refreshing);
    
}

async function refreshing(){
    const url = `http://localhost:3030/jsonstore/messenger`;
    const response = await fetch(url);
    const data = await response.json();
    convertData(data);
}

function convertData(data){
   const textArea = document.getElementById("messages");
  // const data = refreshing();

   //"{author}: {message}"
   //Object.values(data).forEach(element => {
   // const li = document.createElement("li");
   // li.textContent = `${element.author}: ${element.content}`;
   // textArea.appendChild(li);
   // });

   const content = Object.values(data).map(entry=>
    `${entry.author}: ${entry.content}`).join("\n");
    textArea.textContent = content;
}

function sending(){
    const authorEl = document.querySelector("input[name='author']");
    const contentEl = document.querySelector("input[name='content']");
    
    const obj = {
        author: authorEl.value,
        content: contentEl.value
    };
    
    authorEl.value = "";
    contentEl.value = "";

    SendingPostRequiest(obj);
    //refreshing();
}

async function SendingPostRequiest(obj){

    const url = `http://localhost:3030/jsonstore/messenger`;
    const response = await fetch(url, {
        method: `POST`,
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });
    const data = await response.json();
    //return data;
    refreshing();
}

attachEvents();
