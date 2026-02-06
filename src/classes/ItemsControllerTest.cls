@IsTest
private class ItemsControllerTest {

	@IsTest
	static void testGetAllItems() {
		Item__c testItem = new Item__c();
		testItem.Name = 'Banana';
		testItem.Type__c = 'Food';
		testItem.Family__c = 'Best Seller';
		testItem.Description__c = 'A yellow fruit';
		insert testItem;

		Test.startTest();
		List<Item__c> foods = ItemsController.getAllItems('Food', '', '', 0);
		List<Item__c> searchResults = ItemsController.getAllItems('', '', 'Banana', 0);
		Test.stopTest();

		Assert.areEqual(1, foods.size(), 'Should find one Food item');
		Assert.areEqual(1, searchResults.size(), 'Should find item by search term "Banana"');
	}
}