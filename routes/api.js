const router = require('express').Router();
const firebase = require('firebase')

router.get('/',async(req,res)=>{
    try{
        const snapshot = await firebase.default.firestore().collection("todo").get();
        const todos = snapshot.docs.map(doc => {
            data = doc.data()
            data["id"] = doc.id;
            return data;
        });
        res.json({status:false,message:"Successfully",todos})
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Internal server error"});
    }
})

router.get("/:id",async(req,res)=>{
    try 
    {
        const id = req.params.id;
        const snapshot = await firebase.default.firestore().collection("todo").get();
        let todo;
        snapshot.docs.forEach(doc => {
            if(doc.id === id)
            {
                data = doc.data()
                data["id"] = doc.id;
                todo = data;
            }
        });
        if(todo)
            res.json({success:true,message:"Successfully",todo});
        else
            res.status(404).json({success:false,message:"Not found"});
    } 
    catch (error) 
    {
        res.status(500).json({success:false,message:"Internal server failed",error});
    }
})

router.post('/',async(req,res)=>{
    try 
    {
        const {name,status,deadline} = req.body;
        const todo = {
            name,
            status,
            deadline
        }
        const snapshot = await firebase.default.firestore().collection("todo").add(todo);
        res.json({success:true,message:"Successfully",todo});
    } 
    catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
    }
})

router.delete('/:id',async(req,res)=>{
    try 
    {
        const id = req.params.id;
        await firebase.default.firestore().collection("todo").doc(id).delete();
        res.json({success:true,message:"Successfully",id});
    } 
    catch (error) 
    {
        res.status(500).json({success:false,message:"Internal server failed"});
    }
})

router.patch('/:id',async(req,res)=>{
    try 
    {
        const id = req.params.id;
        const {name,status,deadline} = req.body;
        await firebase.default.firestore().collection("todo").doc(id).update({
            name,
            status,
            deadline
        })
        res.json({success:true,message:"Successfully",id});
    } 
    catch (error) 
    {
        res.status(500).json({success:false,message:"Internal server failed"});
    }
})

module.exports = router;