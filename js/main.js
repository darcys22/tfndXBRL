window.testEmployee = [
    {
        "name": "Sean",
        "secondName": "",
        "surname": "Darcy",
        "TFN": "111111111",
        "DOB": "22nd November 1990",
        "address": "383 woodstock court",
        "address2": "",
        "suburb": "Albruy",
        "state": "NSW",
        "postcode": "2640",
        "amendment": "Y",
        "fbtExempt": "N"
      }
  ]

window.testPayer = {
  "name": "somethin",
  "tradingName": "",
  "ABN": "84623612215",
  "ABNBranch": "001",
  "contactName": "Sean",
  "contactNumber": "0303030303",
  "address": "383 woodstock court",
  "address2": "",
  "suburb": "Albury",
  "state": "NSW",
  "postcode": "2640",
  "financialYear": "2017",
  "endDate": "30062017"
}



$('#addEmployee').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    e.preventDefault();
		window.employees.push($('#addEmployee').serializeObject());
		$('#addEmployee')[0].reset();
		$("#fybox").val(window.endFY.format("YYYY"));
		tableCreate();
    $('#employeeModal').modal('toggle');
    window.excluded = "N"
    openvalidate();
  }
})
$('#payer_form').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    e.preventDefault();
    editPayer();
    $('#payerModal').modal('toggle');
  }
})
$('#payerModal').on('hidden.bs.modal', function () {
    editPayer();
})
function editPayer() {
    window.payer = $('#payer_form').serializeObject();
    var payerheading = document.getElementById('payername');
    payerheading.innerHTML = '';
    var text = document.createElement('small');
    text.appendChild(document.createTextNode(window.payer.tradingName || window.payer.name))
    text.appendChild(document.createTextNode( " - " + window.payer.ABN));
    payerheading.appendChild(text);
    openvalidate();
}
function openvalidate() {
  var validatebutton = document.getElementById('convert');
  if (window.employees.length > 0 && !jQuery.isEmptyObject(window.payer)) {
    validatebutton.title = "Validate before creating XBRL File"
    validatebutton.disabled = false
    validatebutton.onclick = function() {validateXBRL()};
  } else {
    validatebutton.title = "Please add an employee and Payer details to create file"
    validatebutton.disabled = true
    validatebutton.onclick = function(){};
  }
}
function editEmployee(index) {
  var employee = window.employees[index];
  deleteEmployee(index) 
  for (var key in employee) {
    try {
      document.getElementById("addEmployee").elements[key].value = employee[key]
    } catch(err){
    }
  }
  $("#employeeModal").modal() 
}
function deleteEmployee(index) {
  window.employees.splice(index, 1);
  tableCreate();
  openvalidate();
}

function stripwhitecommas(str) {
  window.test = str
  if (!str || 0 === str.length) {
    return str
  } else {
    return str.toString().replace(/[\s,]+/g,'').trim(); 
  }
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function validateXBRL() {
  var xmlns = {
      xbrli : "http://www.xbrl.org/2003/instance",
      address10202:"http://sbr.gov.au/comnmdle/comnmdle.addressdetails1.02.02.module",
      tfnd : "http://sbr.gov.au/rprt/ato/tfnd/tfnd.0003.lodge.request.02.00.report",
      pyde0205 : "http://sbr.gov.au/icls/py/pyde.02.05.data",
      pyde0200 : "http://sbr.gov.au/icls/py/pyde.02.00.data",
      orgname10200:"http://sbr.gov.au/comnmdle/comnmdle.organisationname1.02.00.module",
      declaration10201:"http://sbr.gov.au/comnmdle/comnmdle.declaration1.02.01.module",
      pyid0200 : "http://sbr.gov.au/icls/py/pyid/pyid.02.00.data",
      edte0200:"http://sbr.gov.au/icls/ed/edte/edte.02.00.data",
      edte0201:"http://sbr.gov.au/icls/ed/edte/edte.02.01.data",
      fax10200:"http://sbr.gov.au/comnmdle/comnmdle.electroniccontactfacsimile1.02.00.module",
      phone10200:"http://sbr.gov.au/comnmdle/comnmdle.electroniccontacttelephone1.02.00.module",
      prsnstrcnm20200:"http://sbr.gov.au/comnmdle/comnmdle.personstructuredname2.02.00.module",
      prsnunstrcnm10201:"http://sbr.gov.au/comnmdle/comnmdle.personunstructuredname1.02.01.module",
      edte0202:"http://sbr.gov.au/icls/ed/edte/edte.02.02.data",
      edte0203:"http://sbr.gov.au/icls/ed/edte/edte.02.03.data",
      gfati0200:"http://sbr.gov.au/icls/gfa/gfati/gfati.02.00.data",
      pylk0200:"http://sbr.gov.au/icls/py/pylk/pylk.02.00.data",
      xmlns: "http://www.w3.org/2000/xmlns/"
  };
  var xmlDoc = document.implementation.createDocument('','',null);
  var xbrl = xmlDoc.createElementNS(xmlns.xbrli,"xbrli:xbrl");
  xmlDoc.appendChild(xbrl);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:address10202', xmlns.address10202);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:declaration10201', xmlns.declaration10201);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:edte0200', xmlns.edte0200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:edte0201', xmlns.edte0201);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:edte0202', xmlns.edte0202);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:edte0203', xmlns.edte0203);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:fax10200', xmlns.fax10200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:gfati0200', xmlns.gfati0200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:orgname10200', xmlns.orgname10200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:phone10200', xmlns.phone10200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:prsnstrcnm20200', xmlns.prsnstrcnm20200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:prsnunstrcnm10201', xmlns.prsnunstrcnm10201);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:tfnd', xmlns.tfnd);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:pyde0200', xmlns.pyde0200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:pyde0205', xmlns.pyde0205);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:pyid0200', xmlns.pyid0200);
  //xbrl.setAttributeNS(xmlns.xmlns, 'xmlns:pylk0200', xmlns.pylk0200);

  //------Payee
  var payee = xmlDoc.createElement("tfnd:Payee");
  //xbrl.appendChild(payee);
  var payeetfn = xmlDoc.createElement("pyid0200:Identifiers.TaxFileNumber.Identifier")
  payeetfn.setAttribute("contextRef", "RP"); 
  payeetfn.textContent = window.employees[0].TFN;
  payee.appendChild(payeetfn); 
  var payeedob = xmlDoc.createElement("pyde0200:PersonDemographicDetails.Birth.Date")
  payeedob.setAttribute("contextRef", "RP"); 
  payeedob.textContent = window.employees[0].DOB;
  payee.appendChild(payeedob); 
  var payeeresidency = xmlDoc.createElement("pyde0205:Residency.TaxPurposesPersonStatus.Indicator")
  payeeresidency.setAttribute("contextRef", "RP"); 
  payeeresidency.textContent = "true";
  payee.appendChild(payeeresidency); 
  var payeepaymentbasis = xmlDoc.createElement("pylk0200:PaymentArrangement.PaymentBasis.Code")
  payeepaymentbasis.setAttribute("contextRef", "RP"); 
  payeepaymentbasis.textContent = "F";
  payee.appendChild(payeepaymentbasis); 
  var taxfreethreshold = xmlDoc.createElement("gfati0200:TaxOffsetClaim.TaxFreeThreshold.Indicator");
  taxfreethreshold.setAttribute("contextRef", "RP"); 
  taxfreethreshold.textContent = "true";
  payee.appendChild(taxfreethreshold); 
  var senioroffset = xmlDoc.createElement("gfati0200:TaxOffsetClaim.SeniorAustraliansTaxOffset.Indicator");
  senioroffset.setAttribute("contextRef", "RP"); 
  senioroffset.textContent = "false";
  payee.appendChild(senioroffset); 
  var zoneindicator = xmlDoc.createElement("gfati0200:TaxOffsetClaim.Zone.Indicator");
  zoneindicator.setAttribute("contextRef", "RP"); 
  zoneindicator.textContent = "true";
  payee.appendChild(zoneindicator); 
  var overseasforces = xmlDoc.createElement("gfati0200:TaxOffsetClaim.OverseasForces.Indicator");
  overseasforces.setAttribute("contextRef", "RP"); 
  overseasforces.textContent = "true";
  payee.appendChild(overseasforces); 
  var dependantspouse = xmlDoc.createElement("gfati0200:TaxOffsetClaim.DependantSpouse.Indicator");
  dependantspouse.setAttribute("contextRef", "RP"); 
  dependantspouse.textContent = "true";
  payee.appendChild(dependantspouse); 
  var invalidrelative = xmlDoc.createElement("gfati0200:TaxOffsetClaim.ParentSpouseOrInvalidRelative.Indicator");
  invalidrelative.setAttribute("contextRef", "RP"); 
  invalidrelative.textContent = "true";
  payee.appendChild(invalidrelative); 
  var help = xmlDoc.createElement("edte0200:StudentLoan.HigherEducationLoanProgramme.Indicator");
  help.setAttribute("contextRef", "RP"); 
  help.textContent = "true";
  var tradesupport = xmlDoc.createElement("edte0201:StudentLoan.TradeSupport.Indicator");
  tradesupport.setAttribute("contextRef", "RP"); 
  tradesupport.textContent = "true";
  payee.appendChild(tradesupport);
  var startuploan= xmlDoc.createElement("edte0202:StudentLoan.StudentStartupLoan.Indicator");
  startuploan.setAttribute("contextRef", "RP"); 
  startuploan.textContent = "true";
  payee.appendChild(startuploan); 
  var abstudy= xmlDoc.createElement("edte0203:StudentLoan.StudentStartupLoanAbstudy.Indicator");
  abstudy.setAttribute("contextRef", "RP"); 
  abstudy.textContent = "true";
  payee.appendChild(abstudy); 
  var SFSS= xmlDoc.createElement("edte0200:StudentLoan.StudentFinancialSupplementScheme.Indicator");
  SFSS.setAttribute("contextRef", "RP"); 
  SFSS.textContent = "false";
  payee.appendChild(SFSS); 
  var persondetails = xmlDoc.createElement("prsnstrcnm20200:PersonNameDetails");
  payee.appendChild(persondetails);
  var nametype= xmlDoc.createElement("pyde0200:PersonNameDetails.PersonNameType.Code");
  nametype.setAttribute("contextRef", "RP"); 
  nametype.textContent = "LGL";
  persondetails.appendChild(nametype); 
  var currencycode= xmlDoc.createElement("pyde0200:PersonNameDetails.Currency.Code");
  currencycode.setAttribute("contextRef", "RP"); 
  currencycode.textContent = "C";
  persondetails.appendChild(currencycode); 
  var familyname= xmlDoc.createElement("pyde0200:PersonNameDetails.FamilyName.Text");
  familyname.setAttribute("contextRef", "RP"); 
  familyname.textContent = "Higgins";
  persondetails.appendChild(familyname); 
  var givenname= xmlDoc.createElement("pyde0200:PersonNameDetails.GivenName.Text");
  givenname.setAttribute("contextRef", "RP"); 
  givenname.textContent = "Kate";
  persondetails.appendChild(givenname); 
  var othername= xmlDoc.createElement("pyde0200:PersonNameDetails.OtherGivenName.Text");
  othername.setAttribute("contextRef", "RP"); 
  othername.textContent = "Moss";
  persondetails.appendChild(othername); 
  var addressdetails = xmlDoc.createElement("address10202:AddressDetails");
  payee.appendChild(addressdetails);
  var osaddress= xmlDoc.createElement("pyde0200:AddressDetails.OverseasAddress.Indicator");
  osaddress.setAttribute("contextRef", "RP"); 
  osaddress.textContent = "false";
  addressdetails.appendChild(osaddress); 
  var addressusage= xmlDoc.createElement("pyde0201:AddressDetails.Usage.Code");
  addressusage.setAttribute("contextRef", "RP"); 
  addressusage.textContent = "RES";
  addressdetails.appendChild(addressusage); 
  var addressline1= xmlDoc.createElement("pyde0200:AddressDetails.Line1.Text");
  addressline1.setAttribute("contextRef", "RP"); 
  addressline1.textContent = "376 Albert Crescent";
  addressdetails.appendChild(addressline1); 
  var locality= xmlDoc.createElement("pyde0200:AddressDetails.LocalityName.Text");
  locality.setAttribute("contextRef", "RP"); 
  locality.textContent = "North Sydney";
  addressdetails.appendChild(locality); 
  var postcode= xmlDoc.createElement("pyde0200:AddressDetails.Postcode.Text");
  postcode.setAttribute("contextRef", "RP"); 
  postcode.textContent = "2100";
  addressdetails.appendChild(postcode); 
  var state= xmlDoc.createElement("pyde0200:AddressDetails.StateOrTerritory.Code");
  state.setAttribute("contextRef", "RP"); 
  state.textContent = "NSW";
  addressdetails.appendChild(state); 
  var country= xmlDoc.createElement("pyde0208:AddressDetails.CountryName.Text");
  country.setAttribute("contextRef", "RP"); 
  country.textContent = "AUSTRALIA";
  addressdetails.appendChild(country); 
  var declaration = xmlDoc.createElement("declaration10201:Declaration");
  payee.appendChild(declaration);
  var statementtype= xmlDoc.createElement("pyin0203:Declaration.StatementType.Code");
  statementtype.setAttribute("contextRef", "RP"); 
  statementtype.textContent = "HardCopy";
  declaration.appendChild(statementtype); 
  var statementaccepted= xmlDoc.createElement("pyin0203:Declaration.StatementAccepted.Indicator");
  statementaccepted.setAttribute("contextRef", "RP"); 
  statementaccepted.textContent = "true";
  declaration.appendChild(statementaccepted); 
  var declarationdate= xmlDoc.createElement("pyin0200:Declaration.Signature.Date");
  declarationdate.setAttribute("contextRef", "RP"); 
  declarationdate.textContent = "2015-08-15";
  declaration.appendChild(declarationdate); 
  var signatoryid= xmlDoc.createElement("pyin0200:Declaration.SignatoryIdentifier.Text");
  signatoryid.setAttribute("contextRef", "RP"); 
  signatoryid.textContent = "katehiggins@example.com";
  declaration.appendChild(signatoryid); 

  //------Supplier
  var suppliercode = xmlDoc.createElement("pyde0200:OrganisationDetails.OrganisationBranch.Code");
  suppliercode.setAttribute("contextRef", "INT"); 
  suppliercode.textContent = "123";
  xbrl.appendChild(suppliercode);

  var suppliername = xmlDoc.createElement("orgname10200:OrganisationNameDetails");
  xbrl.appendChild(suppliername);
  var nametype= xmlDoc.createElement("pyde0200:OrganisationNameDetails.OrganisationalNameType.Code");
  nametype.setAttribute("contextRef", "INT"); 
  nametype.textContent = "MN";
  suppliername.appendChild(nametype); 
  var nametext= xmlDoc.createElement("pyde0200:OrganisationNameDetails.OrganisationalName.Text");
  nametext.setAttribute("contextRef", "INT"); 
  nametext.textContent = "Darcyfinancial";
  suppliername.appendChild(nametext); 
  var supplieraddress = xmlDoc.createElement("address10202:AddressDetails");
  xbrl.appendChild(supplieraddress);
  var supplierosindicator= xmlDoc.createElement("pyde0200:AddressDetails.OverseasAddress.Indicator");
  supplierosindicator.setAttribute("contextRef", "INT"); 
  supplierosindicator.textContent = "false";
  supplieraddress.appendChild(supplierosindicator); 
  var supplieraddressusage= xmlDoc.createElement("pyde0201:AddressDetails.Usage.Code");
  supplieraddressusage.setAttribute("contextRef", "INT"); 
  supplieraddressusage.textContent = "BUS";
  supplieraddress.appendChild(supplieraddressusage); 
  var supplierattention= xmlDoc.createElement("pyde0200:AddressDetails.AttentionTo.Text");
  supplierattention.setAttribute("contextRef", "INT"); 
  supplierattention.textContent = "Attention Ground Floor Reception";
  supplieraddress.appendChild(supplierattention); 
  var supplierline1= xmlDoc.createElement("pyde0200:AddressDetails.Line1.Text");
  supplierline1.setAttribute("contextRef", "INT"); 
  supplierline1.textContent = "15, Phillip Street";
  supplieraddress.appendChild(supplierline1); 
  var supplierline2= xmlDoc.createElement("pyde0200:AddressDetails.Line2.Text");
  supplierline2.setAttribute("contextRef", "INT"); 
  supplierline2.textContent = "MeerCat Builing";
  supplieraddress.appendChild(supplierline2); 
  var supplierlocality= xmlDoc.createElement("pyde0200:AddressDetails.LocalityName.Text");
  supplierlocality.setAttribute("contextRef", "INT"); 
  supplierlocality.textContent = "Sydney";
  supplieraddress.appendChild(supplierlocality); 
  var supplierpostcode= xmlDoc.createElement("pyde0200:AddressDetails.Postcode.Text");
  supplierpostcode.setAttribute("contextRef", "INT"); 
  supplierpostcode.textContent = "2000";
  supplieraddress.appendChild(supplierpostcode); 
  var supplierstate= xmlDoc.createElement("pyde0200:AddressDetails.StateOrTerritory.Code");
  supplierstate.setAttribute("contextRef", "INT"); 
  supplierstate.textContent = "NSW";
  supplieraddress.appendChild(supplierstate); 
  var suppliercountry= xmlDoc.createElement("pyde0200:AddressDetails.CountryName.Text");
  suppliercountry.setAttribute("contextRef", "INT"); 
  suppliercountry.textContent = "Australia";
  supplieraddress.appendChild(suppliercountry); 
  var supplierpostageaddress = xmlDoc.createElement("address10202:AddressDetails");
  xbrl.appendChild(supplierpostageaddress);
  var supplierpostageosindicator= xmlDoc.createElement("pyde0200:AddressDetails.OverseasAddress.Indicator");
  supplierpostageosindicator.setAttribute("contextRef", "INT"); 
  supplierpostageosindicator.textContent = "false";
  supplierpostageaddress.appendChild(supplierpostageosindicator); 
  var supplierpostageaddressusage= xmlDoc.createElement("pyde0201:AddressDetails.Usage.Code");
  supplierpostageaddressusage.setAttribute("contextRef", "INT"); 
  supplierpostageaddressusage.textContent = "POS";
  supplierpostageaddress.appendChild(supplierpostageaddressusage); 
  var supplierpostageattention= xmlDoc.createElement("pyde0200:AddressDetails.AttentionTo.Text");
  supplierpostageattention.setAttribute("contextRef", "INT"); 
  supplierpostageattention.textContent = "C/O Building Manager";
  supplierpostageaddress.appendChild(supplierpostageattention); 
  var supplierpostageline1= xmlDoc.createElement("pyde0200:AddressDetails.Line1.Text");
  supplierpostageline1.setAttribute("contextRef", "INT"); 
  supplierpostageline1.textContent = "15, Phillip Street";
  supplierpostageaddress.appendChild(supplierpostageline1); 
  var supplierpostageline2= xmlDoc.createElement("pyde0200:AddressDetails.Line2.Text");
  supplierpostageline2.setAttribute("contextRef", "INT"); 
  supplierpostageline2.textContent = "MeerCat Builing";
  supplierpostageaddress.appendChild(supplierpostageline2); 
  var supplierpostagelocality= xmlDoc.createElement("pyde0200:AddressDetails.LocalityName.Text");
  supplierpostagelocality.setAttribute("contextRef", "INT"); 
  supplierpostagelocality.textContent = "Sydney";
  supplierpostageaddress.appendChild(supplierpostagelocality); 
  var supplierpostagepostcode= xmlDoc.createElement("pyde0200:AddressDetails.Postcode.Text");
  supplierpostagepostcode.setAttribute("contextRef", "INT"); 
  supplierpostagepostcode.textContent = "2000";
  supplierpostageaddress.appendChild(supplierpostagepostcode); 
  var supplierpostagestate= xmlDoc.createElement("pyde0200:AddressDetails.StateOrTerritory.Code");
  supplierpostagestate.setAttribute("contextRef", "INT"); 
  supplierpostagestate.textContent = "NSW";
  supplierpostageaddress.appendChild(supplierpostagestate); 
  var supplierpostagecountry= xmlDoc.createElement("pyde0200:AddressDetails.CountryName.Text");
  supplierpostagecountry.setAttribute("contextRef", "INT"); 
  supplierpostagecountry.textContent = "Australia";
  supplierpostageaddress.appendChild(supplierpostagecountry); 
  var suppliercontactname= xmlDoc.createElement("prsnunstrcnm10201:PersonUnstructuredName");
  xbrl.appendChild(suppliercontactname);
  var suppliercontactcode= xmlDoc.createElement("pyde0200:PersonUnstructuredName.Usage.Code");
  suppliercontactcode.setAttribute("contextRef", "INT"); 
  suppliercontactcode.textContent = "Contact";
  suppliercontactname.appendChild(suppliercontactcode); 
  var suppliercontactnametext= xmlDoc.createElement("pyde0200:PersonUnstructuredName.FullName.Text");
  suppliercontactnametext.setAttribute("contextRef", "INT"); 
  suppliercontactnametext.textContent = "Tony Agent";
  suppliercontactname.appendChild(suppliercontactnametext); 
  var supplierphone= xmlDoc.createElement("phone10200:ElectronicContactTelephone");
  xbrl.appendChild(supplierphone);
  var supplierphoneusage= xmlDoc.createElement("pyde0200:ElecronicContact.Telephone.Usage.Code");
  supplierphoneusage.setAttribute("contextRef", "INT"); 
  supplierphoneusage.textContent = "03";
  supplierphone.appendChild(supplierphoneusage); 
  var supplierphoneserviceline= xmlDoc.createElement("pyde0200:ElecronicContact.Telephone.ServiceLine.Code");
  supplierphoneserviceline.setAttribute("contextRef", "INT"); 
  supplierphoneserviceline.textContent = "01";
  supplierphone.appendChild(supplierphoneserviceline); 
  var supplierphonearea= xmlDoc.createElement("pyde0200:ElecronicContact.Telephone.Area.Code");
  supplierphonearea.setAttribute("contextRef", "INT"); 
  supplierphonearea.textContent = "02";
  supplierphone.appendChild(supplierphonearea); 
  var supplierphoneminimal= xmlDoc.createElement("pyde0200:ElecronicContact.Telephone.Minimal.Number");
  supplierphoneminimal.setAttribute("contextRef", "INT"); 
  supplierphoneminimal.textContent = "25928887";
  supplierphone.appendChild(supplierphoneminimal); 
  var supplierfax= xmlDoc.createElement("fax10200:ElectronicContactFacsimile");
  xbrl.appendChild(supplierfax);
  var supplierfaxusage= xmlDoc.createElement("pyde0200:ElecronicContact.Facsimile.Usage.Code");
  supplierfaxusage.setAttribute("contextRef", "INT"); 
  supplierfaxusage.textContent = "03";
  supplierfax.appendChild(supplierfaxusage); 
  var supplierfaxarea= xmlDoc.createElement("pyde0200:ElecronicContact.Facsimile.Area.Code");
  supplierfaxarea.setAttribute("contextRef", "INT"); 
  supplierfaxarea.textContent = "02";
  supplierfax.appendChild(supplierfaxarea); 
  var supplierfaxminimal= xmlDoc.createElement("pyde0200:ElecronicContact.Facsimile.Minimal.Number");
  supplierfaxminimal.setAttribute("contextRef", "INT"); 
  supplierfaxminimal.textContent = "25928887";
  supplierfax.appendChild(supplierfaxminimal); 
  var supplierdeclaration = xmlDoc.createElement("declaration10201:Declaration");
  xbrl.appendChild(supplierdeclaration);
  var supplierstatementtype= xmlDoc.createElement("pyin0203:Declaration.StatementType.Code");
  supplierstatementtype.setAttribute("contextRef", "INT"); 
  supplierstatementtype.textContent = "TrueAndCorrect";
  supplierdeclaration.appendChild(supplierstatementtype); 
  var supplierstatementaccepted= xmlDoc.createElement("pyin0203:Declaration.StatementAccepted.Indicator");
  supplierstatementaccepted.setAttribute("contextRef", "INT"); 
  supplierstatementaccepted.textContent = "true";
  supplierdeclaration.appendChild(supplierstatementaccepted); 
  var supplierdeclarationdate= xmlDoc.createElement("pyin0200:Declaration.Signature.Date");
  supplierdeclarationdate.setAttribute("contextRef", "INT"); 
  supplierdeclarationdate.textContent = "2017-07-17";
  supplierdeclaration.appendChild(supplierdeclarationdate); 
  var suppliersignatoryid= xmlDoc.createElement("pyin0200:Declaration.SignatoryIdentifier.Text");
  suppliersignatoryid.setAttribute("contextRef", "INT"); 
  suppliersignatoryid.textContent = "Sydney Tax";
  declaration.appendChild(suppliersignatoryid); 

  //Payer
  var payeraddress = xmlDoc.createElement("address10202:AddressDetails");
  xbrl.appendChild(payeraddress);
  var payerosindicator= xmlDoc.createElement("pyde0200:AddressDetails.OverseasAddress.Indicator");
  payerosindicator.setAttribute("contextRef", "RP"); 
  payerosindicator.textContent = "false";
  payeraddress.appendChild(payerosindicator); 
  var payeraddressusage= xmlDoc.createElement("pyde0201:AddressDetails.Usage.Code");
  payeraddressusage.setAttribute("contextRef", "RP"); 
  payeraddressusage.textContent = "BUS";
  payeraddress.appendChild(payeraddressusage); 
  //var payerattention= xmlDoc.createElement("pyde0200:AddressDetails.AttentionTo.Text");
  //payerattention.setAttribute("contextRef", "RP"); 
  //payerattention.textContent = "Attention Ground Floor Reception";
  //payeraddress.appendChild(payerattention); 
  var payerline1= xmlDoc.createElement("pyde0200:AddressDetails.Line1.Text");
  payerline1.setAttribute("contextRef", "RP"); 
  payerline1.textContent = "21 Arthur Street";
  payeraddress.appendChild(payerline1); 
  var payerline2= xmlDoc.createElement("pyde0200:AddressDetails.Line2.Text");
  payerline2.setAttribute("contextRef", "RP"); 
  payerline2.textContent = "Sussex House";
  payeraddress.appendChild(payerline2); 
  var payerlocality= xmlDoc.createElement("pyde0200:AddressDetails.LocalityName.Text");
  payerlocality.setAttribute("contextRef", "RP"); 
  payerlocality.textContent = "Sydney";
  payeraddress.appendChild(payerlocality); 
  var payerpostcode= xmlDoc.createElement("pyde0200:AddressDetails.Postcode.Text");
  payerpostcode.setAttribute("contextRef", "RP"); 
  payerpostcode.textContent = "2000";
  payeraddress.appendChild(payerpostcode); 
  var payerstate= xmlDoc.createElement("pyde0200:AddressDetails.StateOrTerritory.Code");
  payerstate.setAttribute("contextRef", "RP"); 
  payerstate.textContent = "NSW";
  payeraddress.appendChild(payerstate); 
  var payercountry= xmlDoc.createElement("pyde0200:AddressDetails.CountryName.Text");
  payercountry.setAttribute("contextRef", "RP"); 
  payercountry.textContent = "Australia";
  payeraddress.appendChild(payercountry); 
  var serializer = new XMLSerializer();
  var xmlString = serializer.serializeToString(xmlDoc);
  console.log(vkbeautify.xml(xmlString));
}

function validateXBRLOld() {
  window.valid = true;
  numb = ['ABN','contactNumber']
  for (var key in window.payer) {
      if(window.payer[key].trim)
         window.payer[key] = window.payer[key].trim(); 
  }
  for (var i in numb) {
    window.payer[numb[i]] = stripwhitecommas(window.payer[numb[i]]);
  }
  window.payer.endDate = "3006" + window.payer.financialYear;
  if (!window.payer.ABNBranch || !window.payer.ABNBranch.length) window.payer.ABNBranch = "001";



	validate.validators.abn = function($abn, options, key, attributes) {
    var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    // strip anything other than digits
    $abn = $abn.toString().replace("/[^\d]/","");

    // check length is 11 digits
    if ($abn.length==11) {
        // apply ato check method 
        var sum = 0;
        weights.forEach(function(weight, position) {
            var digit = $abn[position] - (position ? 0 : 1);
            sum += weight * digit;
        })
				if((sum % 89)==0){
					return null;
				} else {
					return "Invalid ABN"
				}
    } 
		return "ABN Length Invalid";
	};

  validate.validators.taxamount = function(payments, options, key, attributes) {
    if (window.employees[options].taxWithheld > (window.employees[options].grossPayments + window.employees[options].allowances + window.employees[options].lumpSumA + (window.employees[options].lumpSumB * 0.05) + window.employees[options].lumpSumE)) {
      return "The Total tax withheld field is greater than the sum of Gross payments field + Total allowances field + Lump sum payment A field + 5% of the Lump sum payment B field + Lump sum payment E field + Community Development Employment Projects payments field.";
    }
    return null;
  };

	validate.validators.tfn = function($tfn, options, key, attributes) {
    var weights = [ 1, 4, 3, 7, 5, 8, 6, 9, 10];
    var valids = [
      "111111111",
      "000000000",
      "333333333",
      "987654321",
    ]

    // strip anything other than digits
    $tfn = $tfn.toString().replace("/[^\d]/","");

    if (valids.includes($tfn)){
      return null;
    }

    // check length is 11 digits
    if ($tfn.length==9) {
        // apply ato check method 
        var sum = 0;
        weights.forEach(function(weight, position) {
            //var digit = $tfn[position] - (position ? 0 : 1);
            var digit = $tfn[position];
            sum += weight * digit;
        })
				if((sum % 11)==0){
					return null;
				} else {
					return "Invalid TFN"
				}
    } 
		return "TFN Length Invalid";
	};

	validate.validators.customdate = function(value, options, key, attributes) {
    if(moment(value,["Do MMMM YYYY","DDMMYYYY"]).isValid()){
      return null;
    } else {
      return "Invalid Date"
    }
	};

  var payerConstraints = {
    ABN: {
      presence: true,
			abn: true,
      length: {
        maximum: 11
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    ABNBranch: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 3
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    financialYear: {
      presence: true,
      length: {
        minimum: 4,
        maximum: 4
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    endDate: {
      presence: true,
      customdate: true
    },
    name: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'&-]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    contactName: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'&-]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    contactNumber: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 15
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    tradingname: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'&-]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    address: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    address2: {
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    suburb: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 27
      },
      format: {
        pattern: "\[a-z\x20]+$",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 3
      },
      format: {
        pattern: "[A-Z]+",
        message: "can only contain A-Z"
      }
    },
    postcode: {
      presence: true,
      format: {
        pattern: "\\d{4}"
      }
    }
  };
  var payerErrors = validate(window.payer, payerConstraints)

  empnumb = ['TFN','taxWithheld','grossPayments',
    'allowances',
    'lumpsumA',
    'lumpsumB',
    'lumpsumD',
    'lumpsumE',
    'fb',
    'superSGC',
    ]
  

  var employeeConstraints = {
    TFN: {
      presence: true,
			tfn: true,
      length: {
        minimum: 9,
        maximum: 9
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    DOB: {
      presence: true,
      customdate: true
    },
    periodStart: {
      presence: true,
      customdate: true
    },
    periodEnd: {
      presence: true,
      customdate: true
    },
    taxWithheld: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    grossPayments: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    allowances: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumA: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumB: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumD: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumE: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    fb: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    superSGC: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    workplaceGiving: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    union: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    foreign: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    annuity: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    amendment: {
      presence: true,
      format: {
        pattern: "^[O,A]{1}$"
      }
    },
    fbtExempt: {
      format: {
        pattern: "^[Y,N]{1}$"
      }
    },
    name: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    secondName: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    surname: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        //pattern: "[a-z0-9]+",
        pattern: "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    address: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    address2: {
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    suburb: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 27
      },
      format: {
        pattern: "\[a-z\x20]+$",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 3
      },
      format: {
        pattern: "[A-Z]+",
        message: "can only contain A-Z"
      }
    },
    postcode: {
      presence: true,
      format: {
        pattern: "\\d{4}"
      }
    }
  };

  window.employeeErrors = []
  window.errorNames = []
  for (var i in window.employees) {
    for (var j in empnumb) {
      window.employees[i][empnumb[j]] = stripwhitecommas(window.employees[i][empnumb[j]]);
    }

    //for (var key in window.employees[i]) {
        //if(window.employees[i][key].trim)
           //window.employees[i][key] = window.employees[i][key].trim(); 
    //}

    //window.employees[i].annuity = "0";
    var errors = validate(window.employees[i], employeeConstraints);
    if (errors) {
      window.employeeErrors.push(errors)
      window.errorNames.push(window.employees[i].surname + ', ' + window.employees[i].name);
    }
  }

  $('#console').empty();
  $("#validateModal").modal() 
  var div = document.getElementById('console');
  if(payerErrors) {
    window.valid = false;
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH PAYER DATA ---");
    p.appendChild(content);
    var br = document.createElement("br");
    p.appendChild(br);
    for (var property in payerErrors) {
      var content = document.createTextNode(property + ":");
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var i in payerErrors[property]) {
        var content = document.createTextNode(i +":" + payerErrors[property][i]);
    var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
      }
    }
    div.appendChild(p);
  } else {
    var p = document.createElement("p")                
    p.style.color = "green";
    var content = document.createTextNode("---PAYER DATA VALID---");
    var br = document.createElement("br");
    p.appendChild(content);
    p.appendChild(br);
    div.appendChild(p);
  }
  if(window.employeeErrors.length > 0) {
    window.valid = false;
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH EMPLOYEE DATA ---");
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    for (var i in window.employeeErrors) {
      var content = document.createTextNode("---EMPLOYEE: " + window.errorNames[i] + " ---");
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var property in window.employeeErrors[i]) {
        var content = document.createTextNode(property + ":");
        var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
        for (var j in window.employeeErrors[i][property]) {
          var content = document.createTextNode(window.employeeErrors[i][property][j]);
          var br = document.createElement("br");
          p.appendChild(br);
          p.appendChild(content);
        }
      }
    }
    div.appendChild(p);
  } else {
    var p = document.createElement("p")                
    p.style.color = "green";
    var content = document.createTextNode("---EMPLOYEE DATA VALID---");
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    div.appendChild(p);
  }
  openfile();

}
function openfile() {
  var createbutton = document.getElementById('createbutton');
  var pdfbutton = document.getElementById('pdfbutton');
  if (window.valid) {
    createbutton.disabled = false
    createbutton.onclick = function() {createXBRL()};
    pdfbutton.disabled = false
    pdfbutton.onclick = function() {makePDF()};
  } else {
    createbutton.disabled = true
    createbutton.onclick = function(){};
    pdfbutton.disabled = true
    pdfbutton.onclick = function(){};
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function createXBRL() {
  window.xbrl = "";
  addSupplierDataRecords();
  addPayerIdentityDataRecord();
  addSoftwareDataRecord();
  for (var i = 0; i < window.employees.length; i++) {
    addPaymentSummaryDataRecord(i);
  }
  addFileTotalRecord();
  download("TFND", window.xbrl);
}

function addSupplierDataRecords() {
  //record length and identifier
  window.empdupe += "628IDENTREGISTER1"
  //ABN
  window.empdupe += window.payer.ABN
  //Run Type P = Production, T = Test
  window.empdupe += "P"
  // ReportEndDate
  window.empdupe += window.payer.endDate
  //Data Type payg withholding summaries must be E, Type of report must be A, format of report must be P
  window.empdupe += "EAP"
  //Report specification number
  window.empdupe += "FEMPA012.0"
  //Filler
  catAlphanumeric(578, " ");
  window.empdupe += "\r\n";
  //record length and identifier
  window.empdupe += "628IDENTREGISTER2"
  //SupplierName
  catAlphanumeric(200, window.payer.name);
  //Supplier Contact Name
  catAlphanumeric(38, window.payer.contactName);
  //Supplier Number
  catAlphanumeric(15, window.payer.contactNumber);
  //Filler
  catAlphanumeric(15 + 16 + 327, " ");
  window.empdupe += "\r\n";
  //record length and identifier
  window.empdupe += "628IDENTREGISTER3"
  //Supplier street address
  catAlphanumeric(38,window.payer.address);
  catAlphanumeric(38,window.payer.address2);
  //Supplier suburb
  catAlphanumeric(27, window.payer.suburb);
  //Supplier state
  catAlphanumeric(3, window.payer.state);
  //Supplier postcode
  catNumeric(4, window.payer.postcode);
  //Supplier country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Supplier postal add 
  catAlphanumeric(38 + 38 + 27 + 3, "  ");
  catNumeric(4,0);
  catAlphanumeric(20, "  ");
  //Supplier email
  catAlphanumeric(76, "  ");
  //Filler
  catAlphanumeric(275, "  ");
  window.empdupe += "\r\n";

}

function addPayerIdentityDataRecord() {
  //record length and identifier
  window.empdupe += "628IDENTITY"
  //ABN
  window.empdupe += window.payer.ABN
  //ABN Branch Number
  catNumeric(3,window.payer.ABNBranch);
  //Financial Year
  catNumeric(4,window.payer.financialYear);
  //Payer Name
  catAlphanumeric(200, window.payer.name);
  //Payer Trading Name
  catAlphanumeric(200, window.payer.tradingName);
  //Payer street address
  catAlphanumeric(38, window.payer.address);
  catAlphanumeric(38, window.payer.address2);
  //Payer suburb
  catAlphanumeric(27, window.payer.suburb);
  //Payer state
  catAlphanumeric(3, window.payer.state);
  //Payer postcode
  catNumeric(4, window.payer.postcode);
  //Payer country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Payer Contact Name
  catAlphanumeric(38, window.payer.contactName);
  //Supplier Number
  catAlphanumeric(15, window.payer.contactNumber);
  //Filler
  catAlphanumeric(15 + 1, "  ");
  window.empdupe += "\r\n";
}


function addSoftwareDataRecord() {
  //record length and identifier
  window.empdupe += "628SOFTWARE"
  //Software product Type
  catAlphanumeric(80, "COMMERCIAL Sean Darcy DarcyFinancial www.empdupe.com.au EmpdupeCreator 1");
  //ECI tested
  window.empdupe += "Y"
  //Filler
  catAlphanumeric(536, "  ");
  window.empdupe += "\r\n";
}

function addPaymentSummaryDataRecord(arrayPosition) {
  //record length and identifier and Income type S for salary
  window.empdupe += "628DINBS"
  //TFN
  catNumeric(9,window.employees[arrayPosition].TFN);
  //DOB Year
  catDate(window.employees[arrayPosition].DOB);
  //Employee Surname
  catAlphanumeric(30, window.employees[arrayPosition].surname);
  //Employee Name
  catAlphanumeric(15, window.employees[arrayPosition].name);
  //Employee Second Name
  catAlphanumeric(15, window.employees[arrayPosition].secondName);
  //Employee street address
  catAlphanumeric(38, window.employees[arrayPosition].address);
  catAlphanumeric(38, window.employees[arrayPosition].address2);
  //Employee suburb
  catAlphanumeric(27, window.employees[arrayPosition].suburb);
  //Employee state
  catAlphanumeric(3, window.employees[arrayPosition].state);
  //Employee postcode
  catNumeric(4, window.employees[arrayPosition].postcode);
  //Payer country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Period Start
  catDate(window.employees[arrayPosition].periodStart);
  //Period End
  catDate(window.employees[arrayPosition].periodEnd);
  //Tax Withheld
  catNumeric(8, window.employees[arrayPosition].taxWithheld);
  //Gross Payments
  catNumeric(8, window.employees[arrayPosition].grossPayments);
  //Total Allowances
  catNumeric(8, window.employees[arrayPosition].allowances);
  //Lumpsum A
  catNumeric(8, window.employees[arrayPosition].lumpsumA);
  //Lumpsum B
  catNumeric(8, window.employees[arrayPosition].lumpsumB);
  //Lumpsum D
  catNumeric(8, window.employees[arrayPosition].lumpsumD);
  //Lumpsum E
  catNumeric(8, window.employees[arrayPosition].lumpsumE);
  //Community Development Employment Project
  catNumeric(8, 0);
  //Filler
  catNumeric(8, 0);
  //Reportable Fringe benefit
  catNumeric(8, window.employees[arrayPosition].fb);
  //Amendment Indicator
  catAlphanumeric(1, window.employees[arrayPosition].amendment);
  //Reportable Employer Superannuation Contributions
  catNumeric(8, window.employees[arrayPosition].superSGC);
  //Lump Sum A type
  catAlphanumeric(1, window.employees[arrayPosition].lumpsumAtype);
  //Workplace Giving
  catNumeric(8, window.employees[arrayPosition].workplaceGiving);
  //Union Fees
  catNumeric(8, window.employees[arrayPosition].union);
  //Exempt foreign employment income
  catNumeric(8, window.employees[arrayPosition].foreign);
  //Annuity Return of Capital
  catNumeric(8, window.employees[arrayPosition].annuity);
  //FBT Exemption
  catAlphanumeric(1, window.employees[arrayPosition].fbtExempt);
  //Filler
  catAlphanumeric(274, "  ");
  window.empdupe += "\r\n";
}

function addFileTotalRecord() {
  //record length and identifier
  window.empdupe += "628FILE-TOTAL"
  //Annuity Return of Capital
  catNumeric(8, window.employees.length + 6);
  //Filler
  catAlphanumeric(607, "  ");
  window.empdupe += "\r\n";
}
function catxAlphanumeric(length, text) {
  window.empdupe += padding_right(text, "x", length)
}

function catAlphanumeric(length, text) {
  window.empdupe += padding_right(text, " ", length)
}
function catDate(date) {
  window.empdupe += moment(date,["Do MMMM YYYY","DDMMYYYY"]).format('DDMMYYYY');
}
function catNumeric(length, num) {
  var n = String(num); 
  window.empdupe += padding_left(n, "0", length)
}
// left padding s with c to a total of n chars
function padding_left(s, c, n) {
  if (s == null || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s = c + s;
  }
  return s;
}
// right padding s with c to a total of n chars
function padding_right(s, c, n) {
  if (s == null || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s += c;
  }
  return s;
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = "";
            }
            o[this.name] = this.value || '';
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function checkABN(str) {
    if (!str || str.length !== 11) {
        return false;
    }
    var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        checksum = str.split('').map(Number).reduce(
        function(total, digit, index) {
            if (!index) {
                digit--;
            }
            return total + (digit * weights[index]);
        },
        0
    );

    if (!checksum || checksum % 89 !== 0) {
        return false;
    }

    return true;
}

function formatCapitalize(element) {
  element.value = toTitleCase(element.value.toString());
}

function moneyNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tableCreate() {
    var tbdy = document.getElementById('employeetable');
    tbdy.innerHTML = '';
    for (var i = 0; i < window.employees.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].name +  ' ' +window.employees[i].surname))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].TFN))
        tr.appendChild(td)
        var td = document.createElement('td');
        //td.appendChild(document.createTextNode("$" + moneyNumber(window.employees[i].grossPayments)));
        tr.appendChild(td)
        var td = document.createElement('td');
        //td.appendChild(document.createTextNode("$" + moneyNumber(window.employees[i].taxWithheld)));
        tr.appendChild(td)
        var td = document.createElement('td');
        var btn = document.createElement('button');
        btn.className = 'btn btn-warning';
        btn.setAttribute('data-param', i);
        btn.onclick = function () {editEmployee(this.getAttribute('data-param'));}; 
        btn.innerHTML = "Edit";
        td.appendChild(btn)
        tr.appendChild(td)
        var td = document.createElement('td');
        var btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.setAttribute('data-param', i);
        btn.onclick = function () {deleteEmployee(this.getAttribute('data-param'));}; 
        btn.innerHTML = "Delete";
        td.appendChild(btn)
        tr.appendChild(td)
        tbdy.appendChild(tr);
    }
}

function formatabntfn(element) {
  element.value = formatcomma(element.value);
}
function formatcomma(element) {
  return element.toString().replace(/ /g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatdate(element) {
  element.value = moment(element.value, ["DDMMYYYY","DDMMMMYYYY", "DoMMMMYYYY", "DoMMYYYY"], false).format('Do MMMM YYYY');
}

function initdates() {
  var dobpicker = new Pikaday(
    {
        field: document.getElementById('dobbox'),
        firstDay: 1,
        maxDate: new Date(),
        onSelect: function() {
            var date = this.getMoment().format('Do MMMM YYYY');
            document.getElementById('dobbox').value = date;
        }
    });
}

$('.dropDownListItem').click(function(e) {
    var element = document.getElementById('exemptfbt');
    var name = e.currentTarget;
    if (name.getAttribute("data-name") == "E") {
      window.excluded = "Y"
      element.innerHTML = "E<span class='caret'></span>"
    } else {
      element.innerHTML = "N<span class='caret'></span>"
      window.excluded = "N"
    }
});
function makePDF() {
  var background = new Image;
  background.src = 'background.jpg';
  window.doc = new jsPDF()
  background.onload = function() {
    for(var i = 0; i < window.employees.length; i++) {
      if(i > 0) window.doc.addPage();
      window.doc.addImage(background, 'JPEG', 0, 0,210,297);
      window.doc.setFontSize(10)
      rightText(moneyNumber(window.employees[i].taxWithheld), 185, 99)
      rightText(moneyNumber(window.employees[i].lumpsumA), 175, 115)
      window.doc.text(188, 115, window.employees[i].lumpsumAtype);
      rightText(moneyNumber(window.employees[i].lumpsumB), 175, 125)
      rightText(moneyNumber(window.employees[i].lumpsumD), 175, 135)
      rightText(moneyNumber(window.employees[i].lumpsumE), 175, 145)
      rightText(moneyNumber(window.employees[i].grossPayments), 109, 115)
      rightText("0", 109, 125)
      rightText(moneyNumber(window.employees[i].fb), 109, 135)
      rightText(moneyNumber(window.employees[i].superSGC), 109, 145)
      rightText(moneyNumber(window.employees[i].allowances), 109, 155)
      window.doc.text(61, 27, 'Payment summary for the year ended 30 June ' + window.payer.financialYear);
      var arr = [ window.employees[i].name + " " + window.employees[i].surname, window.employees[i].address, window.employees[i].suburb, window.employees[i].state + ' ' + window.employees[i].postcode];
      if (window.employees[i].address2.length > 0 && window.employees[i].address2.trim()) {
        arr.splice(2, 0, window.employees[i].address2);
      }
      window.doc.text(25, 48, arr);
      window.doc.text(84, 88,window.employees[i].periodStart);
      window.doc.text(133, 88,window.employees[i].periodEnd);
      window.doc.text(56, 100,(formatcomma(window.employees[i].TFN)));
      window.doc.text(81, 261, (formatcomma(window.payer.ABN)));
      window.doc.text(160, 261, window.payer.ABNBranch);
      window.doc.text(40, 268, window.payer.name);
      window.doc.text(65, 278, window.payer.contactName);
      window.doc.text(160, 278, moment().format('Do MMMM YYYY'));
    }
    window.doc.save('PaymentSummary.pdf')
  };

}
var rightText = function(text, x, y) {
    var textWidth = window.doc.getStringUnitWidth(text) * window.doc.internal.getFontSize() / window.doc.internal.scaleFactor;
    var textOffset = (x - textWidth);
    window.doc.text(textOffset, y, text);
}

function main() {

  //This is to test uncomment the old stuff and delete next 4 when done
  //window.employees = [];
  //window.payer = {};
  window.employees = window.testEmployee;
  window.payer = window.testPayer;
  tableCreate();
  openvalidate();
  validateXBRL()


  window.excluded = "N"
  window.now = moment();
  if (window.now.month() < 6) {
    window.now.set('year', now.year() -1);
  }
  window.now.set('month', 5);
  window.now.set('date', 30);
  window.endFY = moment(window.now);
  window.startFY = moment(window.now.subtract(1, 'years').add(1,'days'));
  $("#fybox").val(window.endFY.format("YYYY"));

  initdates();

}
main();
