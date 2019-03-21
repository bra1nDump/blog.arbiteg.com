---
layout: page
---

## Your order was successfull, check your mailbox for a reciept!

<a id='viewReceipt'>View your reciept in browser</a>

<script>
	const urlParams = new URLSearchParams(window.location.search);
	
	document.getElementById('viewReceipt').href = urlParams.get('recieptUrl');
</script>