trigger ItemTrigger on Item__c (after insert) {
	for (Item__c item : Trigger.new) {
		ItemsController.getFirstThumbnail(item.Id, item.Name);
	}
}