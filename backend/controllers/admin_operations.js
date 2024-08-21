const food = require('../models/food_schema');
const fs = require('fs');
const path = require('path');

exports.addFood = async (req, res) => {
    // Corrected string interpolation for image filename
    let image_filename = `${req.file.filename}`;
    const new_food = new food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await new_food.save();
        res.status(200).json({
            success: true,
            message: 'Food added successfully'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAllFood = async (req, res) => {
    try {
        const all_food = await food.find({});
        res.status(200).json({
            success: true,
            data: all_food
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.removeFood = async (req, res) => {
    try {
        const foodie = await food.findById(req.body._id);
        if (!foodie) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }

        // Construct the full path to the image
        const imagePath = path.join(__dirname, '../uploads', foodie.image);

        // Delete the image file and then delete the food item from the database
        fs.unlink(imagePath, async (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete image file'
                });
            }

            try {
                await food.findByIdAndDelete(req.body._id);
                res.status(200).json({
                    success: true,
                    message: 'Food deleted successfully'
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Failed to delete food item'
                });
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
