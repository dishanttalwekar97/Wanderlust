const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync.js");
const listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validatelisting} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
      .get(wrapAsync(listingController.index))
      .post(isLoggedIn,
            upload.single('listing[image]'),
            validatelisting,
       wrapAsync(listingController.createNewListing));
     



//new rout
router.get("/new", isLoggedIn,listingController.rdenderNewForm); 

//search
router.get("/search", wrapAsync(async (req, res) => {
  const query = req.query.query?.trim();
  if (!query) {
    return res.redirect("/listings");
  }

  const listings = await listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } },
    ],
  });

  res.render("listings/index", {
    allListings: listings,
    searchQuery: query,
    category: null,
   message: listings.length === 0 ? `No results found for "${query}".` : null,
  });
}));







//sow rout
router
     .route("/:id")
     .get( wrapAsync(listingController.showlisting) )
     .put(isLoggedIn,
      isOwner, 
      upload.single('listing[image]'),
      validatelisting, 
      wrapAsync(listingController.updateListing))
     .delete( isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));






//edit rout
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.editListing));




module.exports = router;
