public class MainPageController {


	@AuraEnabled(cacheable=true)
	public static List<String> getAccountInfo(Id accId) {
		try {
			Account acc = [
					SELECT Name, Industry, AccountNumber
					FROM Account
					WHERE Id = :accId
					WITH SECURITY_ENFORCED
					LIMIT 1
			];
			return new List<String>{
					acc.Name,
					String.valueOf(acc.Industry),
					acc.AccountNumber
					};
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}