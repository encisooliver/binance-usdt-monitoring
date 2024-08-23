import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  readIncomesHandler,
  createIncomeHandler,
  updateIncomeHandler,
  deleteIncomeHandler
} from '../../controllers/IncomeController';
// import NodeCache = require('node-cache');

// const cache = new NodeCache({ stdTTL: 10 });

require('fastify')({
  bodyLimit: 10 * 1024 * 1024, // 10MB limit
});

const income: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {

  fastify.get<{
    Querystring: FastifyRequest;
    Reply: FastifyReply;
  }>(
    '/', 
    // { onRequest: [fastify.authenticate] }, 
    readIncomesHandler
  );

  fastify.post<{
    Querystring: FastifyRequest;
    Reply: FastifyReply;
  }>(
    '/',
    // { onRequest: [fastify.authenticate] },
    createIncomeHandler
  );

  fastify.put<{
    Querystring: FastifyRequest;
    Reply: FastifyReply;
  }>(
    '/:id', 
    // { onRequest: [fastify.authenticate] }, 
    updateIncomeHandler
  );

  fastify.delete<{
    Querystring: FastifyRequest;
    Reply: FastifyReply;
  }>(
    '/:id', 
    // { onRequest: [fastify.authenticate] }, 
    deleteIncomeHandler
  );
};

export default income;
