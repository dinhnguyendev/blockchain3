$(document).ready(function(){
    var currenAccount = "";
    const abi= [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "Danky",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "receiveMoney",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_ban_data",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "send",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "withdrawMoney",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrHocvien",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minter",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Tongtien",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const addressSM="0x189AA92ed7831101A4eadd32556cBc796e89b579";
    checkMN();
    const web3=new Web3(window.ethereum)
    window.ethereum.enable();

    var contract_MN = new web3.eth.Contract(abi,addressSM);


    // tao contract cho Infura
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/0364e8fdbb2f49d5b0bc8e79eb299664");
    var web3_infura =new Web3(provider);
    var contract_infura=web3_infura.eth.Contract(abi,addressSM);
    contract_infura.events.SM_ban_data({filter:{},formBlock:"latest"},function(error,event){
        if(error){
            console.log(error);
        }else{
            console.log("event"); 
            console.log(event); 
        }
    })
    console.log(contract_infura);
    $("#conectMN").click(function(){
        connectMn().then(async function(data){
              currenAccount =await data[0];
            console.log(currenAccount)
        }).catch(function(err){
            console.log(err)
        })
    })
    $("#btnDangKy").click(function(){
        console.log("currenAccount")
        console.log(currenAccount)
        if(currenAccount.length == 0){
            alert("dang nhap metamask")
        }else{
            $.post("./dangky",{
                Email:$("#txtEmail").val(),
                Hoten:$("#txtHoTen").val(),
                SoDT:$("#txtSoDT").val()
            },function(data){
                if(data.ketqua ==1){
                    console.log(data)
                    contract_MN.methods.Danky(data.maloi._id).send({
                        from:currenAccount,
                        //value: 1 ...money
                    });
                }
                
            })


        }
    })
    $("#chuyentien").click(function(){
        console.log("test data");
        console.log($("#numbervalue").val());
        console.log(web3.utils.toWei($("#numbervalue").val(),"ether"));
        contract_MN.methods.receiveMoney().send({
            from:currenAccount,
            value: web3.utils.toWei($("#numbervalue").val(),"ether")
        });
    })
    $("#ruttien").click(function(){
        contract_MN.methods.withdrawMoney().send({
            from:currenAccount,
        });
    })
    async function connectMn(){
        const accounts = await  ethereum.request({ method: 'eth_requestAccounts' });
       
        return accounts
    }

   
})
function checkMN(){
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
      }else{
        console.log('MetaMask is not installed!!!!!!!!');
      }
}