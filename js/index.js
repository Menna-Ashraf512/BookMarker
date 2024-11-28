var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var booksList=[];
// console.log(siteNameInput);
// console.log(siteUrlInput);

if(localStorage.getItem("allBooks")!==null){
    booksList=JSON.parse(localStorage.getItem("allBooks"));
    displayList();
}


    function addBook(){
        if(validateForm(siteNameInput) && validateForm (siteUrlInput)){
            var Duplicate = booksList.some (function(book){
                return  (book.Name === siteNameInput.value || book.Url === siteUrlInput.value);
            });

            console.log(Duplicate);
    
            if (Duplicate) {
                document.getElementById("MassageError").classList.remove("d-none");
            } else {
                var book = {
                    Name: siteNameInput.value,
                    Url: siteUrlInput.value,
                };
    
                booksList.push(book);
    
                localStorage.setItem("allBooks", JSON.stringify(booksList));
                displayList();
                clearForm();
            }
        } else {
            document.getElementById("MassageValid").classList.remove("d-none");
        }
    }    


function displayList(){
    blackBox=``;
    for( var i=0;  i < booksList.length; i++){
        blackBox += `<tr>
                            <td class="text-capitalize">${i}</td>
                            <td class="text-capitalize">${booksList[i].Name}</td>
                            <td class="text-capitalize">
                                <a href="${booksList[i].Url}" target="_blank" class=" view btn btn-custom"  onclick="viewBook(${i})"><i class="fa-solid fa-eye pe-2"></i>View</a>
                            </td>
                            <td class="text-capitalize">
                                <a href="#" class="btn btn-danger view" onclick="deleteBook(${i})"><i class="fa-solid fa-trash-can pe-2"></i> Delete</a>
                            </td>
                                <td class="text-capitalize">
                                <a href="#" class="btn btn-light view" onclick="editBook(${i})"><i class="fa-solid fa-trash-can pe-2"></i> Edit</a>
                            </td>
                        </tr>`
    }
    document.getElementById("tableContent").innerHTML=blackBox;
}


function clearForm(){
    siteNameInput.value ="";
    siteUrlInput.value ="";
    siteUrl.classList.remove("is-valid");
    siteName.classList.remove("is-valid");
}


function deleteBook(deletedIndex){
    booksList.splice(deletedIndex,1);
    localStorage.setItem("allBooks",JSON.stringify(booksList));
    displayList();
}


function validateForm(input){

    var regex ={
        siteName :/^[A-Z][a-zA-Z ]{1,49}$/,
        siteUrl :/^https:\/\/www\.[a-zA-Z0-9-]+\.[a-z]{2,10}(\/.*)?$/
    };

    var isValid  = regex[input.id].test(input.value);


if(isValid){
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.nextElementSibling.classList.replace("d-block","d-none");

}else{

    input.classList.remove("is-valid");
    input.classList.add("is-invalid");  
    input.nextElementSibling.classList.replace("d-none","d-block");

}

return isValid;
}

function closeBox(){
    document.getElementById("MassageValid").classList.add("d-none");
}
function closeBoxError(){
    document.getElementById("MassageError").classList.add("d-none");
}

var updateIndex;
function editBook(editIndex){ 
    updateIndex=editIndex;
    submitBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");
    siteNameInput.value = booksList[editIndex].Name;
    siteUrlInput.value = booksList[editIndex].Url;
    // console.log(booksList[editIndex].Name);
}

function updateBook(){
    if(validateForm(siteNameInput)&&validateForm(siteUrlInput)){
        booksList[updateIndex].Name = siteNameInput.value;
        booksList[updateIndex].Url = siteUrlInput.value;
        localStorage.setItem("allBooks",JSON.stringify(booksList));
        displayList(booksList);
        clearForm();
        submitBtn.classList.remove("d-none");
        editBtn.classList.add("d-none");
    } else {
        document.getElementById("MassageValid").classList.remove("d-none");
    }

}
