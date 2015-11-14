console.log(process.pid) // »ñÈ¡nodeµÄpid
process.on("message",function(m){
    console.log("zi:",m);
})
process.send({message:"hello parent!"})
