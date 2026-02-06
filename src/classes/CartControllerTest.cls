@IsTest
private class CartControllerTest {

	@IsTest
	static void testProcessCart() {
		List<CartController.CartItem> items = new List<CartController.CartItem>();

		CartController.CartItem item1 = new CartController.CartItem();
		item1.Id = 'a04d2000002F3KbAAK';
		item1.Name = 'Banana';
		item1.quantity = 2;
		item1.Price = 50.00;
		items.add(item1);

		String accId = '001d200001P0Jf1';
		String accName = 'GenePoint';

		Test.startTest();
		CartController.processCart(items, accId, accName);
		Test.stopTest();

		Purchase__c p = [SELECT Id, Name, ClientId__c FROM Purchase__c LIMIT 1];
		Assert.areEqual('Purchase made by GenePoint', p.Name);
		Assert.areEqual(accId, p.ClientId__c);

		List<PurchaseLine__c> lines = [SELECT Id, Amount__c FROM PurchaseLine__c WHERE PurchaseId__c = :p.Id];
		Assert.areEqual(1, lines.size(), 'Should have created one purchase line');
		Assert.areEqual(2, lines[0].Amount__c);
	}

	@IsTest
	static void testContributeToPurchase() {

		Purchase__c p = new Purchase__c(
				Name = 'Base Purchase',
				TotalItems__c = 10,
				GrandTotal__c = 100.00
		);
		insert p;

		Test.startTest();
		CartController.contributeToPurchase(p.Id, 5, 10.00);
		Test.stopTest();

		Purchase__c updatedP = [SELECT TotalItems__c, GrandTotal__c FROM Purchase__c WHERE Id = :p.Id];
		Assert.areEqual(15, updatedP.TotalItems__c, 'Total items should increment');
		Assert.areEqual(150.00, updatedP.GrandTotal__c, 'Grand total should reflect (5 * 10) addition');
	}
}