<template>
  <GMapMap :options="options" style="width: 100%; height: 450px" @click="handleMapClick">
    <GMapMarker
      v-for="marker in markers"
      :key="marker.id"
      :position="marker.position"
      :clickable="true"
      :draggable="true"
      @click="handleMarkerClick"
      @dragend="handleMarkerDragEnd"
    />
  </GMapMap>
</template>

<script setup>
import { ref } from 'vue'

const markers = ref([])

const center = { lat: 49.5887785933998, lng: 34.550932134344635 }
const options = {
  zoom: 14,
  center: center,
  disableDefaultUI: true,
  mapId: 'ab970314a26da074'
}

const handleMapClick = (event) => {
  const clickedPosition = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }
  const marker = {
    id: Date.now(), // Unique ID for the marker
    position: clickedPosition
  }
  markers.value.push(marker)
  console.log(marker)
}

const handleMarkerClick = (event) => {
  console.log('Marker clicked', event)
}

const handleMarkerDragEnd = (event) => {
  console.log('Marker dragged', event)
}
</script>

<style>
/*======= Map Styling ============*/
.gmnoprint {
  display: none;
}
.gm-style-cc {
  display: none;
}
.vue-map-container {
  border: 1px solid var(--base-color);
}
</style>
