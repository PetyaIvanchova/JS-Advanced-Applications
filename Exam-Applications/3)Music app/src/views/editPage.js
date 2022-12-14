import {html} from'../../node_modules/lit-html/lit-html.js';
import { getCardDetaild } from '../api/data.js';
import { editCard } from '../api/data.js';

const editTemplate = (card, onSubmit) =>html`
<section class="editPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value=${card.name}>

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${card.imgUrl}>

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" .value=${card.price}>

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${card.releaseDate}>

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" .value=${card.artist}>

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" .value=${card.genre}>

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${card.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>`;

export async function editPage(ctx){
    const card = await getCardDetaild(ctx.params.id);
    ctx.render(editTemplate(card, onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get('name');
        const image = formData.get('imgUrl').trim();
        const price = formData.get('price').trim();
        const releaseDate = formData.get('releaseDate').trim();
        const artist = formData.get('artist').trim();
        const genre = formData.get("genre").trim();
        const description = formData.get('description').trim();

        if(name == '' || image == '' || price == '' || releaseDate == "" 
        || artist == '' || genre == '' || description == ''){
            return alert('All fields are required!');
        }

        await editCard(ctx.params.id, {name, image, price, releaseDate, artist, genre, description});

        event.target.reset();
        ctx.page.redirect('/catalog/'+ctx.params.id);
    }
}