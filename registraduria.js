

$(document).ready(function(){
    var  currentDate = new Date();
    var strDate = currentDate.getFullYear().toString()+currentDate.getMonth().toString()+currentDate.getDay().toString()+currentDate.getHours().toString()+currentDate.getMinutes().toString()+currentDate.getSeconds().toString()+currentDate.getMilliseconds().toString(); 
	var url2='http://localhost:8181/' + strDate;
	callCORS(url2);
});


function callCORS(url) {
    var resp ="";
	document.getElementById('lblXHR').innerHTML ='';
	 var xhr;
    try{
        xhr = new XMLHttpRequest();
		document.getElementById('lblXHR').innerHTML ='XMLHttpRequest';
		
		
		
    }catch (e){
        try{
            xhr = new XDomainRequest();
			document.getElementById('lblXHR').innerHTML ='XDomainRequest';
        } catch (e){
            try{
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
				document.getElementById('lblXHR').innerHTML ='Msxml2.XMLHTTP';
            }catch (e){
                try{
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
					document.getElementById('lblXHR').innerHTML ='Microsoft.XMLHTTP';
                }catch (e){
                     document.getElementById('lblXHR').innerHTML ='Ex ActiveXObject Microsoft.XMLHTTP'                        
                }
            }
        }			
    }
	
	if (xhr){
			 try
			 {
				xhr.open('GET', url, false);
				xhr.send(null);
				if (xhr.status == 200)
				{
				  document.getElementById('lblXHRResponse').innerHTML=xhr.responseText;
				}
			 }catch(error2)
			 {
				 document.getElementById('lblXHRError').innerHTML = error2;
			 }
			 
		}		
	
	
	try {
		
		var msie=detectIE();
	   
		if (msie==11 && window.XDomainRequest) {
			
			document.getElementById('lblXDomainRequest').innerHTML = 'Is XDomainRequest';
			// Use Microsoft XDR
			var xdr = new XDomainRequest();
			xdr.open("get", url);
			xdr.onload = function () {
				 resp = $.parseJSON(xdr.responseText);
				if (resp == null || typeof (resp) == 'undefined')
				{
					resp = $.parseJSON(data.firstChild.textContent);
				}        
				document.getElementById('lblJSON').innerHTML = resp;
			};
			xdr.send();
		} else {
				  $.ajax({
				  type: 'GET',
				  url: url,
				  headers: {},				 
				  processData: true,
				  data: {},
				  dataType: "json",
				  contentType: 'text/html',				  
				  success: function (data) { 
					 
					  document.getElementById('lblJSON').innerHTML = JSON.stringify(data);
					},
				  error: function(jqXHR, textStatus, errorThrown) {
					document.getElementById('lblError').innerHTML = "Error al obtener IP y MAC: " + jqXHR.status + " " + textStatus + " " + errorThrown;
				  }
				  });
		}
	} catch (error2) {
		  document.getElementById('lblError').innerHTML = error2;
		
	}
    
}


function detectIE() {
    var ua = window.navigator.userAgent;
    document.getElementById('lbluserAgent').innerHTML = ua;
    // Test values; Uncomment to check result …
  
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    
    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    
    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
  
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
  
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
  
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
  
    // other browser
    return 0;
  }