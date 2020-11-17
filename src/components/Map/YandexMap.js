import React from 'react';
import { YMaps, Map, ObjectManager } from "react-yandex-maps";
import { getLocationFeature } from './TrashPlaceMark';

const YandexMap = ({ locations, mapCenterCordinates, zoom, getOnClickCoords }) => {
    const mapData = {
        center: mapCenterCordinates ? mapCenterCordinates : [42.318329, 69.596277],
        zoom: zoom ? zoom : 12,
        controls: ['zoomControl']
    };
    const data = {
        type: "FeatureCollection",
        features: locations && locations.map((location, key) => getLocationFeature(location, key))
    }

    return (
        <YMaps>
            <Map className="map" state={mapData} instanceRef={ref => {
                if (ref) {
                    ref.events.add("click", e => {
                        var coords = e.get('coords');
                        if (getOnClickCoords) getOnClickCoords(coords);
                    });
                }
            }} modules={['control.ZoomControl']}>
                <ObjectManager
                    options={{
                        clusterize: true,
                        gridSize: 32,
                    }}
                    objects={{
                        openBalloonOnClick: true,
                    }}
                    modules={[
                        'objectManager.addon.objectsBalloon',
                        'objectManager.addon.objectsHint',
                    ]}
                    clusters={{
                        preset: 'islands#whiteClusterIcons',
                    }}
                    features={data}
                />
            </Map>
        </YMaps>
    );
}



export default YandexMap;