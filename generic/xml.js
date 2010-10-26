/** Class for performing basic XML handling operations. */
var XML = {

    /**
     * Makes an object from an XML representated by a string.
     *
     * @param xmlText   XML string.
     * @return XML object.
     */
    parse: function(xmlText) {
        var doc;
        if (window.ActiveXObject) {
            doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = false;
            doc.loadXML(xmlText);
        } else {
            var parser = new DOMParser();
            doc = parser.parseFromString(xmlText, 'text/xml');
        }
        return doc;
    },

    /**
     * Makes a string from an XML part representated by an object.
     *
     * @param xmlNode   Node of the XML object that needs to be converted.
     * @return string.
     */
    serialize: function(xmlNode) {
        try {
            return (new XMLSerializer()).serializeToString(xmlNode);
        }
        catch (e) {
            return xmlNode.xml;
        }
    },

    /**
     * Encode or decode HTML special characters.
     *
     * @param text     String to be converted.
     * @param encode   Encodes characters to entities if true, decodes entities
     *                 to characters if false.
     * @return converted string.
     */
    convertSpecChars: function(text, encode) {
        text += '';
        if (encode == null) {
            encode = true;
        }
        var chars = ['&', '<', '>', '"', '\''];
        var entities = ['&amp;', '&lt;', '&gt;', '&quot;', '&#39;'];
        if (encode) {
            for (var i = 0; i < chars.length; i++) {
                text = text.replace(new RegExp(chars[i], 'g'), entities[i]);
            }
        } else {
            for (var i = 0; i < entities.length; i++) {
                text = text.replace(new RegExp(entities[i], 'g'), chars[i]);
            }
        }
        return text;
    }
};