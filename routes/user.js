uuidv4 = require('uuid/v4')
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;
      var mob= post.mob_no;
      let imgFile = req.files.img_file;
      imgFile.mv('./public/images/upload_images/' + imgFile.name);
      img = encodeURIComponent(imgFile.name)
      var query = db.query("INSERT INTO `users`(`first_name`,`last_name`,`email`,`mob_no`,`image`,`user_name`, `password`) VALUES ('" + fname +"' ,'"+ lname +"' , '"+ email +"' ,' "+ mob +"',' "+ img +"' , '"+ name +"' , '"+ pass +"')"
			  , function(err, result) {
		  console.log(err)
         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      res.render('signup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('login.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {data:results});
	   
   });       
};
//-----------------------------------------------buy---------------------------------------------------
exports.buy = function(req, res){
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   var sql=" SELECT `voice`.* FROM `purchased`, `voice` WHERE uid = " + userId + " AND vid = `voice`.id";          
   db.query(sql, function(err, result){  
      res.render('buy.ejs',{data:result});
	
   })
};

exports.increaseBalance = function(req, res){
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   var sql="UPDATE users SET balance = balance + " + req.query.amount + " WHERE id = " + userId;          
   db.query(sql, function(err, result){  
	   res.redirect('/home/profile')
   })
};

exports.purchase = function(req, res){
   var id = req.query.id
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   var sql=" SELECT * FROM `purchased` where uid = " + userId + " AND vid = " + id;          
   db.query(sql, function(err, result){  
      if (result.length == 0) {
		 sql="SELECT price FROM voice WHERE id = " + id
		 db.query(sql, function(err, user) {
			var price = user[0].price
			sql = "UPDATE users SET balance = balance - " + price + " WHERE id = " + userId + " AND balance >= " + price;
			db.query(sql, function(err, result) {
			   sql="INSERT INTO purchased (uid, vid, num) VALUES (" + userId + "," + id + ",'" + uuidv4() + "')";
               db.query(sql);
			   res.redirect("/home/buy")
			   console.log(result)
		    })
		 })
      }
   })
};

//-----------------------------------------------store---------------------------------------------------
exports.store = function(req, res){
	var condition = "";
   if (req.query.text != undefined) {
	   text = req.query.text
	   condition = " WHERE `voice-cat` LIKE '%" + text + "%' OR `voice-album` LIKE '%" + text + "%' OR `voice-owner` LIKE '%" + text + "%' OR `voice-text` LIKE '%" + text + "%'";
   }
   var sql=" SELECT * FROM `voice`" + condition;
   console.log(sql)
   db.query(sql, function(err, result){
	  if (result == undefined) {
		  result = [];
	  }
      res.render('store.ejs',{data:result});
   })
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};

//---------------------------------------upload- img -------------------------------------------------
exports.index = function(req, res){
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
   var fname= post.first_name;
   var lname= post.last_name;
   var mob= post.mob_no;

      if (!req.files)
         return res.status(400).send('No files were uploaded.');

      var file = req.files.uploaded_image;
      var img_name=file.name;

      if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

         file.mv('public/images/upload_images/'+file.name, function(err) {
            if (err)
               return res.status(500).send(err);
            var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";

            var query = db.query(sql, function(err, result) {
               res.redirect('profile/'+result.insertId);
            });
         });
      } else {
         message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
         res.render('register.ejs',{message: message});
      }
};