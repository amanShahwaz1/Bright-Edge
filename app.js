const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const { pid } = require("process");
const { truncate } = require("lodash");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs')

// database connections
mongoose.connect("mongodb://localhost:27017/BrighEdge");


// Schema's
const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    faculty:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true
    }
});

const Course = new mongoose.model('course',courseSchema);

const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Student = new mongoose.model('student',studentSchema);

const facultySchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Faculty = new mongoose.model('faculty',facultySchema);

const managementSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Management = new mongoose.model('management',managementSchema);

const contentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})

const Content = new mongoose.model('content',contentSchema);


// done with the schema's 





// routes  


app.get('/',function(req,res){
    Course.find(
        {},
        function(err,courses){
            if(!err){
                res.render('mainlogin',{
                    courses:courses
                })
            }
        }
        )
})

// courses routes

app.get('/shome',function(req,res){
    Course.find(
        {},
        function(err,courses){
            if(!err){
                res.render('shome',{
                    courses:courses
                })
            }
        }
        )
})


app.get('/courses',function(req,res){
    Course.find(
        {},
        function(err,courses){
            if(!err){
                res.render('courses',{
                    courses:courses
                })
            }
        }
        )
})


app.get('/fcourses',function(req,res){
    Course.find(
        {},
        function(err,courses){
            if(!err){
                res.render('fcourses',{
                    courses:courses
                })
            }
        }
        )
})










// management routes
app.get('/management',function(req,res){
    Course.find(
        {},
        function(err,courses){
            if(!err){
                res.render('management',{
                    courses:courses
                })
            }
        }
        )
})





// addcourse routes
app.get('/addcourse',function(req,res){
    res.render('addcourse')
})

app.post('/addcourse',function(req,res){
    const course = new Course ({
        name:req.body.name,
        faculty:req.body.faculty,
        code:req.body.code
    })

    course.save(function(err){
        if(!err){
            res.redirect('/courses')
            console.log("Successfully added");
        }
        else{
            console.log("Some error");
        }
    })
})





// update course routes
app.get('/updatecourse',function(req,res){
    Course.find(
        {},
        function(err,courses){
            if(!err){
                res.render('updatecourse',{
                    courses:courses
                })
            }
        }
        )
})

app.post('/updatecourse',function(req,res){
    const getupdatecode = req.body.updatecode;
    Course.find({code:getupdatecode},function(err,course){
        // need to work here
    })
})




// delete course routes
app.get('/deletecourse',function(req,res){
    Course.find(
        {},
        function(err,courses){
            if(!err){
                res.render('deletecourse',{
                    courses:courses
                })
            }
        }
        )
})

app.post('/deletecourse',function(req,res){
    const deleteString = 'delete course';
    const getdeletecode = req.body.deletecode;
    const getdeletestring = req.body.deletestring;
    console.log(req.body.deletecode);

    if(deleteString === getdeletestring){
        Course.findOneAndDelete({code:getdeletecode},function(err){
        res.redirect('courses');            
        })
    }
})


// add content routes
app.get("/addcontent/:id",function(req, res){
    const getid = req.params.id;
    console.log(getid);
    res.render("addcontent",{
        getid:getid
    })
})
app.post("/addcontent/:pid",function(req,res){
    const postid = req.params.pid;
    console.log(postid);
    const content = new Content({
        title:req.body.title,
        body:req.body.editor1,
        code:postid
    })
    content.save(function(err){
        if(!err){
            res.redirect('courses');
        }
        else{
            res.send(err);
            console.log(err);
        }
    })
})

app.get("/index/:iid",function(req, res){
    const iid = req.params.iid;
    Content.find({code:iid},function(err,contents){
        if(!err){
            res.render('index',{
                contents:contents
            })
        }
    })
})
app.get("/sindex/:iid",function(req, res){
    const iid = req.params.iid;
    Content.find({code:iid},function(err,contents){
        if(!err){
            res.render('sindex',{
                contents:contents
            })
        }
    })
})

app.get("/page/:contentid",function(req,res){
    const cid = req.params.contentid;
    Content.find({_id:cid},function(err,content){
        console.log(content);
        if(!err){
            console.log("match found")
            res.render('page',{
                content:content
            })
        }
    })
})



app.get("/mainlogin",function(req,res){
    res.render('mainlogin');
})


app.get("/studentlogin",function(req,res){
    res.render('studentlogin');
})


app.get("/facultylogin",function(req,res){
    res.render('facultylogin');
})


app.get("/managementlogin",function(req,res){
    res.render('managementlogin');
})


app.get("/addstudent",function(req,res){
    res.render('addstudent');
})

app.get("/addfaculty",function(req,res){
    res.render('addfaculty');
})

app.post("/addstudent",function(req,res){


    const student = new Student ({
        email:req.body.sname,
        password:req.body.spass
    })

    student.save(function(err){
        if(!err){
            res.redirect('/management')
            console.log("Successfully added");
        }
        else{
            console.log("Some error");
        }
    })
    
})


app.get("/addmanagement",function(req,res){
    res.render('addmanagement');
})

app.post("/addmanagement",function(req,res){


    const management = new Management ({
        email:req.body.mname,
        password:req.body.mpass
    })

    management.save(function(err){
        if(!err){
            res.redirect('/management')
            console.log("Successfully added");
        }
        else{
            console.log("Some error");
        }
    })
    
})

app.post("/addfaculty",function(req,res){


    const faculty = new Faculty ({
        email:req.body.fname,
        password:req.body.fpass
    })
    console.log(req.body.fname)
    console.log(req.body.fpass)

    faculty.save(function(err){ 
        if(!err){
            res.redirect('/management')
            console.log("Successfully added");
        }
        else{
            console.log(err);
        }
    })
    
})


app.post("/studentlogin",function(req,res){
    const emailid = req.body.email;
    const upass = req.body.pass;

    Student.findOne({email:emailid},function(err, foundusr){
        if(err){
            console.log(err);
        }
        else{
           if(foundusr) {
               if(foundusr.password === upass){
                    res.redirect("/shome");
               }
           }
        }
    })
})



app.post("/facultylogin",function(req,res){
    const emailid = req.body.email;
    const upass = req.body.pass;

    Faculty.findOne({email:emailid},function(err, foundusr){
        if(err){
            console.log(err);
        }
        else{
           if(foundusr) {
               if(foundusr.password === upass){
                    res.redirect("/fcourses");
               }
           }
        }
    })
})


app.post("/managementlogin",function(req,res){
    const emailid = req.body.email;
    const upass = req.body.pass;

    Management.findOne({email:emailid},function(err, foundusr){
        if(err){
            console.log(err);
        }
        else{
           if(foundusr) {
               if(foundusr.password === upass){
                    res.redirect("/");
               }
           }
        }
    })
})

app.listen('3000',function(){
    console.log('Server is active on port 3000');
})