trigger PurchaseLineTrigger on PurchaseLine__c (after insert) {
	for(PurchaseLine__c p : Trigger.new){
		CartController.contributeToPurchase((String)p.PurchaseId__c, p.Amount__c, p.UnitCost__c);
	}
}