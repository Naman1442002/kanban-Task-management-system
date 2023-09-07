const express =require('express');
const connect = require('../model/Connection')
const {task} = require('../model/schema')

const router = express.Router();
router.use(express.json());

router.get('/Task', async (req, res) => {
         await connect();
    try {
      // Fetch all tasks from the database
      const tasks = await task.find({});
  
      // Organize tasks by status (todo, doing, done)
      const organizedTasks = {
        todo: [],
        doing: [],
        done: [],
      };
  
      tasks.forEach((task) => {
        // Assuming each task has a "status" property
        const status = task.status; // You should adjust this based on your data model
        if (organizedTasks[status]) {
          organizedTasks[status].push(task);
        }
      });
  
      res.json(organizedTasks);
      
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  })

router.post( '/create', async(req,res)=>{
    await connect()
    const newtask =  await task(req.body);
    await newtask.save()
    res.status(200).json(newtask);
})

router.put('/update/:id', async (req, res) => {
  try {
    await connect();
    const updatedTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete("/delete/:id",async (req, res)=>{
  try{
    await connect();
    const deletedDoc = await task.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(deletedDoc);
  }
  catch(error){
    res.status(500).json({ error: 'Server error' });
  }
   
})


    exports.Route = router;