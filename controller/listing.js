const listing = require("../models/listing");

module.exports.index = (async (req, res) => {
  const alllisting = await listing.find({});

  const { category } = req.query; // read category from URL query

    let allListings;

    if (category) {
        // show listings from the selected category only
        allListings = await listing.find({ category });
    } else {
        // show all listings if no category is selected
        allListings = await listing.find({});
    }
  res.render("listings/index.ejs", { allListings ,category });
});

module.exports.rdenderNewForm = (req, res) => {
   res.render("listings/new.ejs");

};





module.exports.showlisting = (async (req, res) => {
  const { id } = req.params;
  const Listing = await listing.findById(id)
  .populate({path: "reviews",
    populate: { 
      path: "author",
    },
  })
  .populate("owner"); 
  // if (!Listing) throw new ExpressErr(404, "Listing not found");
  if( !Listing){
    req.flash(error," Listing you requested for does not exist");
    res.redirect("/listings");
  }
  console.log(Listing);
  res.render("listings/show.ejs", { Listing });
});

module.exports.createNewListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  await newListing.save();
  req.flash("success", " New Listing Created ");
  res.redirect("/listings");

};

module.exports.editListing = async (req, res) => {
  
  let { id } = req.params;
  const Listing = await listing.findById(id);
   if( !Listing){
    req.flash(error," Listing you requested for does not exist");
    res.redirect("/listings");
  }

  let originalImage = Listing.image.url;
   originalImage= originalImage.replace("/upload" , "/upload/h_300,w_400");
  res.render("listings/edit.ejs", { Listing ,originalImage});
};

module.exports.updateListing = async (req, res) => {
  
  let { id } = req.params;
  let Listing = await listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = {url, filename};
    await Listing.save();
  }
   req.flash("success", " New Listing Updated ");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletelisting = await listing.findByIdAndDelete(id);
  console.log(deletelisting);
   req.flash("success", "Listing Deleted ");
  res.redirect("/listings");
};