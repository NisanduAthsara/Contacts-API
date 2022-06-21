exports.verficationData = (mobile,name)=>{
    return new Promise((resolve, reject) =>{
        if(!name || typeof name !== "string"){
            reject("Invalid Name");
        }
        if(name.length < 5){
            reject("Name must be contains at least 10 characters");
        }
        if(!mobile || typeof mobile !== "string"){
            reject("Invalid Mobile Number");
        }
        if (mobile.length < 10) {
			reject("Mobile number must be contains at least 10 characters");
		}

		resolve(true);
    })
}