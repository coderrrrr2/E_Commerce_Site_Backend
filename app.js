const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pg = require('pg');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

const pgPool = new pg.Pool({
  database: 'adebayophilip',
  user: 'adebayophilip',
  password: 'password',
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
});

// Session middleware
app.use(
  session({
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: 'session', // Optional: Customize table name (default is "session")
    }),
    secret: 'dfjdkjfdjfldjflkdjf', // Use a secure, random secret
    // resave: false, // Don't save session if unmodified
    // saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      // secure: false, // Set to true if using HTTPS
      // httpOnly: true, // Prevent client-side JavaScript access
    },
  })
);
// app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated ? req.isAuthenticated() : false;
  next();
});





app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');
const Order = require('./models/order');
const OrderItem = require('./models/order_item');




Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });


sequelize.
  sync()
  // sync({force :true})

  .then(result => {

    return User.findByPk(1);

  }).then(user => {
    if (!user) {

      return User.create({ name: 'Max', email: 'test@rt.com', id: 1 });
    }
    return user;
  }).then(user => {

    return user.createCart();

  }).then(cart => {

    app.listen(3000);

  })
  .catch(err => {
    console.log(err);
  });

