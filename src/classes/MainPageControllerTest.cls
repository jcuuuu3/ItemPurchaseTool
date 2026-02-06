@IsTest
private class MainPageControllerTest {

	@IsTest
	static void testGetAccountInfoSuccess() {
		Account testAcc = new Account(
				Name = 'Tech Corp',
				Industry = 'Technology',
				AccountNumber = 'ABC-123'
		);
		insert testAcc;

		Test.startTest();
		List<String> results = MainPageController.getAccountInfo(testAcc.Id);
		Test.stopTest();

		Assert.isNotNull(results, 'The result list should not be null');
		Assert.areEqual(3, results.size(), 'List should contain exactly 3 elements');

		Assert.areEqual('Tech Corp', results[0]);
		Assert.areEqual('Technology', results[1]);
		Assert.areEqual('ABC-123', results[2]);
	}
}