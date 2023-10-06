<template>
  <div>
    register

  </div>
</template>

<style>


</style>
<script setup>
import { fetchEuropeanCountries} from "@/js/CountriesApi";
let s = await fetchEuropeanCountries();
console.log(JSON.stringify(s));
</script>