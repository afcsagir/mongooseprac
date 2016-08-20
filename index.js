/*var mongoose = require('mongoose');
var con = mongoose.createConnection();
var cb = function (err) {
    if (!err)
        console.log(err);
    else
        console.log("Connection Opened");
};
var err = 'Something bad happened, try again!';
var ccb = function (err) {

    if (!err)
        console.log(err);
    else
        console.log("Connection Closed");
}
con.open("mongodb://localhost/tutorialous", cb);
con.close(ccb);
console.log("connection Opened");
console.log(err);
console.log("connection Closed");
console.log(err);*/

////Code for Save the Code////

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var con;
var userSchema=new Schema({
    userid:{type:String,required:true,trim:true,index:true,unique:true},
    chips:{type:Number}
});
var userModel=mongoose.model('users',userSchema);
var alex=new userModel({userid:'Alex',chips:10000,regdate:Date.now});
var mark=new userModel({userid:'Mark',chips:15000,regdate:Date.now});
var Tony=new userModel({userid:'Mark',chips:15000,regdate:Date.now});
var cb=function(err){
    if(!err){
    console.log("Connection Opened\t"+con.readyState);
    }else{
    console.log("Connection Opened Failed");
    }
};
mongoose.connect("mongodb://localhost/tutorialous",cb);
con =mongoose.connection;

var echoRecords=function(err,log){
    console.log("Total Records Found:"+log.length);
    for (var i=0;i<log.length;i++){
        console.log((i+1)+"\t"+log[i]._id+"\t"+log[i].userid+"\t"+log[i].chips);

    }
};
var saveResponse=function(err){
    if(err){
        console.log("save Failed");

    }else{
        console.log("Save Success");
    }
};
alex.save(saveResponse);
mark.save(saveResponse);
/*{
    if(err){
        console.log(err);
    }else{
        console.log("Deocument Save Done")
    }
})*/

userModel.find(echoRecords);
userModel.find({userid:"Alex"},echoRecords);
userModel.find({userid:"Alex"},{_id:0},echoRecords);


userModel.update({userid:"Alex"},{chips:25000},function(err,log){
    console.log("Numbers of Records Effected" +log);
});
userModel.update({chips:{$lt:20000}},{chips:35000},{multi:true},function(err,log){
  console.log("Number of records Effected"+log);
});


userModel.remove({userid:"Mark"})
//Remove All
//userModel.remove()
{
    console.log("User Removed" );
}


//_findOne()
userModel.findOne(
    {
    _id:"57b7e714d9f087901e419c21"},"chips,userid",
    function(err,data){
        if(!err)console.log("Finded"+data);
    }
);

//_findOneand Remove
userModel.findOneAndRemove({_id:"57b7ef12958d51a82a9c330c"}
       ,function(err,data){
         if(!err)
         console.log("The FINDed ONE AND REMOVE IS"+ data);
       }
);

//_findByIdAndUpdate
userModel.findByIdAndRemove("57b7ef6e5c20d9742038a50f",{chips:0},function(err,data){if(!err)console.log("Find And Updated "+ data);});


//_findById()
userModel.findById("57b7e714d9f087901e419c21","chips,userid",
function(err,data){if(!err)console.log("fided By ID "+ data);
});

//_findByID And Remove

userModel.findByIdAndRemove("57b7f093433e67201e545594",
function(err,data){
    if(!err) console.log("Find by Id and Remove:"+data)
});

//Find By Id And Updated

userModel.findByIdAndUpdate("57b7f093433e67201e545594",{chips:0},function(err,data){if(!err) console.log("Find And Update:"+data);});

///Count   

userModel.count({},function(err,count){
    console.log("No of Records in Users Schema :"+ count);


});

//Find the Number s of Documents in Users
userModel.count({chips:{$lte:25000}},function(err,count){
    console.log("chips <=25000  :"  +count);
});

///_where()
var echo=function(err,log){
    if(!err){
        console.log("The  Where log Is "+ log);
    }
}


//userModel.where('chips').lt(3500).exec(echo);


userModel.where('chips').lt(10000)
.where('country').eq('USA').exec(echo);
