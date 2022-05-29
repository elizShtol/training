const { Router } = require("express");
const Training = require("../models/Training");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    // console.log(req.body)
    const {name}=req.body
    const {trainer}=req.body
    const {exercises}=req.body
    const {category}=req.body
    const {description}=req.body
    // console.log(name,trainer,exercises,category,req.user.userId)

    const training = new Training({
      name,
      trainer,
      exercises,
      category,
      description,
      owner: req.user.userId,
    });

    await training.save();

    res.status(201).json({message:"Тренировка создана"});
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.query.category)
    const trainings = req.query.category == null ? await Training.find({ owner: req.user.userId, category: req.query.category }) : await Training.find({ owner: req.user.userId, category: req.query.category });
    res.json(trainings);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    res.json(training);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/:id", auth, async (req, res) => {
  try {
    const training = await Training.updateOne({ name: req.body.name },req.body );
    console.log(req.body)
    res.json(training);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
