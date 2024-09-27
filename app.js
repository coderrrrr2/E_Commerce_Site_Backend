const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        console.log('User found:', user);

        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);




Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product); 
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize.
sync()
// sync('force :true')

.then(result => { 
  
   return User.findByPk(1); 

}).then(user => {
    if(!user){
        console.log("user not found");

       return  User.create({name: 'Max', email: 'test@rt.com', id: 1});
    }
    return user;
}).then(user => {
    // console.log('User found outside middleware:', user);

   return  user.createCart();

}).then(cart => {
    app.listen(3000);

})
.catch(err => {
    console.log(err);
});

