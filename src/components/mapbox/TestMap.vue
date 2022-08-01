<template>
    <div>
        <common-nav></common-nav>
        <div id="map" style="height: calc(100vh - 41px)">

        </div>
    </div>
</template>

<script>
import commonNav from '../common/nav'
import mapboxgl from 'mapbox-gl';

export default {
    name: "TestMap",
    components: {commonNav},
    mounted() {
        let map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-74.0066, 40.7135],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            container: 'map',
            accessToken: 'pk.eyJ1IjoibXljY3kxMjMiLCJhIjoiY2l6cWQyMXpmMDE5MDMzcDdhbDYwbXZqNyJ9.Wi-g8bPcn3dCxbKVEIZVNg'
        });

        function rotateCamera(timestamp) {
            // clamp the rotation between 0 -360 degrees
            // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
            map.rotateTo((timestamp / 100) % 360, {duration: 0});
            // Request the next frame of the animation.
            requestAnimationFrame(rotateCamera);
        }

        map.on('load', function() {
            rotateCamera(0);
            let layers = map.getStyle().layers;
            let labelLayerId;
            for (let i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }

            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    'fill-extrusion-height': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);
        });
    }
}
</script>

<style scoped>

</style>