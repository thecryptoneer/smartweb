export type PlanData = {
  price: number;
  currency: string;
  paymentLink?: string;
}

export type Plan = {
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
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/7sIaERchtdV4dZm3cf"
    },
    pro: {
      price: 4795,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/14k7sF5T59EOcViaEI"
    },
    expert: {
      price: 7495,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/28o00depBdV49J6bIN"
    }
  },
  {
    baseBillingCycle: 5,
    standard: {
      price: 995,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/7sIeV7epB18i7AYaEE"
    },
    pro: {
      price: 1595,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/cN29ANcht5oy7AY6op"
    },
    expert: {
      price: 2495,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/4gwbIV81d7wGdZm4gi"
    }
  },
  {
    baseBillingCycle: 90,
    standard: {
      price: 7995,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/28ofZbepB3gq1cAdQW"
    },
    pro: {
      price: 12795,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/dR65kx2GTeZ808wbIP"
    },
    expert: {
      price: 19995,
      currency: "EUR",
      paymentLink: "https://buy.stripe.com/00g4gt5T5bMWcVidQY"
    }
  }
]