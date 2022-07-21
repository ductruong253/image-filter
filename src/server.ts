import { ExecException } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalSingleFile, isUrlValid } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  app.get("/filteredimage", async (req, res) => {
    // IT SHOULD
    //    1. validate the image_url query
    let url = (req.query as any).image_url;
    if (!isUrlValid(url)) return res.status(400).send("URL is missing or invalid");
    //Returning file
    try {
      //    2. call filterImageFromURL(image_url) to filter the image
      const processedImagePath = await filterImageFromURL(url);
      //    3. send the resulting file in the response
      res.sendFile(processedImagePath, () => {
        //    4. deletes any files on the server on finish of the response
        deleteLocalSingleFile(processedImagePath);
      })
    }
    catch (e: any) {
      console.log("Error occured while processing image")
      return res.status(500).send({
        "message": "Error occured while processing image"
      })
    }


    console.log("Ending process...")
    return res;
  })




  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

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
})();