import React from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

const mapData = {
    center: [42.318329, 69.596277],
    zoom: 12,
};

const coordinates = [
    [42.318329, 69.596277],
    [42.318329, 69.576277]
];

const placeMark = {
    geometry: [56.848217, 53.236675],
    properties: {
        hintContent: 'Это хинт',
        balloonContentHeader: 'Рога и копыта',
        balloonContentBody: '',
        balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
        hintContent: 'Рога и копыта',
    },
    modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
}

const YandexMap = () => (
    <YMaps>
        <Map defaultState={mapData} width={600} height={400}>
            {coordinates.map(coordinate => <Placemark geometry={coordinate} properties={placeMark.properties} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']} />)}
        </Map>
    </YMaps>
);

export default YandexMap;