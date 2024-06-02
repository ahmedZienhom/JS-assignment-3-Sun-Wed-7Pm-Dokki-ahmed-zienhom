var books = [];



if(localStorage.getItem(`books`) != null) {
    books = (JSON.parse(localStorage.getItem(`books`)));
    showBooks();
}

function checkIt(element) {
    var cheker= {
        siteName : /\w{3,}/,
        siteURL : /^(https:\/\/|www.|http:\/\/)?\w{3,}[.]{1}[a-zA-Z]{2,}$/
    }
    cheker[element.id].test(element.value) ? element.classList.replace(`is-invalid`, `is-valid`) : [element.classList.add(`is-invalid`), element.classList.remove(`is-valid`)];
    return cheker[element.id].test(element.value);
}
function removeMark() {
    siteName.classList.remove(`is-valid`);
    siteURL.classList.remove(`is-valid`);
}
function submit() {

    if(!checkIt(document.getElementById(`siteName`))  || !checkIt(document.getElementById(`siteURL`)) ) {
        popUp.classList.replace(`d-none`,`d-flex`);
        return;
    }

    var book = {
        name : siteName.value,
        url : siteURL.value,
    }
    books.push(book);
    localStorage.setItem(`books`, JSON.stringify(books));
    clear();
    removeMark();
    showBooks();
}

function clear() {
    siteName.value = '';
    siteURL.value = '';
}

function showBooks() {
    var show = ``;


    for (var i = 0 ; i < books.length;i++) {
        show += `<tr>
        <td>${i + 1}</td>
        <td>${books[i].name}</td>
        <td>
            <button class="btn btn-visit text-capitalize"><a class="text-white text-decoration-none" href="https://${books[i].url}" target="_blank"><span class="fa fa-eye pe-2"></span>visit</a></button>
        </td>
        <td>
            <button class="btn btn-delete text-capitalize" onclick="deleteBook(${i})"><span class="fa-solid fa-trash-alt pe-2" ></span>delete</button>
        </td>
    </tr>`;
    }

    sites.innerHTML = show;
}
function deleteBook(index) {
    books.splice(index,1);
    localStorage.setItem(`books`, JSON.stringify(books));
    showBooks();
}
function closeIt() {
    popUp.classList.replace(`d-flex` ,`d-none`);
}