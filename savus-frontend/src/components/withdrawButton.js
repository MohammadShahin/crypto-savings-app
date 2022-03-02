import { ethers } from "ethers"
import React from "react"
import { ADDRESS, ABI, DECIMALS } from "./../config"

class WithdrawButton extends React.Component{

    constructor() {
        super()
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(){
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            ADDRESS,
            ABI,
            provider
        )
        await contract.withdrawAll();
    }

    render(){
        return (
            <button onClick={this.handleClick}>Withdraw</button> 
        )
    }

}

export default WithdrawButton;