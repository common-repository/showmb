
//Fin Header 
//Inicio recogida del parametro según el script
var smbscripts = document.getElementsByTagName('script');
var smbmyScript = smbscripts[smbscripts.length - 1];
var smbqueryString = smbmyScript.src.replace(/^[^\?]+\??/, '');
var smbparams = smbparseQuery(smbqueryString);

    function smbparseQuery(smbquery) {
        var smbParams = new Object();
        if (!smbquery) return smbParams;
        var smbPairs = smbquery.split(/[;&]/);
        for (var i = 0; i < smbPairs.length; i++ ) {
            var smbKeyVal = smbPairs[i].split('!');
            if ( ! smbKeyVal || smbKeyVal.length != 2 ) continue;
            var smbkey = unescape( smbKeyVal[0] );
            smbval = unescape( smbKeyVal[1] );
            smbval = smbval.replace(/\+/g, ' ');
            smbParams[smbkey] = smbval;
   }
   return smbParams;
}
smbparseQuery();

var control_divs=jQuery('.widget_smb_'+ smbval ).length;

    document.write('<div class="widget_smb contenedor widget_smb_'+ smbval +' div_'+control_divs+'"><ul class="topnav widget_alejandro"></ul></div>');




    //Parametros Cookies

    smbval_cookie = smbval.replace(/=/g,'*');
    var smbvidadecookie_segundos=24*60*60*1000;//24*60*60*1000
    //Fin Parametros Cookies
    //Funcion conexion datos
    function smbintercambiophp(smbval, smbval_cookie, control_divs) {
      jQuery.ajax({

        type: 'POST',
        url: 'https://www.showmb.com/~widget/versiones/ver16/datos.php',      
        data:{id: smbval, from: 'wp'},
        success:    function(smbdatos) {

            var smbrecogida   = smbdatos;
            var error_json=0;
            function smbplease() {
                smbapartado = JSON.parse(smbrecogida);
            }
            try { 
                smbplease();
            }
            catch(err) {
                var error_json=1;
                
            }

            var error_datosphp=0;
            if(error_json==1){//error en formato json en archivo de llegada
                
               jQuery('.widget_smb_'+ smbval +'.div_'+control_divs+' .topnav.widget_alejandro').append("<li class='smb_error'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i><a class='active' href='#' target='_blank' onclick='return false;'> Error 603: Problem in database</a></li>"); 
            }else{
                var smbtexto_cookie = '';

                for (var smbcampo in smbapartado){
                    if(smbcampo=='error'){//error en cosulta de parámetro en el PHP
                        var error_datosphp=1;
                        jQuery('.widget_smb_'+ smbval +'.div_'+control_divs+' .topnav.widget_alejandro').append("<li class='smb_error'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i><a class='active' href='#' target='_blank' onclick='return false;'> Error "+smbapartado[smbcampo]+"</a></li>");
                       
                    }else{

                        var smblosvalores = smbapartado[smbcampo];
                        var smbseparador = "|";
                        if(smblosvalores['red']=='smb'){
                            jQuerysmbico = 'icomoon icomoon-fa-sigma';
                            var smbenlace_perfil=smblosvalores['url'];
                        }else{
                                jQuerysmbico = smblosvalores['red'];
                        }

                        jQuery('.widget_smb_'+ smbval +'.div_'+control_divs+' .topnav.widget_alejandro').append("<li><a href='" + smblosvalores['url'] +"' target='_blank'><i class='fa fa-" + jQuerysmbico + "' aria-hidden='true'></i>" +  smblosvalores['seguidores']);

                        smbtexto_cookie = smbtexto_cookie + smbseparador + smblosvalores['red'] + ',' + smblosvalores['url'] + ',' + smblosvalores['seguidores']; 
                    }
                }
                if(error_datosphp!=1){
                        jQuery('.widget_smb_'+ smbval +'.div_'+control_divs+' .topnav.widget_alejandro').append("<li class='right'><a class='active' href='" + smbenlace_perfil + "' target='_blank'>ShowMB</a></li>");
                }

                var smbtexto_cookie_cod = btoa(smbtexto_cookie);
                if(smbvidadecookie_segundos>0)
                   smbcrearCookie("Valores_" + smbval_cookie,smbtexto_cookie_cod,smbvidadecookie_segundos);
                else
                   smbcrearCookie("Valores_" + smbval_cookie,smbtexto_cookie_cod);
            }
        }
      }) 
        .fail( function(){
          jQuery('.widget_smb_'+ smbval +'.div_'+control_divs+' .topnav.widget_alejandro').append("<a class='active' href='https://www.showmb.com/' target='_blank'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Error 600</a><i class='fa fa-exclamation-triangle' aria-hidden='true'></i>");
        })};


    //Funcion definida con Cookies dentro
    //Funciones de cookies
    function smbcrearCookie(clave, valor, diasexpiracion) {
        var d = new Date();
        d.setTime(d.getTime() + (diasexpiracion));//*24*60*60*1000
        var expires = "expires="+d.toUTCString();
        document.cookie = clave + "=" + valor + "; " + expires;
    }
    function smbobtenerCookie(clave) {
        var name = clave + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }
    //Fin funciones de cookies

    var smbconfirmacion = smbobtenerCookie("Valores_" + smbval_cookie);
    if (smbconfirmacion != ""){

        var smbvalor2 = smbobtenerCookie("Valores_" + smbval_cookie);
        var smbvalor2 = atob(smbvalor2);
        var smbvalor2_array = smbvalor2.split('|');

         for (var smbcampo in smbvalor2_array){
             var smblosvalores = smbvalor2_array[smbcampo].split(',');
             if(smblosvalores[0]!=''){

                 if(smblosvalores[0]=='smb'){
                     var smbenlace_perfil=smblosvalores[1];
                     jQuerysmbico = 'icomoon icomoon-fa-sigma';
                 } else{
                         jQuerysmbico = smblosvalores[0];
                     }
                    jQuery('.widget_smb_'+ smbval +'.div_'+control_divs+' .topnav.widget_alejandro').append("<li><a href='" + smblosvalores[1] +"' target='_blank'><i class='fa fa-" + jQuerysmbico + "' aria-hidden='true'></i>" +  smblosvalores[2]);
                 }
             }
                    jQuery('.widget_smb_'+ smbval +'.div_'+control_divs+' .topnav.widget_alejandro').append("<li class='right'><a class='active' href='" + smbenlace_perfil + "' target='_blank'>ShowMB</a></li>");
         }
    else{                    
            smbintercambiophp(smbval, smbval_cookie,control_divs);
    }

