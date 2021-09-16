const SportCenter = require("../../models/SportCenter");

router.get("/sportCenter/:userId", (req, res) => {
    SportCenter.findOne({ _id: req.params.userId }).then((sportCenter)=>{
        console.log(sportCenter)
    });
});