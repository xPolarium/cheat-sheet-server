import { Request, Response, Router } from "express";

import { prisma } from "../../utils/prisma";
import { authorizeToken } from "../../middleware/authorizeToken";
import { pageSchema } from "../../utils/schemas";

export const pagesRouter = Router();

// Get all pages for :userId
pagesRouter.get(
	"/pages/:userId",
	authorizeToken,
	async (req: Request, res: Response) => {
		try {
			const userId = parseInt(req.params.userId, 10);

			if (req.user.id !== userId) throw new Error("User not authorized.");

			const pages = await prisma.page.findMany({
				where: {
					userId,
				},
			});

			if (!pages)
				throw new Error(
					`Could not find that user's page list: User - ${userId}`
				);

			res.status(200).json({
				message: "Found that user's saved pages!",
				count: pages.length,
				pages,
			});
		} catch (error) {
			res.status(404).json(error);
		}
	}
);

// Get one :pageId for :userId
pagesRouter.get(
	"/pages/:userId/:pageId",
	authorizeToken,
	async (req: Request, res: Response) => {
		try {
			const userId = parseInt(req.params.userId, 10);
			const pageId = parseInt(req.params.pageId, 10);

			if (req.user.id !== userId) throw new Error("User not authorized.");

			const page = await prisma.page.findFirst({
				where: {
					userId,
					id: pageId,
				},
			});

			if (!page)
				throw new Error(
					`Could not find the page for that user: User - ${userId}`
				);

			res.status(200).json({
				message: "Found that user's saved page!",
				page,
			});
		} catch (error) {
			res.status(404).json(error);
		}
	}
);

// Create one page for :userId
pagesRouter.post(
	"/pages/:userId",
	authorizeToken,
	async (req: Request, res: Response) => {
		try {
			const { title } = pageSchema.parse(req.body);
			const userId = parseInt(req.params.userId, 10);

			if (req.user.id !== userId) throw new Error("User not authorized.");

			const page = await prisma.page.create({
				data: {
					userId,
					title,
				},
			});

			if (!page)
				throw new Error(
					`Could not find the page for that user: User - ${userId}`
				);

			res.status(200).json({
				message: `Created a new page for that user: User - ${userId}`,
				page,
			});
		} catch (error) {
			res.status(404).json(error);
		}
	}
);

// Update one :pageId for :userId
pagesRouter.put(
	"/pages/:userId/:pageId",
	authorizeToken,
	async (req: Request, res: Response) => {
		try {
			const { title } = pageSchema.parse(req.body);
			const userId = parseInt(req.params.userId, 10);
			const pageId = parseInt(req.params.pageId, 10);

			if (req.user.id !== userId) throw new Error("User not authorized.");

			const page = await prisma.page.updateMany({
				where: { id: pageId, userId },
				data: {
					title,
				},
			});

			if (!page)
				throw new Error(
					`Could not find the page for that user: User - ${userId}`
				);

			res.status(200).json({
				message: `Updated the page for that user: User - ${userId}`,
				page,
			});
		} catch (error) {
			res.status(404).json(error);
		}
	}
);

// Delete on :pageId for :userId
pagesRouter.delete(
	"/pages/:userId/:pageId",
	authorizeToken,
	async (req: Request, res: Response) => {
		try {
			const { title } = pageSchema.parse(req.body);
			const userId = parseInt(req.params.userId, 10);
			const pageId = parseInt(req.params.pageId, 10);

			if (req.user.id !== userId) throw new Error("User not authorized.");

			const deletedPage = await prisma.page.delete({
				where: {
					id: pageId,
				},
			});

			if (!deletedPage)
				throw new Error(
					`Could not find the page for that user: User - ${userId}`
				);

			res.status(200).json({
				message: `Deleted the page for that user: User - ${userId}`,
			});
		} catch (error) {
			res.status(404).json(error);
		}
	}
);
