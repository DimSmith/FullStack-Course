//get all elements that tag name is input
var elements = document.getElementsByTagName("input");

for (var index=0; index < elements.length; index++) {
    //add event listener, and add the event to our arrow function
    //                                            callback
    elements[index].addEventListener("focusin",(elementEven) => {
        //the focusin event -> element triggered the event
        elementEven.target.style.backgroundColor = "yellow";
    });
    elements[index].addEventListener("focusout",(elementEven) => {
        elementEven.target.style.backgroundColor = "white";
    });
}