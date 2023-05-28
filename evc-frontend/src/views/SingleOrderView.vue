<template>
  <OrderNotFoundView v-if="!computedOrder" />
  <div v-else>
    <h2>Order details</h2>
    <header>
      <div>
        <p class="item-title">ID</p>
        <p class="item-value">{{ computedOrder.id }}</p>
      </div>
      <div>
        <p class="item-title">Status</p>
        <p class="item-value">{{ computedOrder.status }}</p>
      </div>
      <div>
        <p class="item-title">Date</p>
        <p class="item-value">{{ orderDate }}</p>
      </div>
    </header>
    <div class="btn">
      <Button :callback="onButtonClick" title="Back to orders" />
    </div>
    <div class="details-list">
      <div class="details-item" v-for="(detail, index) in orderDetails">
        <p>Order Detail {{ index + 1 }}</p>

        <div class="dots-description">
          <h2>Input points</h2>
          <DotsItem
            v-for="(marker, markerIdx) in detail.input"
            :dot="{ position: marker, id: markerIdx }"
            :idx="markerIdx"
            :hasRemove="false"
            :color="'#00E64D'"
          />
          <h2>Results</h2>
          <h3>Best cluster center</h3>
          <DotsItem
            v-for="(marker, markerIdx) in detail.result.originalPoints"
            :dot="{ position: marker, id: markerIdx }"
            :idx="markerIdx"
            :hasRemove="false"
            :color="'#FDF569'"
          />
          <h3>Nearest roads</h3>
          <DotsItem
            v-for="(marker, markerIdx) in detail.result.nearestRoads"
            :dot="{ position: marker, id: markerIdx }"
            :idx="markerIdx"
            :hasRemove="false"
            :color="'#6991FD'"
          />
          <h3>Nearest gas stations</h3>
          <DotsItem
            v-for="(marker, markerIdx) in detail.result.nearestGasStations"
            :dot="{ position: marker, id: markerIdx }"
            :idx="markerIdx"
            :hasRemove="false"
            :color="'#8E67FD'"
          />
        </div>

        <GMapMap :options="options" style="width: 100%; height: 450px" class="map">
          <GMapMarker
            v-for="(marker, markerIdx) in detail.input"
            :key="markerIdx"
            :position="marker"
            :icon="{
              url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
              scaledSize: { width: 45, height: 45 }
            }"
          />

          <GMapMarker
            v-for="(marker, markerIdx) in detail.result.originalPoints"
            :key="`orig-${markerIdx}`"
            :position="marker"
            :zIndex="1"
            :icon="{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: { width: 45, height: 45 }
            }"
          />

          <GMapMarker
            v-for="(marker, markerIdx) in detail.result.nearestRoads"
            :key="`roads-${markerIdx}`"
            :position="marker"
            :zIndex="1"
            :icon="{
              url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
              scaledSize: { width: 45, height: 45 }
            }"
          />

          <GMapMarker
            v-for="(marker, markerIdx) in detail.result.nearestGasStations"
            :key="`gas-${markerIdx}`"
            :position="marker"
            :icon="{
              url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
              scaledSize: { width: 45, height: 45 }
            }"
          />

          <GMapPolygon :paths="detail.input" :options="polygonOptions" />
        </GMapMap>

        <div class="btn">
          <Button :callback="onButtonClick" title="Back to orders" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import OrderNotFoundView from './OrderNotFoundView.vue'
import DotsItem from '../components/dots/DotsItem.vue'
import Button from '../components/buttons/Button.vue'
import { convertCoordinates } from '../tools/utils'

const route = useRoute()
const router = useRouter()
const store = useStore()

store.dispatch('getOneOrder', route.params.id)

const computedOrder = computed(() => store.getters.order)

const orderDate = computed(() => {
  const date = new Date(computedOrder.value.updatedAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  })
  return date
})

const orderDetails = computed(() => {
  return convertCoordinates(
    computedOrder.value.details.map((detail) => ({
      input: JSON.parse(detail.points),
      result: {
        ...JSON.parse(detail.result)
      }
    }))
  )
})

const options = computed(() => ({
  zoom: 13,
  center: orderDetails.value?.result?.originalPoints.at(0) || {
    lat: 49.5887785933998,
    lng: 34.550932134344635
  },
  disableDefaultUI: true,
  mapId: 'ab970314a26da074'
}))

const polygonOptions = {
  strokeColor: '#6FE69F',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#6FE69F',
  fillOpacity: 0.1
}

const onButtonClick = () => {
  router.push('/orders')
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: var(--base-white);
  font-family: 'pt-mono';
  font-weight: bold;
  margin: 20px 0;

  div {
    display: flex;
    align-items: center;
    .item-title {
      width: 150px;
    }
    .item-value {
      font-weight: bold;
      color: var(--base-color);
    }
  }
}

h2 {
  padding: 10px 0px;
  font-family: 'pt-mono';
  color: var(--base-white);
  font-weight: bold;
}

h3 {
  padding: 20px 0px 5px 0px;
  font-family: 'pt-mono';
  color: var(--base-white);
  font-size: 14px;
}

.btn {
  width: 200px;
  margin: 20px 0;
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
