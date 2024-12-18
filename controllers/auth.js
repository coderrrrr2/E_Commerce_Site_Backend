

const { name } = require('ejs');
const User = require('../models/user');



exports.getLogin = (req, res, next) => {
 
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignUp= (req, res, next) => {
  res.render('auth/signUp', {
    path: '/signUp',
    pageTitle: 'Sign Up',
    isAuthenticated: false
  });
}

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const  password = req.body.password;
User.findOne(  {where: { email: email }}
).then(users => {
  if(users){
    console.log('User already exists');
    return res.redirect('/signUp');
  }
    console.log(users);
    User.create({
      name: 'test',
      email: email,
      password: password
    }).then(result => {
      result.save();
      console.log('User Created');
      res.redirect('/login');
    }).catch(err => {
      res.redirect('/signUp');

      console.log(err);
    });
  });;


}

exports.postLogin = (req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.session.isLoggedIn = true;

      req.session.user = user;
      req.session.save(err => {
        res.redirect('/');
      });

    })

};


exports.logout = (req,res,next) =>{

  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
}
