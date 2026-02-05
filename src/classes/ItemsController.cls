public class ItemsController {

	@future(callout=true)
	public static void getFirstThumbnail(Id itemId, String searchTerm) {
		Http h = new Http();
		HttpRequest req = new HttpRequest();
		// I tried to make API call more secure with Named Credential but couldn't do it
		req.setEndpoint('https://api.unsplash.com/search/photos?query=' + searchTerm + '&client_id=6quyStUegacLMNOpn7xTTGJA1RzduRfTkcflmCePp6g');
		req.setMethod('GET');
		HttpResponse res = h.send(req);

		if (res.getStatusCode() == 200) {
			Map<String, Object> root = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
			List<Object> results = (List<Object>) root.get('results');
			if (!results.isEmpty()) {
				Map<String, Object> firstPhoto = (Map<String, Object>) results[0];
				Map<String, Object> urls = (Map<String, Object>) firstPhoto.get('urls');
				String imgUrl =  (String) urls.get('thumb');
				Item__c itemToUpdate = new Item__c(
						Id = itemId,
						Image__c = imgUrl
				);
				update itemToUpdate;
			}
		}
	}

	@AuraEnabled(cacheable=true)
	public static List<Item__c> getAllItems() {
		try {
			return [
					SELECT
							Id,
							Name,
							Description__c,
							Type__c,
							Family__c,
							Image__c
					FROM Item__c
					WITH SECURITY_ENFORCED
					ORDER BY CreatedDate DESC
			];
		} catch (Exception e) {
			throw new AuraHandledException('Error fetching items: ' + e.getMessage());
		}
	}
}