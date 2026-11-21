/* global use, db */
use("blog-simulated");
db.getCollection("events").aggregate([
    {
        $match: { action: "startView" },
    },
    {
        $group: {
            _id: "$recipe",
            views: { $count: {} },
        },
    },
]);
