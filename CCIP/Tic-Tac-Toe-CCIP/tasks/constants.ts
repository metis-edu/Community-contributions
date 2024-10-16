export type AddressMap = { [blockchain: string]: string };
export type TokenAmounts = { token: string; amount: string };

export enum PayFeesIn {
  Native,
  LINK,
}

export const supportedNetworks = [
  `ethereumSepolia`,
  `metisSepolia`,
  `arbitrumSepolia`,
];

export const LINK_ADDRESSES: AddressMap = {
  [`ethereumSepolia`]: `0x779877A7B0D9E8603169DdbD7836e478b4624789`,
  [`metisSepolia`]: `0x9870D6a0e05F867EAAe696e106741843F7fD116D`,
  [`arbitrumSepolia`]: `0xb1D4538B4571d411F07960EF2838Ce337FE1E80E`,
};

export const routerConfig = {
  ethereumSepolia: {
    address: `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59`,
    chainSelector: `16015286601757825753`,
    feeTokens: [
      LINK_ADDRESSES[`ethereumSepolia`],
      `0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534`,
    ],
  },
  metisSepolia: {
    address: `0xaCdaBa07ECad81dc634458b98673931DD9d3Bc14`,
    chainSelector: `3777822886988675105`,
    feeTokens: [
      LINK_ADDRESSES[`metisSepolia`],
      `0x5c48e07062aC4E2Cf4b9A768a711Aef18e8fbdA0`,
    ],
  },
  arbitrumSepolia: {
    address: `0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165`,
    chainSelector: `3478487238524512106`,
    feeTokens: [
      LINK_ADDRESSES[`arbitrumSepolia`],
      `0xE591bf0A0CF924A0674d7792db046B23CEbF5f34`,
    ],
  },
};
