const router = require('express').Router();
const firebase = require('firebase');

router.get('/',async(req,res)=>{
    try {
        const snapshot = await firebase.default.firestore().collection("todo").get();
        const todos = snapshot.docs.map(doc=>{
            data = doc.data();
            data['id'] = doc.id;
            return data;
        });
        res.render("index",{
            success:true,
            todos
        })   
    } catch (error) {
        res.render("index",{
            success:false,
            todos:[]
        })
    }
})
module.exports = router;