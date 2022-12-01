import { render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./api/util.js";
import page from "../node_modules/page/page.mjs";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "../src/views/registerPage.js";
import { homePage } from "./views/homePage.js";
import { logout } from "./api/users.js";
import { catalogPage } from "./views/catalogPage.js";
import { createPage } from "./views/createPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { searchPage } from "../src/views/searchPage.js";


const main = document.querySelector('main');

page(decorateContext);
page('/login', loginPage);
page('/register', registerPage);
page('/', homePage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/catalog/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage)

updateNav();
page.start();


function rend(template){
    render(template, main);
}

function decorateContext(ctx, next){
    ctx.render = rend;
    ctx.updateNav = updateNav;

    next();
}

function updateNav(){
    const userData = getUserData();

    const loginNav = document.querySelector('ul').children[2];
    const registerNav = document.querySelector('ul').children[3];
    const createNav = document.querySelector('ul').children[4];
    const logoutNav = document.querySelector('ul').children[5];

    if(userData){
        createNav.style.display = "block";
        logoutNav.style.display = "block";
        loginNav.style.display = "none";
        registerNav.style.display = "none";
    } else {
        createNav.style.display = "none";
        logoutNav.style.display = "none";
        loginNav.style.display = "block";
        registerNav.style.display = "block";
    }
}

document.querySelector('ul').children[5].addEventListener("click", onLogout);

function onLogout(){
    logout();
    updateNav();
    page.redirect('/');
}