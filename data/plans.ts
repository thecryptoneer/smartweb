type PlanData = {
  price: number;
  currency: string;
  perDay: number;
}

type Plan = {
  baseBillingCycle: number;
  standard: PlanData;
  pro: PlanData;
  expert: PlanData;
}

export const plans: Plan[] = [
  {
    baseBillingCycle: 30,
    standard: {
      price: 2995,
      currency: "USD",
      perDay: 99.95
    },
    pro: {
      price: 4995,
      currency: "USD",
      perDay: 169.95
    },
    expert: {
      price: 7995,
      currency: "USD",
      perDay: 249.95
    }
  },
  {
    baseBillingCycle: 5,
    standard: {
      price: 995,
      currency: "USD",
      perDay: 139
    },
    pro: {
      price: 1595,
      currency: "USD",
      perDay: 239
    },
    expert: {
      price: 2295,
      currency: "USD",
      perDay: 359
    }
  },
  // {
  //   baseBillingCycle: 1,
  //   standard: {
  //     price: 295,
  //     currency: "USD",
  //     perDay: 295
  //   },
  //   pro: {
  //     price: 495,
  //     currency: "USD",
  //     perDay: 495
  //   },
  //   expert: {
  //     price: 745,
  //     currency: "USD",
  //     perDay: 745
  //   }
  // },
  // {
  //   baseBillingCycle: 60,
  //   standard: {
  //     price: 4995,
  //     currency: "USD",
  //     perDay: 83.25
  //   },
  //   pro: {
  //     price: 8495,
  //     currency: "USD",
  //     perDay: 149.92
  //   },
  //   expert: {
  //     price: 11995,
  //     currency: "USD",
  //     perDay: 209.92
  //   }
  // },
  {
    baseBillingCycle: 90,
    standard: {
      price: 8495,
      currency: "USD",
      perDay: 79.94
    },
    pro: {
      price: 12995,
      currency: "USD",
      perDay: 133.28
    },
    expert: {
      price: 19995,
      currency: "USD",
      perDay: 211.06
    }
  }
]