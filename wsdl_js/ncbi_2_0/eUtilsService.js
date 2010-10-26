
	//remote web server request object
	var xmlHttpRequest;
	function getHttpRequest(){
		var http_request;
		if (window.XMLHttpRequest) { // Mozilla, Safari, ...
			 http_request = new XMLHttpRequest();
		}else if (window.ActiveXObject) { // IE
			 http_request = new ActiveXObject("Microsoft.XMLHTTP");
		 }else{
			 alert("Your browser doesn't support to create XMLHttp Object,Some content on this page can't show.");
			 return null;
		}
		 return http_request;
	}

	// define a class to encapsulate invoking of web service
	// the class name is the name of web service
	// url -  location of access web service.
	function eUtilsService(url){
		// url=http://eutils.ncbi.nlm.nih.gov/entrez/eutils/soap/v2.0/soap_adapter_2_0.cgi
		this.url = url
		this.run_eGquery=run_eGquery
		this.run_eInfo=run_eInfo
		this.run_eSearch=run_eSearch
		this.run_eSummary=run_eSummary
		this.run_eLink=run_eLink
		this.run_eSpell=run_eSpell
		this.run_ePost=run_ePost
	}


	// web service method
	function run_eGquery(/**/ ,/**/ ,/**/ ) {
		soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
		+"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
		+"<soap:Body>"
		+"<run_eGquery xmlns=\"http://www.ncbi.nlm.nih.gov/soap/eutils/\">"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess +="</run_eGquery>"
		soapMess +="</soap:Body></soap:Envelope>"
		xmlHttpRequest = getHttpRequest()
		xmlHttpRequest.onreadystatechange = run_eGquery_callback
		xmlHttpRequest.open("POST",this.url,true);
		xmlHttpRequest.setRequestHeader("SOAPAction","egquery");
		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
		xmlHttpRequest.send(soapMess);
	}

	// this function will be called when result return from web service.
	function run_eGquery_callback(){
	// return value from web service is an xml document.
		var rawData;
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				rawdata = xmlHttpRequest.responseXML;
				var resultNode = rawdata.documentElement.firstChild.firstChild.firstChild;
				var resultValue = resultNode.firstChild.nodeValue
				// Now,you can process the returnValue in function run_eGquery_handler
				run_eGquery_handler(resultValue);
			}else{
				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
			}
		}
	}

	// process result value of method run_eGquery
	function run_eGquery_handler(/*string*/ resultValue) {

	}



	// web service method
	function run_eInfo(/**/ ,/**/ ,/**/ ) {
		soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
		+"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
		+"<soap:Body>"
		+"<run_eInfo xmlns=\"http://www.ncbi.nlm.nih.gov/soap/eutils/\">"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess +="</run_eInfo>"
		soapMess +="</soap:Body></soap:Envelope>"
		xmlHttpRequest = getHttpRequest()
		xmlHttpRequest.onreadystatechange = run_eInfo_callback
		xmlHttpRequest.open("POST",this.url,true);
		xmlHttpRequest.setRequestHeader("SOAPAction","einfo");
		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
		xmlHttpRequest.send(soapMess);
	}

	// this function will be called when result return from web service.
	function run_eInfo_callback(){
	// return value from web service is an xml document.
		var rawData;
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				rawdata = xmlHttpRequest.responseXML;
				var resultNode = rawdata.documentElement.firstChild.firstChild.firstChild;
				var resultValue = resultNode.firstChild.nodeValue
				// Now,you can process the returnValue in function run_eInfo_handler
				run_eInfo_handler(resultValue);
			}else{
				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
			}
		}
	}

	// process result value of method run_eInfo
	function run_eInfo_handler(/*string*/ resultValue) {

	}



	// web service method
	function run_eSearch(/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ) {
		soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
		+"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
		+"<soap:Body>"
		+"<run_eSearch xmlns=\"http://www.ncbi.nlm.nih.gov/soap/eutils/\">"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess +="</run_eSearch>"
		soapMess +="</soap:Body></soap:Envelope>"
		xmlHttpRequest = getHttpRequest()
		xmlHttpRequest.onreadystatechange = run_eSearch_callback
		xmlHttpRequest.open("POST",this.url,true);
		xmlHttpRequest.setRequestHeader("SOAPAction","esearch");
		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
		xmlHttpRequest.send(soapMess);
	}

	// this function will be called when result return from web service.
	function run_eSearch_callback(){
	// return value from web service is an xml document.
		var rawData;
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				rawdata = xmlHttpRequest.responseXML;
				var resultNode = rawdata.documentElement.firstChild.firstChild.firstChild;
				var resultValue = ""
				// Now,you can process the returnValue in function run_eSearch_handler
				run_eSearch_handler(resultValue);
			}else{
				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
			}
		}
	}

	// process result value of method run_eSearch
	function run_eSearch_handler(/**/ resultValue) {

	}



	// web service method
	function run_eSummary(/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ) {
		soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
		+"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
		+"<soap:Body>"
		+"<run_eSummary xmlns=\"http://www.ncbi.nlm.nih.gov/soap/eutils/\">"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess +="</run_eSummary>"
		soapMess +="</soap:Body></soap:Envelope>"
		xmlHttpRequest = getHttpRequest()
		xmlHttpRequest.onreadystatechange = run_eSummary_callback
		xmlHttpRequest.open("POST",this.url,true);
		xmlHttpRequest.setRequestHeader("SOAPAction","esummary");
		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
		xmlHttpRequest.send(soapMess);
	}

	// this function will be called when result return from web service.
	function run_eSummary_callback(){
	// return value from web service is an xml document.
		var rawData;
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				rawdata = xmlHttpRequest.responseXML;
				var resultNode = rawdata.documentElement.firstChild.firstChild.firstChild;
				var resultValue = resultNode.firstChild.nodeValue
				// Now,you can process the returnValue in function run_eSummary_handler
				run_eSummary_handler(resultValue);
			}else{
				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
			}
		}
	}

	// process result value of method run_eSummary
	function run_eSummary_handler(/*string*/ resultValue) {

	}



	// web service method
	function run_eLink(/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ,/**/ ) {
		soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
		+"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
		+"<soap:Body>"
		+"<run_eLink xmlns=\"http://www.ncbi.nlm.nih.gov/soap/eutils/\">"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess +="</run_eLink>"
		soapMess +="</soap:Body></soap:Envelope>"
		xmlHttpRequest = getHttpRequest()
		xmlHttpRequest.onreadystatechange = run_eLink_callback
		xmlHttpRequest.open("POST",this.url,true);
		xmlHttpRequest.setRequestHeader("SOAPAction","elink");
		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
		xmlHttpRequest.send(soapMess);
	}

	// this function will be called when result return from web service.
	function run_eLink_callback(){
	// return value from web service is an xml document.
		var rawData;
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				rawdata = xmlHttpRequest.responseXML;
				var resultNode = rawdata.documentElement.firstChild.firstChild.firstChild;
				var resultValue = resultNode
				// Now,you can process the returnValue in function run_eLink_handler
				run_eLink_handler(resultValue);
			}else{
				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
			}
		}
	}

	// process result value of method run_eLink
	function run_eLink_handler(/*LinkSetType*/ resultValue) {

	}



	// web service method
	function run_eSpell(/**/ ,/**/ ,/**/ ,/**/ ) {
		soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
		+"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
		+"<soap:Body>"
		+"<run_eSpell xmlns=\"http://www.ncbi.nlm.nih.gov/soap/eutils/\">"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess +="</run_eSpell>"
		soapMess +="</soap:Body></soap:Envelope>"
		xmlHttpRequest = getHttpRequest()
		xmlHttpRequest.onreadystatechange = run_eSpell_callback
		xmlHttpRequest.open("POST",this.url,true);
		xmlHttpRequest.setRequestHeader("SOAPAction","espell");
		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
		xmlHttpRequest.send(soapMess);
	}

	// this function will be called when result return from web service.
	function run_eSpell_callback(){
	// return value from web service is an xml document.
		var rawData;
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				rawdata = xmlHttpRequest.responseXML;
				var resultNode = rawdata.documentElement.firstChild.firstChild.firstChild;
				var resultValue = ""
				// Now,you can process the returnValue in function run_eSpell_handler
				run_eSpell_handler(resultValue);
			}else{
				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
			}
		}
	}

	// process result value of method run_eSpell
	function run_eSpell_handler(/**/ resultValue) {

	}



	// web service method
	function run_ePost(/**/ ,/**/ ,/**/ ,/**/ ,/**/ ) {
		soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
		+"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
		+"<soap:Body>"
		+"<run_ePost xmlns=\"http://www.ncbi.nlm.nih.gov/soap/eutils/\">"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess += "<>"++"</>"
		soapMess +="</run_ePost>"
		soapMess +="</soap:Body></soap:Envelope>"
		xmlHttpRequest = getHttpRequest()
		xmlHttpRequest.onreadystatechange = run_ePost_callback
		xmlHttpRequest.open("POST",this.url,true);
		xmlHttpRequest.setRequestHeader("SOAPAction","epost");
		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
		xmlHttpRequest.send(soapMess);
	}

	// this function will be called when result return from web service.
	function run_ePost_callback(){
	// return value from web service is an xml document.
		var rawData;
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				rawdata = xmlHttpRequest.responseXML;
				var resultNode = rawdata.documentElement.firstChild.firstChild.firstChild;
				var resultValue = resultNode
				// Now,you can process the returnValue in function run_ePost_handler
				run_ePost_handler(resultValue);
			}else{
				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
			}
		}
	}

	// process result value of method run_ePost
	function run_ePost_handler(/*InvalidIdListType*/ resultValue) {

	}



