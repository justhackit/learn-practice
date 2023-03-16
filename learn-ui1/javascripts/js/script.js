function sayHello() {
    var name = document.getElementById("name").value 
    console.log("Name entered is "+name)
    document.getElementById("content").innerHTML = "<h2>Hello "+name+"...!"
    
}