<template>
  <div
    class="w-full h-72 rounded-2xl overflow-hidden border border-neutral-card relative"
  >
    <div ref="mapEl" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, defineExpose } from "vue";
import L from "leaflet";

const props = defineProps({
  center: { type: Object, default: () => ({ lat: 24.446035, lng: 54.716936 }) },
  zoom: { type: Number, default: 15 },
});

const emit = defineEmits(["update"]);

const mapEl = ref(null);
let map = null;
let tileLayer = null;
let marker = null;

function placeMarker(latlng) {
  if (!marker) {
    marker = L.marker(latlng, { draggable: false });
    marker.addTo(map);
  } else {
    marker.setLatLng(latlng);
  }
}

function clickHandler(e) {
  const { lat, lng } = e.latlng;
  placeMarker([lat, lng]);
  emit("update", { lat, lng });
}

function recenter({ lat, lng }) {
  if (!map) return;
  map.setView([lat, lng], map.getZoom());
  // also move pin to center (requested behavior)
  placeMarker([lat, lng]);
  emit("update", { lat, lng });
}

defineExpose({ recenter });

onMounted(() => {
  map = L.map(mapEl.value, { zoomControl: true }).setView(
    [props.center.lat, props.center.lng],
    props.zoom
  );

  tileLayer = L.tileLayer(
    import.meta.env.VITE_MAP_TILE_URL ||
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
    }
  );
  tileLayer.addTo(map);

  map.on("click", clickHandler);
});

onBeforeUnmount(() => {
  if (map) {
    map.off("click", clickHandler);
    map.remove();
    map = null;
  }
});

watch(
  () => props.center,
  (c) => {
    if (map && c) map.setView([c.lat, c.lng]);
  }
);
</script>
