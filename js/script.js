let text_color = document.getElementById('text_color');
let change_size = document.getElementById('change_size');
let change_bg = document.getElementById('change_bg');
let add_br = document.getElementById('add_br');

let create_json_btn = document.getElementById('createJson');
let span = document.getElementsByTagName('span');
let font = document.getElementsByTagName('font');
let div = document.getElementById('Table');
let ArrayOfOptions = [];
let set = new Set()

// listeners for buttons which change text color, font size, background color and add return
text_color.addEventListener('click', function () {
    let arg = text_color.dataset['command'];
    document.execCommand(arg, false, this.value)
})

change_size.addEventListener('click', function () {
    let arg = change_size.dataset['command'];
    document.execCommand(arg, false, this.value);
})

change_bg.addEventListener('click', function () {
    let arg = change_bg.dataset['command'];
    document.execCommand(arg, false, this.value);
});

add_br.addEventListener('click', function () {
    let arg = add_br.dataset['command'];
    document.execCommand('insertHTML', false, "<br><br>");
});


// listener for create Json and it in console.log
create_json_btn.addEventListener('click', function () {
    let spanCollection = span;
    let font_array = font;
    let new_array_font = {};
    if(spanCollection === []){
        font_styles(font_array,new_array_font);
    }else if(font_array === []){
        span_styles(spanCollection,new_array_font);
    }else{
        span_styles(spanCollection,new_array_font);
        font_styles(font_array,new_array_font);
    }
    check(ArrayOfOptions);
});

function font_styles(array,styleCollection){
        for (let i = 0; i < array.length; i++) {
            styleCollection.color = array[i].color;
            styleCollection.size = array[i].size;
            styleCollection.text = array[i].innerText;
    ArrayOfOptions.push({
                ...styleCollection
            });
        }
    for(var key in styleCollection) {
        delete styleCollection[key];
  }  
}

function span_styles(collection,array_of_style){
    for (let i = 0; i < collection.length; i++) {
        array_of_style.bgcolor = collection[i].style.backgroundColor;
        array_of_style.text = collection[i].innerText;
        
        if(array_of_style.bgcolor !== ''){
            ArrayOfOptions.push({
                ...array_of_style
            });
        }else{
            continue;
        }
    }
    for(var key in array_of_style) {
        delete array_of_style[key];
  }  
}
function check(arr) {
    let filterArray = arr.filter(el => {
        if (set.has(el.text)) {
            return set.delete(el.text);
        } else {
            return set.add(el.text);
        }
    });
    arr.splice(0);
    let json = JSON.stringify(filterArray)
    console.log(json)
}