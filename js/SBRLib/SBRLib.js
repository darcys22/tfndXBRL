/*
* SBRJS 0.1.1 - Australian SBRLodger
* Copyright (c) 2017 Sean Darcy (Sean@DarcyFinancial.com)
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function (name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
  else if (typeof define === 'function' && define.amd) { define(definition); }
  else { context[name] = definition(); }
})('SBRLodger', this, function () {
  'use strict';

  var SBRLodger = function (options) {
    var nativeForEach, nativeMap;
    nativeForEach = Array.prototype.forEach;
    nativeMap = Array.prototype.map;

    this.each = function (obj, iterator, context) {
      if (obj === null) {
        return;
      }
      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (iterator.call(context, obj[i], i, obj) === {}) return;
        }
      } else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (iterator.call(context, obj[key], key, obj) === {}) return;
          }
        }
      }
    };

    this.map = function(obj, iterator, context) {
      var results = [];
      // Not using strict equality so that this acts as a
      // shortcut to checking for `null` and `undefined`.
      if (obj == null) return results;
      if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
      this.each(obj, function(value, index, list) {
        results[results.length] = iterator.call(context, value, index, list);
      });
      return results;
    };

    if (typeof options == 'object'){
      //this.hasher = options.hasher;
    } else if(typeof options == 'function'){
      //this.hasher = options;
    }
  };
  
  SBRLodger.prototype = {

    build: function (text) {

      var parser = new DOMParser();
      var messageXML = parser.parseFromString(text,"text/xml");

      var xmlDoc = document.implementation.createDocument('','',null);
      
      var xmlns = {
        xmlns: "http://www.w3.org/2000/xmlns/",
        Soap : "http://www.w3.org/2003/05/soap-envelope",
        wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
        ns2:"http://sbr.gov.au/comn/core.02.data",
        ns3:"http://sbr.gov.au/comn/sbdm.02.data",
        ns4:"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
        ns5:"http://sbr.gov.au/comn/lodge.02.service",
        xmime:"http://www.w3.org/2005/05/xmlmime"
      }
      var soap = xmlDoc.createElementNS(xmlns.Soap,"Soap:Envelope");
      xmlDoc.appendChild(soap);
      var soapHeader= xmlDoc.createElement("Soap:Header");
      //soap.appendChild(soapHeader); 
      var soapBody= xmlDoc.createElement( "Soap:Body");
      soapBody.setAttributeNS(xmlns.xmlns, 'xmlns:wsu', xmlns.wsu);
      soapBody.setAttribute("wsu:Id", "Body-a3b32ad9-a38c-477f-9b87-6ad4565bc178"); 
      //var soap = xmlDoc.createElementNS(xmlns.Soap,"Soap:Envelope");
      soap.appendChild(soapBody); 
      var lodgerequest= xmlDoc.createElement("ns5:RequestLodgeReport");
      lodgerequest.setAttributeNS(xmlns.xmlns, 'xmlns:ns2', xmlns.ns2);
      lodgerequest.setAttributeNS(xmlns.xmlns, 'xmlns:ns3', xmlns.ns3);
      lodgerequest.setAttributeNS(xmlns.xmlns, 'xmlns:ns4', xmlns.ns4);
      lodgerequest.setAttributeNS(xmlns.xmlns, 'xmlns:ns5', xmlns.ns5);
      lodgerequest.setAttributeNS(xmlns.xmlns, 'xmlns:xmime', xmlns.xmime);
      soapBody.appendChild(lodgerequest); 
      var sbdm= xmlDoc.createElement("ns3:StandardBusinessDocumentMessage");
      sbdm.setAttribute("ns4:Id", "SBDM_id"); 
      lodgerequest.appendChild(sbdm); 
      var sbdmheader= xmlDoc.createElement("ns3:StandardBusinessDocumentHeader");
      sbdm.appendChild(sbdmheader); 
      var messagetype= xmlDoc.createElement("ns3:Message.Type.Text");
      messagetype.textContent = "tfnd.0003.2016.lodge.request";
      sbdmheader.appendChild(messagetype); 
      //Timestamps
      var timestamps= xmlDoc.createElement("ns3:MessageTimestamps");
      sbdmheader.appendChild(timestamps); 
      var timestamp= xmlDoc.createElement("ns3:MessageTimestamp");
      timestamps.appendChild(timestamp); 
      var datetime= xmlDoc.createElement("ns3:Message.Timestamp.Generation.Datetime");
      datetime.textContent = this.timestamp();
      timestamp.appendChild(datetime); 
      var datesource= xmlDoc.createElement("ns3:Message.Timestamp.GenerationSource.Code");
      datesource.textContent = "BusinessEntity";
      timestamp.appendChild(datesource); 
      //Receiver
      var receiver= xmlDoc.createElement("ns3:Receiver");
      sbdmheader.appendChild(receiver); 
      var identifier= xmlDoc.createElement("ns3:IdentificationDetails.IdentifierDesignation.Text");
      identifier.textContent = "ato.gov.au";
      receiver.appendChild(identifier); 
      var identifiername= xmlDoc.createElement("ns3:IdentificationDetails.IdentifierName.Text");
      identifiername.textContent = "AgencyInternetDomainName";
      receiver.appendChild(identifiername); 
      //SoftwareInformation
      var software= xmlDoc.createElement("ns3:SoftwareInformation");
      sbdmheader.appendChild(software); 
      var orgname= xmlDoc.createElement("ns3:OrganisationNameDetails.OrganisationalName.Text");
      orgname.textContent = "Darcy Financial";
      software.appendChild(orgname); 
      var product= xmlDoc.createElement("ns3:SoftwareInformation.ProductName.Text");
      product.textContent = "Lodger";
      software.appendChild(product); 
      var version= xmlDoc.createElement("ns3:SoftwareInformation.ProductVersion.Text");
      version.textContent = "0.0.1";
      software.appendChild(version); 
      //Business Documents
      var businessdocuments= xmlDoc.createElement("ns3:BusinessDocuments");
      sbdmheader.appendChild(businessdocuments); 
      var businessdocument= xmlDoc.createElement("ns3:BusinessDocument");
      businessdocuments.appendChild(businessdocument); 
      var sequencenumber= xmlDoc.createElement("ns3:BusinessDocument.Sequence.Number");
      sequencenumber.textContent = "1";
      businessdocument.appendChild(sequencenumber); 
      var creationtime= xmlDoc.createElement("ns3:BusinessDocument.Creation.Datetime");
      creationtime.textContent = this.timestamp();
      businessdocument.appendChild(creationtime); 
      var validationresource= xmlDoc.createElement("ns3:BusinessDocument.ValidationUniformResourceIdentifier.Text");
      validationresource.textContent = "http://sbr.gov.au/taxonomy/sbr_au_reports/ato/tfnd/tfnd_0003/tfnd.0003.lodge.request.02.00.report.xsd";
      businessdocument.appendChild(validationresource); 
      var ourid= xmlDoc.createElement("ns3:BusinessDocument.BusinessGeneratedIdentifier.Text");
      ourid.textContent = "0120412041034";
      businessdocument.appendChild(ourid); 

      //SBDM BODY
      var sbdmbody= xmlDoc.createElement("ns3:StandardBusinessDocumentBody");
      sbdm.appendChild(sbdmbody); 
      var documentinstances= xmlDoc.createElement("ns3:BusinessDocumentInstances");
      sbdmbody.appendChild(documentinstances); 
      var documentinstance= xmlDoc.createElement("ns3:BusinessDocumentInstance");
      documentinstances.appendChild(documentinstance); 
      var bodysequence = xmlDoc.createElement("ns3:BusinessDocument.Sequence.Number");
      bodysequence.textContent = "1";
      documentinstance.appendChild(bodysequence); 

      var documentText= xmlDoc.createElement("ns3:BusinessDocument.Instance.Text");
      documentinstance.appendChild(documentText); 

      documentText.appendChild(messageXML.documentElement);


      var serializer = new XMLSerializer();
      var xmlString = serializer.serializeToString(xmlDoc);
      if(xmlString.indexOf('<?xml') !== 0)
            xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;
      console.log(vkbeautify.xml(xmlString));
      console.log("------------------------------");
      console.log("------------------------------");
      console.log("------------------------------");

      return xmlString

		},

    lodge: function (text, callback) {
      //var xmldata = this.build(text);
      //var url= 'https://test.sbr.gov.au/services/nowssecurity/lodge.02.service';

      //var request = new XMLHttpRequest();
      //request.open('POST', url);
      //request.onreadystatechange = function() {if (request.readyState==4) callback(request.responseText); };
      //request.setRequestHeader("Content-type", "text/plain");
      //request.send(xmldata);
      this.buildsts()

    },

    buildsts: function() {
      var xmlDoc = document.implementation.createDocument('','',null);
      
      var xmlns = {
        xmlns: "http://www.w3.org/2000/xmlns/",
        Soap : "http://www.w3.org/2003/05/soap-envelope",
        wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
        wsa:"http://www.w3.org/2005/08/addressing",
        wsse:"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
        ds:"http://www.w3.org/2000/09/xmldsig#",
        wst:"http://docs.oasis-open.org/ws-sx/ws-trust/200512",
        wsp:"http://schemas.xmlsoap.org/ws/2004/09/policy",
        i:"http://schemas.xmlsoap.org/ws/2005/05/identity",
      }
      var soap = xmlDoc.createElementNS(xmlns.Soap,"Soap:Envelope");
      xmlDoc.appendChild(soap);
      //Header
      var soapHeader= xmlDoc.createElement("Soap:Header");
      soapHeader.setAttributeNS(xmlns.xmlns, 'xmlns:wsa', xmlns.wsa);
      soap.appendChild(soapHeader); 
      var wssesecurity= xmlDoc.createElement("wsse:Security");
      wssesecurity.setAttributeNS(xmlns.xmlns, 'xmlns:wsse', xmlns.wsse);
      wssesecurity.setAttribute("Soap:mustUnderstand", "true"); 
      soapHeader.appendChild(wssesecurity); 
      //-Timestamp
      var timestamp= xmlDoc.createElement("wsu:Timestamp");
      timestamp.setAttributeNS(xmlns.xmlns, 'xmlns:wsu', xmlns.wsu);
      timestamp.setAttribute("wsu:Id", "Timestamp-19714461"); 
      wssesecurity.appendChild(timestamp); 
      var created= xmlDoc.createElement("wsu:Created");
      created.textContent = this.timestamp();
      timestamp.appendChild(created); 
      var expires= xmlDoc.createElement("wsu:Expires");
      expires.textContent = this.timestamp(moment().add(5, 'hours'));
      timestamp.appendChild(expires); 
      //-BinarySecurityToken
      var securitytoken= xmlDoc.createElement("wsse:BinarySecurityToken");
      securitytoken.setAttributeNS(xmlns.xmlns, 'xmlns:wsu', xmlns.wsu);
      securitytoken.setAttribute("EncodingType", "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary"); 
      securitytoken.setAttribute("ValueType", "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3"); 
      securitytoken.setAttribute("wsu:Id", "CertId-11658721"); 
      securitytoken.textContent = "xxxxxx";
      wssesecurity.appendChild(securitytoken); 
      //-Signature
      var signature= xmlDoc.createElement("ds:Signature");
      signature.setAttributeNS(xmlns.xmlns, 'xmlns:ds', xmlns.ds);
      signature.setAttribute("Id", "Signature-620055"); 
      wssesecurity.appendChild(signature); 
      var signedinfo= xmlDoc.createElement("ds:Signature");
      signature.appendChild(signedinfo); 
      var canonical= xmlDoc.createElement("ds:CanonicalizationMethod");
      canonical.setAttribute("Algorithm", "http://www.w3.org/2001/10/xml-exc-c14n#"); 
      signedinfo.appendChild(canonical); 
      var method= xmlDoc.createElement("ds:SignatureMethod");
      method.setAttribute("Algorithm", "http://www.w3.org/2000/09/xmldsig#rsa-sha1"); 
      signedinfo.appendChild(method); 
      var timestampsign= xmlDoc.createElement("ds:Reference");
      timestampsign.setAttribute("URI", "#Timestamp-19714461"); 
      signedinfo.appendChild(timestampsign); 
      var timestamptransforms= xmlDoc.createElement("ds:Transforms");
      timestampsign.appendChild(timestamptransforms); 
      var timestamptransform= xmlDoc.createElement("ds:Transform");
      timestamptransform.setAttribute("Algorithm", "http://www.w3.org/2001/10/xml-exc-c14n#"); 
      timestamptransforms.appendChild(timestamptransform); 
      var timestampdigestmethod= xmlDoc.createElement("ds:DigestMethod");
      timestampdigestmethod.setAttribute("Algorithm", "http://www.w3.org/2000/09/xmldsig#sha1"); 
      timestampsign.appendChild(timestampdigestmethod); 
      var timestampdigest= xmlDoc.createElement("ds:DigestValue");
      timestampdigest.textContent = "Something"; 
      timestampsign.appendChild(timestampdigest); 


      var appliestosign= xmlDoc.createElement("ds:Reference");
      appliestosign.setAttribute("URI", "#id-3125250"); 
      signedinfo.appendChild(appliestosign); 
      var appliestotransforms= xmlDoc.createElement("ds:Transforms");
      appliestosign.appendChild(appliestotransforms); 
      var appliestotransform= xmlDoc.createElement("ds:Transform");
      appliestotransform.setAttribute("Algorithm", "http://www.w3.org/2001/10/xml-exc-c14n#"); 
      appliestotransforms.appendChild(appliestotransform); 
      var appliestodigestmethod= xmlDoc.createElement("ds:DigestMethod");
      appliestodigestmethod.setAttribute("Algorithm", "http://www.w3.org/2000/09/xmldsig#sha1"); 
      appliestosign.appendChild(appliestodigestmethod); 
      var appliestodigest= xmlDoc.createElement("ds:DigestValue");
      appliestodigest.textContent = "Something"; 
      appliestosign.appendChild(appliestodigest); 

      //WSA 
      var wsato= xmlDoc.createElement("wsa:To");
      wsato.setAttributeNS(xmlns.xmlns, 'xmlns:wsu', xmlns.wsu);
      wsato.setAttribute("wsu:Id", "id-3125250"); 
      wsato.textContent = "https://thirdparty.authentication.business.gov.au/R3.0/vanguard/S007v1.1/service.svc"; 
      soapHeader.appendChild(wsato); 
      var wsamessageid= xmlDoc.createElement("wsa:MessageID");
      wsamessageid.textContent = "urn:uuid:CC8BEAE3279FDD5821255320143481"; 
      soapHeader.appendChild(wsamessageid); 
      var wsaaction= xmlDoc.createElement("wsa:Action");
      wsaaction.textContent = "http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue"; 
      soapHeader.appendChild(wsaaction); 


      //Body
      var soapBody= xmlDoc.createElement( "Soap:Body");
      soap.appendChild(soapBody); 
      var requesttoken= xmlDoc.createElement("wst:RequestSecurityToken");
      requesttoken.setAttributeNS(xmlns.xmlns, 'xmlns:wst', xmlns.wst);
      soapBody.appendChild(requesttoken); 
      var requesttype= xmlDoc.createElement("wst:RequestType");
      requesttype.textContent = "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue";
      requesttoken.appendChild(requesttype); 


      //Add Declaration and Prettify
      var serializer = new XMLSerializer();
      var xmlString = serializer.serializeToString(xmlDoc);
      if(xmlString.indexOf('<?xml') !== 0)
            xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;
      console.log(vkbeautify.xml(xmlString));
    },

    round: function(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
		},

    timestamp: function (time) {
      var timestamp;
      if(time) {
        timestamp = moment(time).toISOString();
      } else {
        timestamp = moment().toISOString();
      }
      return timestamp;
    },

    round: function(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
		},


  };


  return SBRLodger;
});
