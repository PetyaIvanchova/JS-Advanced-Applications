import {html} from '../../node_modules/lit-html/lit-html.js';
import { deleteCard, getCardDetaild } from '../api/data.js';
import { getUserData } from '../api/util.js';

const detailsTemplate = (card, isOwner, onDelete) =>html`
<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src=${card.imgUrl}>
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${card.name}</h1>
            <h3>Artist: ${card.artist}</h3>
            <h4>Genre: ${card.genre}</h4>
            <h4>Price: $${card.price}>
            <h4>Date: ${card.releasDate}</h4>
            <p>Description: ${card.description}</p>
        </div>

        ${isOwner ? html`
        <div class="actionBtn">
            <a href="/edit/${card._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="#" class="remove">Delete</a>
        </div>`
        : ''}
        
    </div>
</div>
</section>`;

export async function detailsPage(ctx){
    const user = getUserData();
    const card = await getCardDetaild(ctx.params.id);
    
    const isOwner = card._ownerId === user.id;

    ctx.render(detailsTemplate(card, isOwner, onDelete));
    
    async function onDelete(){
        if(confirm('Are you sure you want to delete this?')){
            await deleteCard(ctx.params.id);
            ctx.page.redirect('/catalog')
        }
    }
}