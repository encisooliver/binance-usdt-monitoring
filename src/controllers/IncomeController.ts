import { FastifyReply, FastifyRequest } from 'fastify';
import { IIncomeRequestBody } from '../schemas/IIncomeRequestBody';
import IncomeRepository from '../repositories/IncomeRepository';
// import * as fs from 'fs';

export const readIncomesHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const page = (request.query as { page: number }).page; // Explicitly cast request.query to expected type

    if (!page) {
      return reply.badRequest("Missing page parameter in URI");
    }
  
    const pageSize = (request.query as { pageSize: number }).pageSize; // Explicitly cast request.query to expected type
  
    if (!pageSize) {
      return reply.badRequest("Missing pageSize parameter in URI");
    }

    const targetGenre = await IncomeRepository.getIncomes(Number(page),Number(pageSize));
    return reply.send({ data: targetGenre });
  } catch (error) {
    console.error(
      `readAllGenreHandler: error trying to read Genre: ${error}`
    );
    reply.internalServerError(String(error || 'Unknown error occurred.'));
  }
};

export const createIncomeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as IIncomeRequestBody;

  if (
    !requestBody 
    ||!requestBody.receiver_wallet_address 
    ||!requestBody.particulars 
    ||!requestBody.usdt_amount 
    ||!requestBody.mshl_amount
  ) {
    return reply.badRequest(
      "Invalid request body."
    );
  }

  try {
    const newIncomes = await IncomeRepository.createIncome(requestBody);
    return reply.send({ data: newIncomes });
  } catch (error) {
    console.error(
      `createIncomeHandler: error trying to create Income: ${error}`
    );
    reply.internalServerError(String(error || 'Unknown error occurred.'));
  }
};

export const updateIncomeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as IIncomeRequestBody;

  if (
    !requestBody 
    ||!requestBody.receiver_wallet_address 
    ||!requestBody.particulars 
    ||!requestBody.usdt_amount 
    ||!requestBody.mshl_amount
  ) {
    return reply.badRequest(
      "Invalid request body."
    );
  }

  try {
    const incomes = await IncomeRepository.updateIncome(requestBody);
    return reply.send({ data: incomes });
  } catch (error) {
    console.error(
      `createIncomeHandler: error trying to create Income: ${error}`
    );
    reply.internalServerError(String(error || 'Unknown error occurred.'));
  }
};

export const deleteIncomeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as IIncomeRequestBody;

  if (
    !requestBody 
  ) {
    return reply.badRequest(
      "Invalid request body."
    );
  }

  try {
    const newIncomes = await IncomeRepository.deleteIncome(requestBody.id);
    return reply.send({ data: newIncomes });
  } catch (error) {
    console.error(
      `createIncomeHandler: error trying to create Income: ${error}`
    );
    reply.internalServerError(String(error || 'Unknown error occurred.'));
  }
};


