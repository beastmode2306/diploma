<template>
  <OrderCreatedView v-if="orderCreated" />
  <div v-else>
    <h2>Create order</h2>
    <GMapMap
      :options="options"
      style="width: 100%; height: 450px"
      @click="handleMapClick"
      class="map"
    >
      <GMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :position="marker.position"
        :options="markerOptions"
        @click="handleMarkerClick"
        @dragend="handleMarkerDragEnd"
        @dragstart="handleMarkerDragStart"
      />
    </GMapMap>

    <div class="selected">
      <div class="create-order-group">
        <h3>Selected points</h3>
        <div class="create-order-btn">
          <Button title="Create Order" :disabled="markers.length < 2" :callback="createOrder" />
        </div>
      </div>
      <div class="dots-list">
        <DotsItem
          v-for="(marker, index) in markers"
          :key="index"
          :dot="marker"
          :idx="index"
          :onRemove="removeMarker"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import DotsItem from '../components/dots/DotsItem.vue'
import Button from '../components/buttons/Button.vue'
import OrderCreatedView from './OrderCreatedView.vue'

const store = useStore()

const hash = (str) =>
  str.split('').reduce((prev, curr) => ((prev << 5) - prev + curr.charCodeAt(0)) | 0, 0)

const markers = ref([])
const draggingMarker = ref(null)
const orderCreated = ref(false)

const center = { lat: 49.5887785933998, lng: 34.550932134344635 }
const options = {
  zoom: 14,
  center: center,
  disableDefaultUI: true,
  mapId: 'ab970314a26da074'
}

const markerOptions = {
  animation: 4,
  draggable: true,
  clickable: true
}

const handleMapClick = (event) => {
  const clickedPosition = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }

  const marker = {
    id: hash(JSON.stringify(clickedPosition)),
    position: clickedPosition
  }

  markers.value.push(marker)
}

const handleMarkerClick = (event) => {
  const clickedPosition = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }

  const hashed = hash(JSON.stringify(clickedPosition))

  markers.value = markers.value.filter((marker) => marker.id !== hashed)
}

const handleMarkerDragEnd = (event) => {
  const draggedPosition = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }

  Object.assign(
    markers.value.find((marker) => marker.id === draggingMarker.value.id),
    {
      position: draggedPosition,
      id: hash(JSON.stringify(draggedPosition))
    }
  )
}

const handleMarkerDragStart = (event) => {
  const draggedPosition = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }

  const hashed = hash(JSON.stringify(draggedPosition))

  draggingMarker.value = markers.value.find((marker) => marker.id === hashed)
}

const removeMarker = (id) => {
  markers.value = markers.value.filter((m) => m.id !== id)
}

const createOrder = () => {
  const points = markers.value.map((m) => ({
    x: m.position.lat.toString(),
    y: m.position.lng.toString()
  }))

  const orderCreation = store.dispatch('createOrder', { points })

  orderCreation.then(() => {
    orderCreated.value = true
  })
  console.log('create order')
}
</script>

<style scoped>
h2 {
  color: var(--base-white);
}

.map {
  margin: 20px 0;
}

.selected {
  color: var(--base-color);
}

.create-order-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-order-btn {
  width: 150px;
}
</style>

/* DISABLE MAP TERMS */
<style>
.gmnoprint {
  display: none;
}
.gm-style-cc {
  display: none;
}
.vue-map-container {
  border: 1px solid var(--base-secondary-color-hover);
}
</style>
