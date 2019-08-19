//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `admin` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.adminId = results[0].id;
            req.session.admin = results[0];
            console.log(results[0].id);
            res.redirect('/admin/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('adminlogin.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('adminlogin.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var admin =  req.session.user,
   userId = req.session.adminId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `admin` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('admindashboard.ejs', {data:results});
	   
   });       
};
//-----------------------------------------------report----------------------------------------------
           
exports.report = function(req, res){
	var condition = "";
   var sql=" SELECT * FROM `users` , `purchased` , `voice` WHERE users.id = purchased.uid AND voice.id = purchased.vid ";
   console.log(sql)
   db.query(sql, function(err, result){
	  if (result == undefined) {
        result = [];
        console.log(result)
	  }
      res.render('report.ejs',{data:result});
   })
};
//-----------------------------------------------store----------------------------------------------
           
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
      res.render('storeadmin.ejs',{data:result});
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
      res.render('adminprofile.ejs',{data:result});
   });
};


/**
 * let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);
 */
//----------------------------upload file ------------------------------
   exports.upload = function(req, res){
      message = '';
      if(req.method == "POST"){
         var post  = req.body;
         var owner= post['owner'];
         var cat= post['cat'];
         var album= post['album'];
		 var price = post['price'];
         var text= post['text'];
         let voiceFile = req.files.voice_file;
         let imgFile = req.files.img_file;
         voiceFile.mv('./public/voice/' + voiceFile.name);
         imgFile.mv('./public/images/voise_images/' + imgFile.name);
         name = encodeURIComponent(voiceFile.name)
         img = encodeURIComponent(imgFile.name)
         var query = db.query("INSERT INTO `voice`(`voice-name`,`voice-owner`,`voice-cat`,`voice-album`,`voice-text`, `voice-img`, price) VALUES ('" + name +"' ,'"+ owner +"' , '"+ cat +"' ,' "+ album +"' , '"+ text +"' , '"+ img +"', " + price + ")"
              , function(err, result) {
           console.log(err)
            message = "Succesfully! Your account has been created.";
            res.render('upload.ejs',{message: message});
         });
   
      } else {
         res.render('upload');
      }
   };