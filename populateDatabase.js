import axios from "axios";

class userObj {
    constructor(firstName, lastName, email, userName, password, userType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.userType = userType;
    }
}

class postObj {
    constructor(imageList, title, description, price, condition, quantity, userName) {
        this.imageList = imageList;
        this.title = title;
        this.description = description;
        this.price = price;
        this.condition = condition;
        this.quantity = quantity;
        this.userName = userName;
    }
}

buyers = []
sellers = []
posts = []

