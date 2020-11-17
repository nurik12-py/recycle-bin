import React from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";
// instanceRef={ref => {
//     if (ref) {
//         ref.events.add(['click'], e => {
//             var coords = e.get('coords');
//             if (getOnClickCoords) getOnClickCoords(coords);
//             e.stopPropagation();
//         });
//     }
// }}
const SettingsYandexMap = ({ location, mapCenterCordinates, zoom, getOnClickCoords }) => {
    const mapData = {
        center: mapCenterCordinates ? mapCenterCordinates : [42.318329, 69.596277],
        zoom: zoom ? zoom : 12,
        controls: ['zoomControl']
    };
    return (
        <YMaps>
            <Map className="map" state={mapData} modules={['control.ZoomControl']}>
                {location && <Placemark geometry={[location.lon, location.lat]} />}
            </Map>
        </YMaps>
    );
}



export default SettingsYandexMap;