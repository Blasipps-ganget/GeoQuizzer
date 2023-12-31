<script setup>
import * as d3 from 'd3';
import {ref, onMounted} from 'vue';
import {useMapStore} from '@/stores/map';

const mapStore = useMapStore();
const props = defineProps({
  failedGuesses: Array,
  succeededGuesses: Array,
  selectingRegions: {type: Boolean, default: true},
  markRegion: {type: Boolean, default: false}
});

const emit = defineEmits(['countryClicked', 'regionClicked']);
const nameToIdMap = ref(new Map());
const mouseover = ref("mouseover");
const countriesMarked = ref([]);
let europe;
let asia;
let africa;
let oceania;
let southAmerica;
let northAmerica;
let regionMap = {};
let isZoomEnabled = true;
let width = 885;
let height = 650;

onMounted(async () => {
  mapStore.resetZoom = resetZoom;
  mapStore.updateMap = updateMap;
  mapStore.toggleZoom = toggleZoom;

  const svg = d3.select("#my_dataviz");
  const projection = d3.geoMercator()
      .scale(140)
      .center([0, 20])
      .translate([width / 2, height / 2]);

  const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
  svg.call(zoom);

  const geoData = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
  await populateRegions();

  geoData.features.forEach(feature => nameToIdMap.value.set(feature.properties.name, feature.id));
  appendCountryPaths(geoData);

  function appendCountryPaths(geoData) {
    svg.append("g")
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", d => getCountryColor(d))
        .style("stroke", "transparent")
        .style("stroke", "black")
        .style("stroke-width", "0.5px")
        .attr("class", "Country")
        .style("opacity", 1)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
        .on("click", mouseClick);
  }

  function updateMap() {
    svg.selectAll("path.Country")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", d => getCountryColor(d))
  }

  function getCountryColor(d) {
    const getIdFromName = name => nameToIdMap.value.get(name);
    if (!props.selectingRegions) {
      if (props.failedGuesses.map(getIdFromName).includes(d.id)) return "red";
      if (props.succeededGuesses.map(getIdFromName).includes(d.id)) return "green";
    } else if (props.markRegion)
      if (countriesMarked.value.map(getIdFromName).includes(d.id)) return "#022831";
    return "lightgrey";
  }

  function mouseOver() {
    mouseover.value = d3.select(this).datum().properties.name;
    props.selectingRegions ? mouseOverRegions.call(this) : mouseOverCountry.call(this);
  }

  function mouseOverCountry() {

    d3.selectAll(".Country")
        .transition()
        .attr("fill", getCountryColor); // When hovering over a none green/red country prevents it to become darkblue

    d3.select(this).transition()
        .attr("fill", "#053B50");

    if (getCountryColor(d3.select(this).datum()) !== "lightgrey")
      d3.select(this).transition()
          .attr("fill", getCountryColor);
  }

  function findRegionForCountry(countryName) {
    return Object.keys(regionMap).find(key => regionMap[key].includes(countryName));
  }

  function mouseOverRegions() {
    const hoveredCountryName = d3.select(this).datum().properties.name;
    const region = findRegionForCountry(hoveredCountryName);
    const regionArray = regionMap[region];
    if (!regionArray)
      return;

    d3.selectAll(".Country")
        .filter(d => regionArray.includes(d.properties.name))
        .transition()
        .duration(200)
        .attr("fill", "#053B50");

    d3.selectAll(".Country")
        .filter(d => !regionArray.includes(d.properties.name))
        .transition()
        .duration(200)
        .attr("fill", getCountryColor);
  }

  function mouseLeave() {
    d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("stroke", "black").attr("fill", getCountryColor);
  }

  function mouseClick() {

    let country = d3.select(this).datum().properties.name;
    let region = findRegionForCountry(country);

    if (props.markRegion) {
      countriesMarked.value = regionMap[region];
      emit("regionClicked", region);
      updateMap();
      return
    }

    if (props.selectingRegions) {

      let fractionX;
      let fractionY;
      let scale;

      if (region === "europe") {
        fractionX = 0.55;
        fractionY = 0.25;
        scale = 3.8;
      }
      if (region === "asia") {
        fractionX = 0.9;
        fractionY = 0.41;
        scale = 2.8;
      }
      if (region === "oceania") {
        fractionX = 1;
        fractionY = 0.721;
        scale = 5;
      }
      if (region === "africa") {
        fractionX = 0.6;
        fractionY = 0.6;
        scale = 3.4;
      }
      if (region === "northAmerica") {
        fractionX = 0.15;
        fractionY = 0.3;
        scale = 2.8;
      }
      if (region === "southAmerica") {
        fractionX = 0.22;
        fractionY = 0.758;
        scale = 3.25;
      }

      let translateX = (width * fractionX) - (scale * width * fractionX);
      let translateY = (height * fractionY) - (scale * height * fractionY);

      svg.transition()
          .duration(1000)
          .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale));
    }

    props.selectingRegions ? emit("regionClicked", region) : emit("countryClicked", country);
    updateMap();
  }

  function zoomed(event) {
    svg.selectAll("path")
        .attr("transform", event.transform);
  }

  function resetZoom() {
    svg.transition().duration(200).call(zoom.transform, d3.zoomIdentity);
  }

  function toggleZoom() {
    isZoomEnabled = !isZoomEnabled;
    if (isZoomEnabled) svg.call(zoom);
    else svg.on('.zoom', null)

  }

  async function populateRegions() {
    europe = await d3.json("http://localhost:8080/countryquiz/europe");
    asia = await d3.json("http://localhost:8080/countryquiz/asia");
    africa = await d3.json("http://localhost:8080/countryquiz/africa");
    oceania = await d3.json("http://localhost:8080/countryquiz/oceania");
    southAmerica = await d3.json("http://localhost:8080/countryquiz/southAmerica");
    northAmerica = await d3.json("http://localhost:8080/countryquiz/northAmerica");
    regionMap = {
      "europe": europe,
      "asia": asia,
      "oceania": oceania,
      "africa": africa,
      "southAmerica": southAmerica,
      "northAmerica": northAmerica
    };
  }
});

</script>

<template>
  <div>
    <svg id="my_dataviz" :style="`width: ${width}px; height: auto;`" :viewBox="`0 0 ${width} ${height}`"></svg>
  </div>
</template>

<style scoped>
#my_dataviz {
  background-color: #176B87;
  border: 1px #64CCC5 solid;
  max-width: 97vw;
  max-height: 100vh;
  border-radius: 8px;
}

@media (max-width: 800px) {
  #my_dataviz {
    width: 500px;
    height: auto;
  }
}
</style>
