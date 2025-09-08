<template>
  <section class="max-w-5xl mx-auto px-4 py-10">
    <div class="grid md:grid-cols-2 gap-8 items-start">
      <div
        v-motion="{
          initial: { opacity: 0, y: 12 },
          enter: { opacity: 1, y: 0 },
        }"
        class="card"
      >
        <h2 class="text-2xl font-bold text-primary-blue mb-2">
          Join UCO Home Collection
        </h2>
        <p class="text-neutral-dark2 mb-6">
          Sign up to get a free used-cooking-oil container and on-demand
          collection.
        </p>

        <form @submit.prevent="onSubmit" class="space-y-4">
          <div>
            <label class="label" for="name">Full name</label>
            <input
              id="name"
              v-model.trim="form.name"
              class="input"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label" for="phone">Phone</label>
              <input
                id="phone"
                v-model.trim="form.phone"
                class="input"
                placeholder="050 123 4567"
                required
              />
            </div>
            <div>
              <label class="label" for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model.trim="form.email"
                class="input"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label class="label" for="address">Address (villa & street)</label>
            <input
              id="address"
              v-model.trim="form.addressLine"
              class="input"
              placeholder="Villa 12, Street 4, Al Fallah 1A"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label" for="community">Community (optional)</label>
              <input
                id="community"
                v-model.trim="form.community"
                class="input"
                placeholder="Al Falah Community - 1A"
              />
            </div>
            <div>
              <label class="label" for="villa">Villa # (optional)</label>
              <input
                id="villa"
                v-model.trim="form.villaNumber"
                class="input"
                placeholder="V-12"
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="label">Drop a pin (click on the map)</div>
            <MapPicker ref="mapRef" :center="defaultCenter" @update="onMap" />
            <p v-if="hasPin" class="text-xs text-neutral-dark2">
              Selected:
              <span class="font-mono">
                {{ lat.toFixed(6) }}, {{ lng.toFixed(6) }}
              </span>
            </p>
            <p v-else class="text-xs text-neutral-dark2">
              Click the map to place a pin.
            </p>
          </div>

          <div class="pt-2 flex items-center gap-3">
            <button
              class="btn btn-secondary"
              type="button"
              @click="centerAlFalah"
            >
              Center: Al Falah Community
            </button>
            <button
              class="btn btn-primary ml-auto"
              :disabled="loading || !hasPin"
              type="submit"
              title="Place a pin to enable"
            >
              <span v-if="loading" class="animate-pulse">Submitting…</span>
              <span v-else>Submit</span>
            </button>
          </div>
        </form>

        <p v-if="error" class="mt-4 text-accent-coral">{{ error }}</p>
      </div>

      <div
        v-motion="{
          initial: { opacity: 0, y: 16 },
          enter: { opacity: 1, y: 0, transition: { delay: 0.1 } },
        }"
        class="card md:sticky md:top-6"
      >
        <h3 class="text-xl font-semibold text-primary-blue mb-2">
          How it works
        </h3>
        <ol class="space-y-4 text-sm text-neutral-dark1">
          <li class="flex gap-3">
            <span
              class="w-6 h-6 rounded-full bg-primary-green text-primary-blue flex items-center justify-center font-bold"
              >1</span
            >
            Fill the form and place the map pin at your villa.
          </li>
          <li class="flex gap-3">
            <span
              class="w-6 h-6 rounded-full bg-primary-green text-primary-blue flex items-center justify-center font-bold"
              >2</span
            >
            We deliver a labeled UCO container with a QR code.
          </li>
          <li class="flex gap-3">
            <span
              class="w-6 h-6 rounded-full bg-primary-green text-primary-blue flex items-center justify-center font-bold"
              >3</span
            >
            When full, scan the QR and tap <b>Collect Me</b>.
          </li>
        </ol>
        <div
          class="mt-6 p-4 rounded-xl bg-accent-aqua/10 text-accent-midnight text-sm"
        >
          <b>Privacy:</b> Your details are used only for scheduling collection
          per our policy.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import MapPicker from "../components/MapPicker.vue";
import { submitSignup } from "../services/api";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const lat = ref(null);
const lng = ref(null);
const hasPin = ref(false);
const mapRef = ref(null);

// Default Al Falah Community center
const defaultCenter = { lat: 24.446035, lng: 54.716936 };

const form = reactive({
  name: "",
  phone: "",
  email: "",
  addressLine: "",
  community: "",
  villaNumber: "",
});

function onMap(pos) {
  lat.value = pos.lat;
  lng.value = pos.lng;
  hasPin.value = true;
}

function centerAlFalah() {
  if (mapRef.value?.recenter) {
    mapRef.value.recenter(defaultCenter);
  }
}

function buildAddressText() {
  const parts = [];
  if (form.addressLine) parts.push(form.addressLine);
  if (form.villaNumber) parts.push(`Villa ${form.villaNumber}`);
  if (form.community) parts.push(form.community);
  return parts.join(", ");
}

async function onSubmit() {
  error.value = "";
  if (!hasPin.value) {
    error.value = "Please click on the map to place a pin at your villa.";
    return;
  }

  const payload = {
    fullName: form.name.trim(), // API expects 'fullName'
    phone: (form.phone || "").trim(),
    email: (form.email || "").trim(),
    addressText: buildAddressText(), // single string
    community: form.community || null, // optional passthroughs
    villaNumber: form.villaNumber || null,
    addressLine: form.addressLine || null,
    location: {
      // NOT GeoJSON
      latitude: lat.value,
      longitude: lng.value,
    },
  };

  loading.value = true;
  try {
    await submitSignup(payload);
    router.push({ name: "success" });
  } catch (e) {
    console.error(e);
    error.value =
      e?.response?.data?.detail ||
      (Array.isArray(e?.response?.data) && e.response.data[0]?.msg) ||
      "Failed to submit. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>
