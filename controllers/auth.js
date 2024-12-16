

const User = require('../models/user');



exports.getLogin = (req, res, next) => {
 
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

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
