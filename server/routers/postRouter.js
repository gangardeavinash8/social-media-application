
const router=require('express').Router();
const postController=require('../controllers/postController');
const requireUser=require('../middleware/requireUser');



router.get('/all', requireUser ,postController.getAllPostsContrller)//in this line /all execute then middleware will be called  and the getAllPostsContrller will be called  with the help of next functon        

module.exports=router;



