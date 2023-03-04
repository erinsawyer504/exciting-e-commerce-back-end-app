const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // includes its associated Products
  try{
    const dbCategoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ],
    });

    res.json(dbCategoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // finds one category by its `id` value
  // includes its associated Products
  try{
    const dbCategoryData = await Category.findOne({
      where: {
        id: req.params.id
      },

      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ],
    });
    if (!dbCategoryData){
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creates a new category
  try{
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name
    });

    res.json(dbCategoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a category by its `id` value
  try{
    const dbCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },

    });
    if (!dbCategoryData[0]){
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.status(200).json(dbCategoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // deletes a category by its `id` value
  try{
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      },

    });
    if (dbCategoryData === 0){
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
