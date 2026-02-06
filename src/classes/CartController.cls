public with sharing class CartController {

	public class CartItem {
		@AuraEnabled public String Name {get;set;}
		@AuraEnabled public String Id {get;set;}
		@AuraEnabled public Integer quantity {get;set;}
		@AuraEnabled public Decimal Price {get;set;}
	}

	@AuraEnabled
	public static void processCart(List<CartItem> items, String accountId, String accountName){
		Purchase__c purchase = new Purchase__c();
		purchase.Name = 'Purchase made by ' + accountName;
		purchase.ClientId__c = accountId;
		purchase.GrandTotal__c = 0;
		purchase.TotalItems__c = 0;
		insert purchase;

		for(CartItem item : items){
			PurchaseLine__c purchaseLine = new PurchaseLine__c();
			purchaseLine.ItemId__c = item.Id;
			purchaseLine.PurchaseId__c = purchase.Id;
			purchaseLine.Amount__c = item.quantity;
			purchaseLine.UnitCost__c = item.Price;
			insert purchaseLine;
		}
	}

	@AuraEnabled
	public static void contributeToPurchase(String purchaseId, Decimal amount, Decimal unitCost){
		Purchase__c purchase = [SELECT Id, TotalItems__c, GrandTotal__c
								FROM Purchase__c
								WHERE Id = :purchaseId
								WITH SECURITY_ENFORCED
								LIMIT 1
		];
		purchase.TotalItems__c += amount;
		purchase.GrandTotal__c += (amount * unitCost);
		update purchase;
	}
}