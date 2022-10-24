window.addEventListener("load", solve);

function solve() {
  let firstname = document.getElementById("first-name");
  let lastname = document.getElementById("last-name");
  let age = document.getElementById("age");
  let storytitle = document.getElementById("story-title");
  let genre = document.getElementById("genre");
  let story = document.getElementById("story");
  let previewlist=document.getElementById("preview-list");
  let main=document.getElementById("main");
  let formwrapper=document.getElementsByClassName("form-wrapper");

  let btnPublish = document.getElementById("form-btn");
  btnPublish.addEventListener("click", (ev)=>{
    ev.preventDefault();
    publishing();
  })

  function publishing(){
    let firstnameValue=firstname.value;
    let lastnameValue=lastname.value;
    let ageValue=age.value;
    let storytitleValue = storytitle.value;
    let genreValue=genre.value;
    let storyValue=story.value;

    if(!firstnameValue || !lastnameValue || !ageValue || !storytitleValue || !genreValue || !storyValue){
      return;
    }

    createDomForPublishing(firstnameValue,lastnameValue,ageValue,storytitleValue,genreValue,storyValue);
    
    firstname.value="";
    lastname.value="";
    age.value="";
    storytitle.value="";
    genre.value="";
    story.value="";
    btnPublish.disabled = 'true'
  }

  function createDomForPublishing(firstnameValue,lastnameValue,ageValue,storytitleValue,genreValue,storyValue){
    let li=document.createElement("li");
    li.classList.add("story-info");
    let article=document.createElement("article");
    let h4=document.createElement("h4");
    h4.textContent=`Name: ${firstnameValue} ${lastnameValue}`;

    let page = document.createElement("p");
    page.textContent=`Age: ${ageValue}`;

    let ptitle=document.createElement("p");
    ptitle.textContent=`Title: ${storytitleValue}`;

    let pgenre=document.createElement("p");
    pgenre.textContent=`Genre: ${genreValue}`;

    let pstory=document.createElement("p");
    pstory.textContent=storyValue;

    article.appendChild(h4);
    article.appendChild(page);
    article.appendChild(ptitle);
    article.appendChild(pgenre);
    article.appendChild(pstory);

    let btnsave=document.createElement("button");
    btnsave.classList.add("save-btn");
    btnsave.textContent="Save Story";
    btnsave.addEventListener("click", (ev)=>{
      ev.preventDefault();
      saving(ev);
    })

    let btnedit=document.createElement("button");
    btnedit.classList.add("edit-btn");
    btnedit.textContent="Edit Story";
    btnedit.addEventListener("click", (ev)=>{
      ev.preventDefault();
      editing(ev);
    })

    let btnDelete=document.createElement("button");
    btnDelete.classList.add("delete-btn");
    btnDelete.textContent="Delete Story";
    btnDelete.addEventListener("click", (ev)=>{
      ev.preventDefault();
      deletting(ev);
    })
    
    li.appendChild(article);
    li.appendChild(btnsave);
    li.appendChild(btnedit);
    li.appendChild(btnDelete);
    //btnedit.disabled="false"
    
    previewlist.appendChild(li);
  }

  function editing(ev){
    let fandlname=ev.target.parentElement.children[0].children[0].textContent;
    let fnamesplit=fandlname.split(": ")[1].split(" ")[0];
    let lsnamesplit=fandlname.split(": ")[1].split(" ")[1];
    
    let agesplit=ev.target.parentElement.children[0].children[1].textContent.split(": ")[1];
    let titlesplit=ev.target.parentElement.children[0].children[2].textContent.split(": ")[1];
    let genresplit=ev.target.parentElement.children[0].children[3].textContent.split(": ")[1];
    let storysplit=ev.target.parentElement.children[0].children[4].textContent;

    firstname.value=fnamesplit;
    lastname.value=lsnamesplit;
    age.value=agesplit;
    storytitle.value=titlesplit;
    genre.value=genresplit;
    story.value=storysplit;
    btnPublish.disabled = false;
    
    let lifordeleting=ev.target.parentElement;
    lifordeleting.remove();


  }

  function saving(ev){
    
    ev.target.parentElement.parentElement.parentElement.parentElement.children[0].remove();
    ev.target.parentElement.parentElement.parentElement.remove();

    let h1=document.createElement("h1");
    h1.textContent="Your scary story is saved!";
    main.appendChild(h1);
  }

  function deletting(ev){
    
    ev.target.parentElement.remove();
    btnPublish.disabled = false;
  }
}
