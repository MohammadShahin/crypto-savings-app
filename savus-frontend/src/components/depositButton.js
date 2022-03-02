import { ethers } from "ethers"
import React from "react"
import { ADDRESS, ABI, DECIMALS } from "./../config"

class DepositButton extends React.Component{

    constructor() {
        super()
        this.state = {
            show: false,
            savusBalance: null,
            weiAmount: null,
            goalAmount: null,
            duration: null
        }
        this.getress = this.getress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async getress(){
        // let web3 = new Web3(window.ethereum)
        // window.ethereum.enable().catch(error => {
        //     // User denied account access
        //     console.log(error)
        // })
        // const accounts = await web3.eth.getAccounts()
        // let curAccount = accounts[0];
        // return curAccount;
        return "0x8A14b1e068773bAeB342299576cE4b94e79d5d18"
    }

    async handleClick(_event) {
        if (this.state.show){
            this.setState({
                show: false
            });
            return;
        }
        let curAddress = await this.getress();
        console.log(curAddress)
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            ADDRESS,
            ABI,
            provider
        )
        let savusBalance = await contract.getSavusBalances(curAddress);
        this.setState({
            show: true,
            savusBalance: savusBalance
        });
    }

    async handleSubmit(event){
        event.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            ADDRESS,
            ABI,
            signer
        )
        let numOfWeis = this.state.weiAmount;
        const overrides = {
            value: numOfWeis.toString()
        }
        if (this.state.savusBalance){
            await contract.receive(overrides)
        }
        else{
            await contract.deposit(this.state.goalAmount, this.state.duration, overrides);
        }
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        if (this.state.show){
            return (
                <div>
                    <button onClick={this.handleClick}>
                        Deposit
                    </button>
                        {!this.state.savusBalance ? (
                            <form onSubmit={this.handleSubmit}>
                                <label>Wei Amount
                                <input
                                    type="number"
                                    placeholder="Your wei amount e.g. 10"
                                    name="weiAmount"
                                    value={this.state.weiAmount}
                                    onChange={this.handleChange}
                                />
                                </label>
                                
                                <label>Goal Amount
                                <input
                                    type="number"
                                    placeholder="Your goal's wei amount e.g. 1000"
                                    name="goalAmount"
                                    value={this.state.goalAmount}
                                    onChange={this.handleChange}
                                />
                                </label>

                                <label>Duration
                                <input
                                    type="number"
                                    placeholder="Enter duration in seconds"
                                    name="duration"
                                    value={this.state.duration}
                                    onChange={this.handleChange}
                                />
                                </label>

                                <button type="submit">Submit</button>
                                <hr />
                            </form>

                        ) : (
                            <form onSubmit={this.handleSubmit}>
                                <label> Wei Amount
                                    <input
                                        type="number"
                                        placeholder="Your wei amount e.g. 10"
                                        name="weiAmount"
                                        value={this.state.weiAmount}
                                        onChange={this.handleChange}
                                    />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                </div>
                
            )
        }
        else{
               return <button onClick={this.handleClick}>Deposit</button> 
        }
    }
}

export default DepositButton;