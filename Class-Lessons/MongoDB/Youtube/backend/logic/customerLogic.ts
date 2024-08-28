import dal_mysql from "../DAL/dal_mysql";

//SELECT EXAMPLES
const getAllCustomers = async()=>{
    //SQL statement
    const sql = "SELECT * FROM customers";
    //execute the sql command
    const allCustomers = await dal_mysql.execute(sql);
    //return the result
    return allCustomers;
}


//INSERT EXAMPLES
//16
const getProducts = async()=>{
    //SQL statement
    const sql = `
    SELECT categories.CategoryName,products.ProductName 
    FROM categories 
    INNER JOIN products 
    ON categories.CategoryID=products.CategoryID WHERE CategoryName Like '%o%'
    `;
    //execute the sql command
    const products = await dal_mysql.execute(sql);
    //return the result
    return products;
}

//19
const getOrders = async()=>{
    //SQL statement
    const sql = `
    SELECT orders.OrderID,orders.CustomerID,orders.EmployeeID,orders.OrderDate 
    FROM orders 
    WHERE (MONTH(orders.OrderDate) BETWEEN 4 AND 5) AND YEAR(orders.OrderDate)=1996 
    ORDER BY OrderDate ASC, CustomerID DESC
    `;
    //execute the sql command
    const orders = await dal_mysql.execute(sql);
    //return the result
    return orders;
}

export default {
    getAllCustomers,
    getProducts,
    getOrders,
}