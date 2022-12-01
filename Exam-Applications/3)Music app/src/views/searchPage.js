import {html, nothing} from'../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';
import { getUserData } from '../api/util.js';


const searchTemplate = (albums, hasUser, query, onSearch) => html`
        <section id="searchPage">
            <h1>Search by Name</h1>
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>
            <h2>Results:</h2>
            <div class="search-result">
        ${query !== "" ?  html` ${albums.length == 0 ? html`
        <p class="no-result">No result.</p>`: albums.map(x => createAlbumCard(x, hasUser))}
            </div>
        </section>}
                ` : nothing}
            </div>
        </section>`;

const createAlbumCard = (albums, hasUser) => html`
    <div class="card-box">
    <img src="${albums.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${albums.name}</p>
            <p class="artist">Artist: ${albums.artist}</p>
            <p class="genre">Genre: ${albums.genre}</p>
            <p class="price">Price: $${albums.price}</p>
            <p class="date">Release Date: ${albums.releaseDate}</p>
        </div>
        ${hasUser ? html`        <div class="btn-group">
            <a href="/catalog/${albums._id}" id="details">Details</a>
        </div>` : nothing}
    </div>
</div>`;



export async function searchPage(ctx) {

    let query = ''
    let albums = ''

    const user = getUserData();

    ctx.render(searchTemplate(albums, user, query, onSearch));

    async function onSearch(e) {
        e.preventDefault();
        let input = document.getElementById('search-input');

        const query = input.value
        input.value = "";

        if (query == ""){
            return alert('Input field is required!');
        }
        albums = await search(query);

        ctx.render(searchTemplate(albums, user, query, onSearch));
    }
}