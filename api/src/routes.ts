import express from 'express';
import { Request, Response } from 'express';
import { getTotalAmountUSD, getWithdraws } from './controller';
const router = express.Router();

router.get('/withdraws', async (req: Request, res: Response): Promise<Response> => {
  const withdraws = await getWithdraws();
  return res.status(200).json({
    withdraws,
  });
});

router.post('/totalAmount', async (req: Request, res: Response): Promise<Response> => {
  const walletAddress = req.body.walletAddress;
  const amount = await getTotalAmountUSD(walletAddress);
  return res.status(200).json({
    totalAmount: amount,
  });
});

export default router;
