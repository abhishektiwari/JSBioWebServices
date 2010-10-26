/** Class for web service SOAP message handling. */
var SOAP = {

    // Namespace of the schema element in WSDL
    WSDLSchemaNamespace: 'xs',
    // Namespace of the return element in the soap resopnse
    responseNamespace: 'ns',
    // Suffix of the name attribute of response elements
    responseMethodSuffix: 'Response',
    // Name of the error element when an error occurs
    errorElementName: 'faultstring',
    // Indicates whether the request is asynchronous or not
    async: true,
    // Target namespace of the definitions element
    targetNamespace: null,
    // Array for parameter names of the webservice method
    paramNames: null,
    // Array for parameter types of the webservice method
    paramTypes: null,
    // Name of the return element
    returnName: null,
    // Type of the return value
    returnType: null,
    // Cache for WSDL
    WSDL: {
        url: null,
        xml: null
    },
    // Number of currently running requests
    requestNum: 0,

    /**
     * Sends a web service request.
     *
     * @param url       Url of the web service.
     * @param method    Web service method.
     * @param params    Array of method parameters. The parameter order should be
      *                 the same as it is defined in the WSDL file.
     * @param success   Callback function in case of success, it can be null.
     * @param error     Callback function in case of error, it can be null.
     * @throws Error
     */
    send: function(url, method, params, success, error) {
        SOAP.processWSDL(url + '?wsdl', method);
        SOAP.checkParameters(params);
        var content = SOAP.embedInEnvelope(method, params);
        var soapAction = SOAP.targetNamespace+'/'+method;
        SOAP.ajax(url, 'POST', SOAP.async, content, soapAction, function(data) {
            // Success
            if (success != null) {
                var returnNodes = data.getElementsByTagName(SOAP.returnName);
                if (returnNodes.length == 0) {
                    returnNodes = data.getElementsByTagName(
                            SOAP.responseNamespace+':'+SOAP.returnName);
                }
                if (returnNodes.item(0) != null) {
                    var returnValue = XML.serialize(returnNodes.item(0));
                    returnValue = returnValue.replace(new RegExp(
                            '</?('+SOAP.responseNamespace+':)?'+
                            SOAP.returnName+'( xmlns:'+
                            SOAP.responseNamespace+'="'+
                            SOAP.targetNamespace+'")?>', 'g'), '');
                    returnValue = XML.convertSpecChars(returnValue, false);
                    success(returnValue, data);
                }
            }
        }, function(data) {
            if (error != null) {
                error(data);
            }
            if (data != null) {
                throw new Error(data.getElementsByTagName(
                        SOAP.errorElementName).item(0).firstChild.nodeValue);
            } else {
                throw new Error(
                        'SOAP exception (could not retrieve the error message)');
            }
        });
    },

    /**
     * Process WSDL file and collect information about one particular method
     * of the web service.
     *
     * @param wsdlUrl   Url of the WSDL file.
     * @param method    Chosen method of the web service.
     * @throws Error, if there is some problem with the WSDL file.
     */
    processWSDL: function(wsdlUrl, method) {
        if (SOAP.WSDL.xml == null || wsdlUrl != SOAP.WSDL.url) {
            SOAP.ajax(wsdlUrl, 'GET', false, null, null, function(data) {
                SOAP.WSDL.url = wsdlUrl;
                SOAP.WSDL.xml = data;
            }, function() {
                throw new Error('WSDL file is not available');
            });
        }
        // WSDL successfully loaded
        var definitions =
                SOAP.WSDL.xml.getElementsByTagName('wsdl:definitions').item(0);
        if (definitions == null) {
            definitions = SOAP.WSDL.xml.getElementsByTagName('definitions').item(0);
        }
        if (definitions == null) {
            throw new Error('WSDL definitions not found');
        }
        SOAP.targetNamespace = definitions.getAttribute('targetNamespace');
        var elements = SOAP.WSDL.xml.getElementsByTagName(
                SOAP.WSDLSchemaNamespace+':element');
        if (elements.length == 0) {
            elements = SOAP.WSDL.xml.getElementsByTagName('element');
        }
        SOAP.paramNames = [];
        SOAP.paramTypes = [];
        var match = 0;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].parentNode.tagName == SOAP.WSDLSchemaNamespace+':schema') {
                var methodName = elements[i].getAttribute('name');
                if (match == 2) {
                    break;
                } else if (methodName == method ||
                           methodName == method+SOAP.responseMethodSuffix) {
                    match++;
                }
            } else if (match > 0 &&
                    elements[i].parentNode.parentNode.parentNode.getAttribute('name')
                              == methodName) {
                if (methodName == method) {
                    // Retrieve parameter names and types of the method to be called
                    SOAP.paramNames.push(elements[i].getAttribute('name'));
                    var types = elements[i].getAttribute('type').split(':');
                    var paramType = types[types.length-1];
                    var arrayType = elements[i].getAttribute('maxOccurs');
                    if (arrayType != null && arrayType == 'unbounded') {
                        paramType += '[]';
                    }
                    SOAP.paramTypes.push(paramType);
                } else if (methodName == method+SOAP.responseMethodSuffix) {
                    // Retrieve the response tag name and the type of its value
                    SOAP.returnName = elements[i].getAttribute('name');
                    var types = elements[i].getAttribute('type').split(':');
                    SOAP.returnType = types[types.length-1];
                }
            }
        }
    },

    /**
     * Checks parameter number and types of the service call.
     *
     * @param params   Parameters enumerated in an array.
     * @throws Error, if there is some problem.
     */
    checkParameters: function(params) {
        if (params != null && params.length > 0 &&
                (params.length != SOAP.paramNames.length ||
                 params.length != SOAP.paramTypes.length)) {
            throw new Error(
                    'Parameter number does not match service method requirements');
        }
        for (var i = 0; i < params.length; i++) {
            if (params[i] != null) {
                paramType = SOAP.getVarType(params[i]);
                if (paramType != SOAP.paramTypes[i] && !(paramType == 'array' &&
                                                         params[i].length == 0) &&
                        !(paramType == 'int' && SOAP.paramTypes[i] == 'long')) {
                    throw new Error('Parameter types do not match for \''+
                                    params[i]+'\'. (got: '+paramType+
                                    ', expected: '+SOAP.paramTypes[i]+')');
                }
            }
        }
    },

    /**
     * Sends an Ajax request.
     *
     * @param url               Target url of the request.
     * @param method            Request method: GET, POST, etc.
     * @param async             Callback function handling is asynchronous, if true.
     * @param soapAction        SOAPAction header value. The header is omitted if null.
     * @param successCallback   Callback function in case of success, it can be null.
     * @param errorCallback     Callback function in case of error, it can be null.
     * @throws Error, if ajax is not supported by the browser.
     */
    ajax: function(url, method, async, content, soapAction,
                   successCallback, errorCallback) {
        SOAP.requestNum++;
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } else {
            throw new Error('No AJAX support');
        }
        if (async == true) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    SOAP.requestNum--;
                    if (xhr.status == 200 && successCallback != null) {
                        successCallback(xhr.responseXML);
                    } else if (xhr.status >= 300 && errorCallback != null) {
                        errorCallback(xhr.responseXML);
                    }
                }
            };
        }
        xhr.open(method, url, async);
        xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        if (soapAction != null) {
            xhr.setRequestHeader('SOAPAction', soapAction);
        }
        xhr.send(content);
        if (async == false) {
            SOAP.requestNum--;
            if (xhr.status == 200 && successCallback != null) {
                successCallback(xhr.responseXML);
            } else if (xhr.status >= 300 && errorCallback != null) {
                errorCallback(xhr.responseXML);
            }
        }
    },

    /**
     * Creates a SOAP envelope for a web service method call.
     *
     * @param method   Web service method name.
     * @param params   Array of method parameters.
     * @return string of the envelope html.
     */
    embedInEnvelope: function(method, params) {
        var html = '<?xml version="1.0" encoding="utf-8" ?><soap:Envelope '+
                   'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"'+
                   ' xmlns:xsd="http://www.w3.org/2001/XMLSchema" '+
                   'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
                   '<soap:Body>' +
                   '<'+method+' xmlns="'+SOAP.targetNamespace+'">';
        for (var i = 0; i < SOAP.paramNames.length; i++) {
            if (params[i] == null) {
                // Null value
                html += '<'+SOAP.paramNames[i]+' xsi:nil="true" />';
            } else if (SOAP.paramTypes[i].match(/\[\]/)) {
                // Array types (handles only 1-dimensional arrays)
                for (var j = 0; j < params[i].length; j++) {
                    if (params[i][j] != null) {
                        html += '<'+SOAP.paramNames[i]+'>'+params[i][j]+'</'+
                                SOAP.paramNames[i]+'>';
                    }
                }
            } else if (SOAP.paramTypes[i] != 'array') {
                // Simple types
                html += '<'+SOAP.paramNames[i]+'>'+
                        params[i]+'</'+SOAP.paramNames[i]+'>';
            }
        }
        html += '</'+method+'>' +
                '</soap:Body>' +
                '</soap:Envelope>';
        return html;
    },

    /**
     * Retrieves the type of the variable.
     *
     * @param variable   The variable.
     * @return string. Possible values are: int, float, string, boolean, object,
     *                 array (if is empty or has mixed types),
     *                 int[], float[], string[], boolean[], object[],
     *                 int[][], float[][], etc.
     */
    getVarType: function(variable) {
        switch (typeof(variable)) {
            case 'string':
                return 'string';
            case 'number':
                if (variable.toString().match(/\./)) {
                    return 'float';
                }
                return 'int';
            case 'boolean':
                return 'boolean';
            case 'object':
                if (variable instanceof Array) {
                    var arrayType = 'array';
                    for (var i = 0; i < variable.length; i++) {
                        if (i == 0) {
                            arrayType = SOAP.getVarType(variable[i]);
                            if (arrayType == null) {
                                return 'array';
                            }
                        } else if (SOAP.getVarType(variable[i]) != arrayType) {
                            return 'array';
                        }

                    }
                    if (arrayType != 'array') {
                        arrayType += '[]';
                    }
                    return arrayType;
                }
                return 'object';
            default:
                return null;
        }
    }
};