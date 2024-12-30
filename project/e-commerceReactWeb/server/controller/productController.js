const products = require('../db/models/product');
const { success_function, error_function } = require('../utils/response-handler');
const { fileUpload } = require('../utils/fileUpload');

exports.addProduct = async function (req, res) {
    try {
        const {
            title,
            description,
            category,
            price,
            stock,
            image: base64Image,
            ...rest
        } = req.body;

        if (!title || !price || !category || !stock || !description) {
            return res.status(400).send(error_function({
                statusCode: 400,
                message: "Title, price, category, description  and stock are required"
            }));
        }

        let image = null;
        if (base64Image) {
            try {
                image = await fileUpload(base64Image, 'products');
            } catch (uploadError) {
                return res.status(500).send(error_function({
                    statusCode: 500,
                    message: "Error uploading image: " + uploadError.message,
                }));
            }
        }

        const newProduct = await products.create({
            title,
            description,
            category,
            price,
            stock,
            image,
            ...rest
        });

        return res.status(201).send(success_function({
            statusCode: 201,
            message: "Product added successfully",
            data: newProduct,
        }));

    } catch (error) {
        console.error("Error:", error);
        return res.status(400).send(error_function({
            statusCode: 400,
            message: error.message || "Something went wrong",
        }));
    }
}

exports.getProduct = async function (req, res) {
    try {
        const productData = await products.find();
        console.log("Product data:", productData);

        return res.status(200).send(success_function({
            statusCode: 200,
            data: productData,
            message: "Products fetched successfully",
        }));

    } catch (error) {
        console.error("Error:", error);
        return res.status(400).send(error_function({
            statusCode: 400,
            message: error.message || "Something went wrong",
        }));
    }
}


exports.OtherProducts = async (req, res) => {
  try {
    const { sellerId } = req.query; 
    const products = await products.find({ seller: { $ne: sellerId } }).populate('seller');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const { sellerId } = req.query;
    const products = await products.find({ seller: sellerId }).populate('seller');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
