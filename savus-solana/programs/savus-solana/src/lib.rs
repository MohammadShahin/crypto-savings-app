use anchor_lang::prelude::*;

declare_id!("G2GC7QFB5zaoyjmjNVRXoPZeCBG9YzD4BFNuAFmVBUqw");

#[program]
pub mod savus_solana {
    use super::*;

    pub fn create_user_stats(
        ctx: Context<CreateUserStats>
    ) -> Result<()> {
        let user_stats = &mut ctx.accounts.user_stats;
        user_stats.expiration = 0;
        user_stats.goal_amount = 0;
        user_stats.bump = *ctx.bumps.get("user_stats").unwrap();
        Ok(())
    }

    pub fn set_expiration(ctx: Context<SetExpiration>, expiration: u128) -> Result<()> {
        if ctx.accounts.user_stats.expiration != 0 {
            panic!();
        }
        ctx.accounts.user_stats.expiration = expiration;
        Ok(())
    }

    pub fn set_goal_amount(ctx: Context<SetGoalAmount>, goal_amount: u128) -> Result<()> {
        if ctx.accounts.user_stats.goal_amount != 0 {
            panic!();
        }

        ctx.accounts.user_stats.goal_amount = goal_amount;
        Ok(())
    }
}

#[account]
pub struct UserStats {
    expiration: u128,
    goal_amount: u128,
    bump: u8,
}

// validation struct

#[derive(Accounts)]
pub struct CreateUserStats<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // space = 8 discriminator + 16 expiration + 16 goal_amount + 1 bump
    #[account(init, payer = user, space = 41, seeds =[b"user_stats", user.key().as_ref()], bump)]
    pub user_stats: Account<'info, UserStats>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetExpiration<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user_stats", user.key().as_ref()], bump = user_stats.bump)]
    pub user_stats: Account<'info, UserStats>,
}

#[derive(Accounts)]
pub struct SetGoalAmount<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user_stats", user.key().as_ref()], bump = user_stats.bump)]
    pub user_stats: Account<'info, UserStats>,
}
