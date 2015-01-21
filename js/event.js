/**
 * Event class
 */
var Event = (function ($) {
    var constructor = function () {
        this.data = {};
        this.latlng = null;
        this.marker = null;
        this.infobox = null;
        this.infoboxtext = null;

        // Oh dear lord, browser detection. -10 Charisma. Is the browser android or iPhone or Blackberry or Windows mobile?
        this.isPhone = (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.toLowerCase()
            .indexOf("android") > -1) || (navigator.userAgent.toLowerCase()
            .indexOf("blackberry") > -1) || navigator.userAgent.match(/iemobile/i) || navigator.userAgent.match(/Windows Phone/i)) ? true : false;

        this.toggleInfoBox = function (Map, ThisEvent) {
            return function () {
                if (ThisEvent.infobox != null && ThisEvent.infobox.visible) {
                    ThisEvent.infobox.close(Map, ThisEvent.marker);
                } else {
                    ThisEvent.infoboxtext = '<div class="infoBox" style="border:2px solid rgb(16,16,16); margin-top:8px; background:#fff; color: black; padding:5px; font-family:Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 20px;">';

                    ThisEvent.infoboxtext += '   <p>' + "\n";
                    ThisEvent.infoboxtext += '                   <B>Project: </B> ' + ThisEvent.data['1. Project Title/Name'] + "<br>\n";
                    ThisEvent.infoboxtext += '                   ' + ThisEvent.data['2. Project description'].substring(0, 100) + "<br>\n";
                    ThisEvent.infoboxtext += '                   <B>Type: </B>' + ThisEvent.data['3. Project type'] + "<br>\n";
                    ThisEvent.infoboxtext += '                   <B>Organization: </B>' + ThisEvent.data['17. Organization name'] + "<br>\n";
                    ThisEvent.infoboxtext += '                   <B>Location: </B>';
                    if (ThisEvent.data['11. For area-wide projects, does this project have more specific boundaries?'].length != 0 ) {
                        ThisEvent.infoboxtext += ThisEvent.data['11. For area-wide projects, does this project have more specific boundaries?'] + "<br>\n";
                    } else {
                        ThisEvent.infoboxtext += ThisEvent.data['FullAddress'] + "<br>\n";
                    }


                    ThisEvent.infoboxtext += '        </p>' + "\n";

                    ThisEvent.infoboxtext += '</div>';
                    ThisEvent.infobox.setContent(ThisEvent.infoboxtext);
                    ThisEvent.infobox.open(Map, ThisEvent.marker);
                    //					_gaq.push(['_trackEvent', 'Open InfoBox', 'Event', ThisEvent.data.facility_name+' | '+ThisEvent.data.street1]);
                }
            };
        };

        this.closeInfoBox = function (Map, Marker, InfoBox) {
            if (InfoBox.visible) {
                InfoBox.close(Map, Marker);
            }
        };

    };
    return constructor;
})(jQuery);