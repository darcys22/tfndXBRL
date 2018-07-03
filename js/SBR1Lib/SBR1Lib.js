/*
* SBR1JS 0.1.1 - Australian SBR1Lodger
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
})('SBR1Lodger', this, function () {
  'use strict';

  var SBR1Lodger = function (options) {
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
  
  SBR1Lodger.prototype = {

    lodge: function (text) {

      var parser = new DOMParser();
      var messageXML = parser.parseFromString(text,"text/xml");

      var xmlDoc = document.implementation.createDocument('','',null);
      
      var xmlns = {
        xmlns: "http://www.w3.org/2000/xmlns/",
        Soap : "http://www.w3.org/2003/05/soap-envelope",
        wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"
      }
      var soap = xmlDoc.createElementNS(xmlns.Soap,"Soap:Envelope");
      xmlDoc.appendChild(soap);
      var soapHeader= xmlDoc.createElement("Soap:Header");
      soap.appendChild(soapHeader); 
      var soapBody= xmlDoc.createElement( "Soap:Body");
      soapBody.setAttributeNS(xmlns.xmlns, 'xmlns:wsu', xmlns.wsu);
      //var soap = xmlDoc.createElementNS(xmlns.Soap,"Soap:Envelope");
      soap.appendChild(soapBody); 
      var documentText= xmlDoc.createElement("ns3:BusinessDocument.Instance.Text");
      soapBody.appendChild(documentText); 


      documentText.appendChild(messageXML.documentElement);


      var serializer = new XMLSerializer();
      var xmlString = serializer.serializeToString(xmlDoc);
      console.log(vkbeautify.xml(xmlString));

		},

    round: function(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
		},


  };


  return SBR1Lodger;
});
