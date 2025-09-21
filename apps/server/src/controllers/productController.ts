import { Request, Response } from "express";
import { asyncErrorHandler, httpResponse } from "@workspace/utils";
import { SuccessStatusCodes } from "@workspace/constants";
import { getFirestoreDb } from "../lib/firestore";

const db = getFirestoreDb();

export default {
  createProduct: asyncErrorHandler(async (req: Request, res: Response) => {
    const productData = req.body;
    const docRef = await db.collection('products').add({
      ...productData,
      createdAt: new Date()
    });
    
    httpResponse(req, res, SuccessStatusCodes.CREATED, "Product created successfully", {
      id: docRef.id
    });
  }),

  getProducts: asyncErrorHandler(async (req: Request, res: Response) => {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    httpResponse(req, res, SuccessStatusCodes.OK, "Products retrieved successfully", products);
  }),

  getSellerProducts: asyncErrorHandler(async (req: Request, res: Response) => {
    const { sellerId } = req.params;
    const snapshot = await db.collection('products').where('sellerId', '==', sellerId).get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    httpResponse(req, res, SuccessStatusCodes.OK, "Seller products retrieved successfully", products);
  }),

  updateProduct: asyncErrorHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    
    await db.collection('products').doc(id!).update(updates);
    
    httpResponse(req, res, SuccessStatusCodes.OK, "Product updated successfully");
  }),

  deleteProduct: asyncErrorHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    await db.collection('products').doc(id!).delete();
    
    httpResponse(req, res, SuccessStatusCodes.OK, "Product deleted successfully");
  })
};