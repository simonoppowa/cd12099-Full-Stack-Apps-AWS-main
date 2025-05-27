import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';


// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

app.get("/filteredimage", async (req, res) => {
    const imageUrl = req.query.image_url;

    if (!imageUrl) {
        return res.status(400).send("No parameter image_url provided");
    }

    try {
        // Filter the image from the provided URL
        const filteredPath = await filterImageFromURL(imageUrl);

        // Return the filtered image file
        res.status(200).sendFile(filteredPath, () => {
            // Delete the local file
            deleteLocalFiles([filteredPath]);
        });

    } catch (error) {
        console.log(`Error filtering image: ${error}`);
        return res.status(500).send("Internal Server Error");
    }
});


app.get(" /filteredimage?image_url={{URL}}", async (req, res) => {
        res.send("Test")
    }
);


//! END @TODO1

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
});


// Start the Server
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
});
