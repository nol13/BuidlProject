import Bundlr from '@bundlr-network/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const data = JSON.parse(req.body);

    const bundlr = new Bundlr(data.node, data.currency, data.jwk);
  
    res.status(200).json({ address: bundlr.address });
    
  }