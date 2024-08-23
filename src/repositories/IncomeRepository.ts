import prisma from '../db';
import {
  IIncomeRequestBody,
} from '../schemas/IIncomeRequestBody';
import { PrismaClient } from "@prisma/client";
import extension from "prisma-paginate";

export default class IncomeRepository {

  static getIncomes = async (page:number,pageSize:number) => {

    const prisma = new PrismaClient();
    const xprisma = prisma.$extends(extension);

    return xprisma.incomes
    .paginate(
      {
        orderBy:{
          id: 'desc'
        }
      },
      { 
        limit: pageSize, 
        page: page 
      })
    .then((data:any) => {
      return data
    });
  };

  static createIncome = async (
    IncomeData: IIncomeRequestBody
  ) => {
    try {
      const createdIncome = await prisma.incomes.create({
        data: {
          receiver_wallet_address: IncomeData.receiver_wallet_address,
          particulars: IncomeData.particulars,
          usdt_amount: IncomeData.usdt_amount,
          mshl_amount: IncomeData.mshl_amount,
        },
      });
  
      return createdIncome;
    } catch (error) {
      throw String(error || 'Unknown error occurred.');
    }
  };

  static getIncomeById = async (id: number) => {
      const targetIncome = await prisma.incomes.findFirst({
        where: {
          id: id,
        },
      });
  
      return targetIncome;
  };
  
  static updateIncome = async (
    data: IIncomeRequestBody
  ) => {
    try {
      const updateIncome = await prisma.incomes.update({
        where: {
          id: data.id,
        },
        data: {
          receiver_wallet_address: data.receiver_wallet_address,
          particulars: data.particulars,
          usdt_amount: data.usdt_amount,
          mshl_amount: data.mshl_amount,
        },
      });
      
      return updateIncome;
    } catch (error) {
      throw String(error || 'Unknown error occurred.');
    }
  };
  

  static deleteIncome = async (id: number) => {
      try {
        const deletedIncome = await prisma.incomes.delete({
          where: {
            id: id,
          },
        });
        return deletedIncome;
      } catch (error) {
        throw String(error || 'Unknown error occurred.');
      }
  };
}