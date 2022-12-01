import {html} from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../api/util.js';
import { getAllCards } from '../api/data.js';


const catalogTemplate = (cards, user) => html`
<section id="catalogPage">
            <h1>All Albums</h1>
          
            ${cards.length == 0 ? html`
            <p>No Albums in Catalog!</p>` 
            : cards.map(card => cardTemplateuser(card, user)) }     
                
                
        </section>`;


const cardTemplateuser = (card, user) => html`
<div class="card-box">
                <img src="${card.imgUrl}">
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${card.name}</p>
                        <p class="artist">Artist: ${card.artist}</p>
                        <p class="genre">Genre: ${card.genre}</p>
                        <p class="price">Price: ${card.price}</p>
                        <p class="date">Release Date: ${card.releaseDate}</p>
                    </div>
                   ${user ? html`<div class="btn-group">
                        <a href="/catalog/${card._id}" id="details">Details</a>
                    </div>`
                   : ""}
                    
                   

                </div>
</div>`;

export async function catalogPage(ctx){
    const user = getUserData(); 
    const cards = await getAllCards();

    ctx.render(catalogTemplate(cards, user));
   
}