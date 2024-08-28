//Array of Products
var products = [];

//Add New Product
const addProduct = ()=> {
    //Create new product object
    var product = new Object();
    product.name = document.getElementById("productName").value;
    product.price = document.getElementById("productPrice").value;
    product.categoric = document.getElementById("productCategoric").value;
    product.url = document.getElementById("productPicture").value;

    //Crating id for each product
    var id = products.length +1;
    product.id = id;

    //Pushing product to array
    products.push(product);

    //Adding product to table
    createTable();
    
    //Clear inputs after adding product
    resetForm();
};

//Create Table Function
const createTable = () => {
    //Table Headers
    var listHeader =`
    <th colspan="5">My Cart</th>
    <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Categoric</th>
        <th>Picture</th>
        <th>Action</th>
    </tr>
    `;
    //Table Body
    var listBody= "";
    for(var index=0; index<products.length; index++) {
        listBody +=`
            <tr>
                <td>${products[index].name}</td>
                <td>${products[index].price}</td>
                <td>${products[index].categoric}</td>
                <td><img src="${products[index].url}" width="100px"></td>
                <td><input type="button" value="Delete" onclick="deleteRow(${products[index].id})"/></td>
            </tr>
        `;
    }
    document.getElementById("productList").innerHTML = listHeader+listBody;   
}

//Reset Form Function
const resetForm = () => {
    document.getElementById("formList").reset();
}

//Delete Table Row Function
const deleteRow = (row) => {
    var clear = products.filter((array,index)=>{
        if(array.id === row){
            products.splice(index, 1);
            if(products.length==0)//Deleting last product will delete table headers
            {
                document.getElementById("productList").innerHTML = '';
            }
            else{
                
                createTable();
            }
        }
    })
};