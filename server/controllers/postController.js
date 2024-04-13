const {error,success}=require('../utils/responseWrapper');

const getAllPostsContrller = async (req , res) => {
    console.log(req.id);
//return res.send("theses are all the post");
return res.send(success(201 ,"theses are all the post"));
}

module.exports={ 
    getAllPostsContrller
}