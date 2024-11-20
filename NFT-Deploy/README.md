# Deploying ERC-721 and ERC-1155 Contracts on Metis L2 using Remix

This guide will help you quickly deploy ERC-721 (NFT) and ERC-1155 (Multi-Token) contracts on the Metis Layer 2 network using Remix, an online Solidity IDE. You'll use ready-to-deploy contract templates for ease of use.

---

## What Are ERC-721 and ERC-1155?

- **ERC-721**: A standard for Non-Fungible Tokens (NFTs). Each token is unique, like art pieces or collectibles.
- **ERC-1155**: A flexible standard for multi-tokens. You can manage both fungible (e.g., game currencies) and non-fungible (e.g., weapons) tokens in one contract.

---

## Prerequisites

### Tools You Need:
1. **Metamask** wallet configured for the Metis Andromeda/sepolia network:
2. Basic familiarity with Solidity and Remix.

### Funding Your Wallet:
Ensure your wallet has some Metis tokens to cover gas fees. You can get Metis via exchanges or available faucets.

---

## Steps to Deploy on Remix

### 1. Open Remix
- Go to [Remix IDE](https://remix.ethereum.org).
- Create a new workspace or open an existing one.

### 2. Copy the Contract Code
Go to our Contracts folder above and choose the desired contract:
- **ERC-721 Contract**: ERC721Contract.sol
- **ERC-1155 Contract**: ERC1155Contract.sol

Copy the code and paste it into a new file in Remix:
- For example, create `MyERC721.sol` or `MyERC1155.sol` in Remix and paste the contract code.
![contract code](./images/contractcode.png)

### 3. Compile the Contract
- In Remix, navigate to the **Solidity Compiler** tab.
- Ensure the Solidity version matches the contract (e.g., `0.8.x`).
- Click **Compile MyERC721.sol** or **Compile MyERC1155.sol**.
![compile contract](./images/compile.png)

### 4. Deploy the Contract
- Go to the **Deploy & Run Transactions** tab.
- Choose **Injected Web3** as the environment (connects to your Metamask wallet).
- Ensure Metamask is set to the **Metis Andromeda** network.
- Select the contract (e.g., `MyERC721` or `MyERC1155`) in the dropdown.
- Click **Deploy** and confirm the transaction in Metamask.
![deploy contract](./images/deploy.png)

---

## Customizing Your Contract

Before deploying, you can modify the contract code to fit your needs:
- Change the token name and symbol for ERC-721:
  ```solidity
  constructor() ERC721("MyNFT", "MNFT") {}
- Customize URI handling for ERC-1155:
  ```solidity
  constructor() ERC1155("https://myapi.com/metadata/{id}.json") {}

# Interacting with Your Smart Contract

After deploying your contract, you can interact with its functions using Remix. Below are the steps for managing and troubleshooting your contract.

## Interacting with the Contract

### Deployed Contracts Section
Once your contract is deployed, it will appear in the **Deployed Contracts** section in Remix. You can use the available functions to manage your tokens.

### Key Functions
- **Mint Tokens**  
  - For **ERC-721**: Use the `mint` function to create a new token.  
  - For **ERC-1155**: Use the `mintBatch` function to create multiple tokens at once.

- **Check Ownership**  
  - For **ERC-721**: Call the `ownerOf` function with the token ID to check ownership.  
  - For **ERC-1155**: Call the `balanceOf` function with the owner address and token ID to get the balance.

- **Transfer Tokens**  
  Use the `safeTransferFrom` function to transfer tokens to another address securely.

![Interact functions](./images/functions.png)

---

## Troubleshooting

### Deployment Issues
- Ensure your wallet is connected to the **Metis Andromeda/sepolia** network.
- Verify that you have enough **Metis tokens** in your wallet to cover gas fees.

### Interaction Issues
- Double-check the **deployed address** of your contract in Remix.
- Confirm that the **contract ABI** used for interaction matches the deployed contract.

---

## Additional Notes
Make sure your wallet is correctly configured and always verify transaction details before proceeding.


