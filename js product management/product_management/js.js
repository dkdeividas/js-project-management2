// ivedimo laukai
const enterID = document.getElementById('enterID');
const enterName = document.getElementById('enterName');
const enterQuantity = document.getElementById('enterQuantity');

// ivedimo laukas, prekes ieskojimui
const findID = document.getElementById('findID');

// vieta rezultatu spausdinimui
const placeForResult = document.getElementById('findData');

// gaunu mygtukus
const insertButton = document.getElementById('insert');
const removeButton = document.getElementById('remove');
const findButton = document.getElementById('find');

// duomenu irasymo funkcija
function insertData(event){
    event.preventDefault();
    // padaryti validacijas, kad formos uzpildymui
    if (enterID.value.length < 3) {
        alert('Product Code cant be blank! min 3 symbols')
        return
    }
    if (enterName.value === "") {
        alert('Product name cant be blank')
        return
    }
    if (enterQuantity.value.length < 1) {
        alert('Product quantity cant be blank! min 1 symbol')
        return
    }

    // paimti reiksmes is input lauku
    // console.log(` prekes kodas ${enterID.value} , 
    // prekes pavadinimas ${enterName.value} , prekes kiekis ${enterQuantity.value}`)

    
    // patikrint ar yra prekiu krepselis, jei ne, sukurti tuscia masyva []
    const krepselis = JSON.parse(localStorage.getItem("cart")) || [];
    // padaryti tikrinima, ar preke tokiu kodu dar neegzistuoja
    let codes = [];
    for(let i=0; i < krepselis.length; i++){
        codes.push(krepselis[i].id);
    }
    if(codes.includes(enterID.value)){
        alert('Preke tokiu kodu jau yra');
    } else {
        // i krepseli idedu nauja preke
    krepselis.push({
        id: enterID.value,
        name: enterName.value,
        quantity: enterQuantity.value,
    })}

    // idedu i local storage
    localStorage.setItem('cart', JSON.stringify(krepselis));

    // tikrinu 
    //console.log(JSON.parse(localStorage.getItem('cart')));
}
// duomenu gavimo funkcija
function getDataFromLocalStorage(event){
    event.preventDefault();
    if(findID.value.length < 1) {
        alert('min 1 symbols')
        return
    }
    // console.log(JSON.parse(localStorage.getItem('cart')));

    // gaunu info is Local Storage
    const productsList = JSON.parse(localStorage.getItem('cart'));
    console.log(productsList);
    productsList.map(item =>{
        if(item.id === findID.value){
            console.log(item);
            // sukurti list item elementa
            let listItem = document.createElement('li');
            // ideti i ji info apie preke
            listItem.textContent = item.name
            // i ul ideti list item
            placeForResult.appendChild(listItem);
        }

    })

}
// duomenu trynimo funkcija
function deleteDataFromLocalStorage(event){
    event.preventDefault();
    // gauti prekiu masyva is Local Storage
    const products = JSON.parse(localStorage.getItem('cart'));
    console.log(products);
    // randam index ieskomos prekes filter()
    // salinam, trinam rasta elementa tuo indeksui
    const naujasMasyvas = products.filter(item => item.id !== enterID.value

    )
    console.log(naujasMasyvas)
    console.log(typeof enterID.value)
    // irasyti nauja info i Local storage
    localStorage.setItem('cart', JSON.stringify(naujasMasyvas));

    
    
}

// funkcijos iskvietimas
insertButton.addEventListener('click', insertData);
findButton.addEventListener('click', getDataFromLocalStorage);
removeButton.addEventListener('click', deleteDataFromLocalStorage);