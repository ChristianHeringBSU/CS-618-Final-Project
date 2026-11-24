import {
    listAllRecipes,
    listRecipesByLikeCount,
    listRecipesByTag,
    getRecipeById,
    deleteRecipe,
    likeRecipe,
    updateRecipe,
    createRecipe,
} from "../services/recipes.js";
import { requireAuth } from "../middleware/jwt.js";

export function recipesRoutes(app) {
    app.get("/api/v1/recipes", async (req, res) => {
        const { sortBy, sortOrder, ordering, tag } = req.query;
        const options = { sortBy, sortOrder };
        try {
            if (ordering && tag) {
                return res
                    .status(400)
                    .json({ error: "query by either author or tag, not both" });
            } else if (ordering) {
                return res.json(await listRecipesByLikeCount(ordering));
            } else if (tag) {
                return res.json(await listRecipesByTag(tag, options));
            } else {
                return res.json(await listAllRecipes(options));
            }
        } catch (err) {
            console.error("error listing recipes", err);
            return res.status(500).end();
        }
    });
    app.get("/api/v1/recipes/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const recipe = await getRecipeById(id);
            if (recipe === null) return res.status(404).end();
            return res.json(recipe);
        } catch (err) {
            console.error("error getting recipe", err);
            return res.status(500).end();
        }
    });
    app.post("/api/v1/recipes", requireAuth, async (req, res) => {
        try {
            const recipe = await createRecipe(req.auth.sub, req.body);
            return res.json(recipe);
        } catch (err) {
            console.error("error creating recipe", err);
            return res.status(500).end();
        }
    });
    app.patch("/api/v1/recipes/:id", requireAuth, async (req, res) => {
        try {
            const recipe = await updateRecipe(
                req.auth.sub,
                req.params.id,
                req.body,
            );
            return res.json(recipe);
        } catch (err) {
            console.error("error updating recipe", err);
            return res.status(500).end();
        }
    });
    app.delete("/api/v1/recipes/:id", requireAuth, async (req, res) => {
        try {
            const { deletedCount } = await deleteRecipe(
                req.params.id,
            );
            if (deletedCount === 0) return res.sendStatus(404);
            return res.status(204).end();
        } catch (err) {
            console.error("error deleting recipe", err);
            return res.status(500).end();
        }
    });
    app.post("/api/v1/recipes/:id/like", requireAuth, async (req, res) => {
        try {
            const likedCount = await likeRecipe(req.params.id);
            
            return res.send(likedCount);
        } catch (err) {
            console.error("error liking recipe", err);
            return res.status(500).end();
        }
    })
}
