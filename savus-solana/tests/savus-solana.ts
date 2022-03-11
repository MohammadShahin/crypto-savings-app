import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { SavusSolana } from '../target/types/savus_solana';
import { expect } from 'chai';
const BN = require('bn.js');


describe('savus-solana', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SavusSolana as Program<SavusSolana>;

  it('Creates user stats', async () => {
    const [userStatsPDA, _] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("user_stats"),
        anchor.getProvider().wallet.publicKey.toBuffer()
      ],
      program.programId
    )

    await program.rpc.createUserStats({
      accounts: {
        user: anchor.getProvider().wallet.publicKey,
        userStats: userStatsPDA,
        systemProgram: SystemProgram.programId
      }
    })

    expect((await program.account.userStats.fetch(userStatsPDA)).expiration).to.equal(new BN(0));
  });
});
