class footballTeam{
    constructor(clubname, country){
        this.clubname=clubname;
        this.country=country;
        this.invitedplayers=[];
    }

    newAdditions(footballPlayers){
        let names=[];
           
        for (let index = 0; index < footballPlayers.length; index++) {
           let name=footballPlayers[index].split('/')[0];
          
           names.push(name);
           let age=footballPlayers[index].split('/')[1];
           let value=footballPlayers[index].split('/')[2];

           let currPlayer=this.invitedplayers.find(player=>player.name===name);
           if(!currPlayer){
            this.invitedplayers.push({
                name: name,
                age: age,
                playerValue: value
               });
            }
           else{
            if(value>currPlayer.playerValue){
                currPlayer.value=value;
               }
           }
          

           
        }
        return `You successfully invite ${names.join(", ")}.`
    }

    signContract(selectedPlayer){
        let name=selectedPlayer.split("/")[0];
        let playeroofer=selectedPlayer.split("/")[1];

        let currPlayer=this.invitedplayers.find(player=>player.name===name);
        if(!currPlayer){
            throw Error(`${name} is not invited to the selection list!`);
        }

        if(playeroofer<currPlayer.playerValue){
            throw Error(`The manager's offer is not enough to sign a contract with ${name}, ${currPlayer.playerValue-playeroofer} million more are needed to sign the contract!`);
        }

        currPlayer.playerValue="Bought";
        return `Congratulations! You sign a contract with ${name} for ${playeroofer} million dollars.`;



    }

    ageLimit(name, age){
        let currPlayer=this.invitedplayers.find(player=>player.name===name);
        if(!currPlayer){
            throw Error(`${name} is not invited to the selection list!`);
        }

        if(currPlayer.age<age){
            if(age-currPlayer.age<5){
                return `${name} will sign a contract for ${age-currPlayer.age} years with ${this.clubname} in ${this.country}!`;
            }
            else {
                return `${name} will sign a full 5 years contract for ${this.clubname} in ${this.country}!`;
            }
        }
        else {
            return `${name} is above age limit!`;
        }
    }

    transferWindowResult(){
        let result="";
        result+="Players list:\n";
        this.invitedplayers.sort((a, b) => a.name.localeCompare(b.name));
        this.invitedplayers.forEach(player=>result+=`Player ${player.name}-${player.playerValue}\n`);
        
        return result.trim();

    }
}

let fTeam = new footballTeam("Barcelona", "Spain");
console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"]));
console.log(fTeam.signContract("Kylian Mbappé/240"));
console.log(fTeam.ageLimit("Kylian Mbappé", 30));
console.log(fTeam.transferWindowResult());


