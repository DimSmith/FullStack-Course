export class Exchange{
    public id:String;
    public name:String;
    public rank:String;
    public percentTotalVolume:String;
    public volumeUsd:String;
    public tradingPairs:String
    public exchangeUrl:String

    constructor(id:String,name:String,rank:String,percentTotalVolume:String,volumeUsd:String,tradingPairs:String,exchangeUrl:String){
        this.id=id;
        this.name=name;
        this.rank=rank;
        this.percentTotalVolume=percentTotalVolume;
        this.volumeUsd=volumeUsd;
        this.tradingPairs=tradingPairs;
        this.exchangeUrl=exchangeUrl;
    }
}
