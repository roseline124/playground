import { delay, flat } from 'fxjs';
import { lazyRange, lazyMap, take } from '../lazy';
import go from '../utils/go';
// @ts-ignore
import { each, takeUntil } from 'fxjs/Strict';

interface Statement {
  impId: number;
  orderId: number;
  amount: number;
}

interface Import {
  payments: {
    [key: number]: Statement[];
  };
  getPayments: any;
  cancelPayment: (impId: number) => Promise<any>;
}

const Impt: Import = {
  payments: {
    1: [
      { impId: 11, orderId: 1, amount: 15000 },
      { impId: 12, orderId: 2, amount: 30000 },
      { impId: 13, orderId: 3, amount: 5000 },
    ],
    2: [
      { impId: 14, orderId: 4, amount: 20000 },
      { impId: 15, orderId: 5, amount: 10000 },
      { impId: 16, orderId: 6, amount: 30000 },
    ],
    3: [
      { impId: 17, orderId: 7, amount: 45000 },
      { impId: 18, orderId: 8, amount: 30000 },
    ],
    4: [],
  },
  getPayments: (page: number) => {
    console.log(`https://..?page=${page}`);
    return delay(500, Impt.payments[page]);
  },
  cancelPayment: (imptId: number) => Promise.resolve(`${imptId}: 취소완료`),
};

const DB = {
  getOrders: () => delay(100, [{ id: 1 }, { id: 3 }, { id: 7 }]),
};

async function job() {
  const payments = await go(
    lazyRange(1, Infinity),
    lazyMap(Impt.getPayments),
    // @ts-ignore
    takeUntil(({ length }) => length < 3)
  );

  console.log(payments);
}

job();
