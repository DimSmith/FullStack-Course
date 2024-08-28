export class Coin{
    public id:String;
    public symbol:String;
    public rateUsd:String;
    public currencySymbol:String;
    public type:String

    constructor(id:String,symbol:String,rateUsd:String,currencySymbol:String,type:String){
        this.id=id;
        this.symbol=symbol;
        this.rateUsd=rateUsd;
        this.currencySymbol=currencySymbol;
        this.type=type;
    }
}
