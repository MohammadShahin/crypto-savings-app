import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SavusSolana } from '../target/types/savus_solana';

describe('savus-solana', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SavusSolana as Program<SavusSolana>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
