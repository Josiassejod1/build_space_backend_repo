const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

const main = async() => {
  console.log("🚀 Starting test...")

  const provider = anchor.Provider.env();
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.Myepicproject;

  const baseAccount = anchor.web3.Keypair.generate()
  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseAccount]
  });

  console.log("📝 Your transaction signature", tx);
  
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('🦸🏽‍♂️ Hero Count', account.totalGifs.toString());

  // Call add_gif!

  await program.rpc.addGif('https://vignette.wikia.nocookie.net/marvelvscapcom/images/b/be/MVC2_Cable.jpg/revision/latest?cb=20110914072054',{
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('🦸🏽‍♂️ Hero Count', account.totalGifs.toString());
  console.log('👀 GIF List', account.gifList);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();