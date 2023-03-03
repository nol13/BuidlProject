import Bundlr from '@bundlr-network/client';

export default function handler(req, res) {

    const data = JSON.parse(req.body);

    const bundlr = new Bundlr(data.node, data.currency, data.jwk);
  
    res.status(200).json({ address: bundlr.address });
    
  }