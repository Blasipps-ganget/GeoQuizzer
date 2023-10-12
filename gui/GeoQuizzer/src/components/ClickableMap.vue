<script setup>
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
  failedGuesses: Array,
  succeededGuesses: Array,
  selectingRegions: { type: Boolean, default: true },
  mapResetTrigger: Array
});

const emit = defineEmits(['countryClicked', 'regionClicked']);
const nameToIdMap = ref(new Map());
const mouseover = ref("mouseover");

let europe;
let asia;
let africa;
let oceania;
let southAmerica;
let northAmerica;


onMounted(async () => {

  const svg = d3.select("#my_dataviz");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const projection = d3.geoMercator()
      .scale(140)
      .center([0, 20])
      .translate([width / 2, height / 2]);

  const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
  // svg.call(zoom); // delete this line to disable free zooming

  const geoData = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
  await populateRegionMocks();

  geoData.features.forEach(feature => nameToIdMap.value.set(feature.properties.name, feature.id));
  appendCountryPaths(geoData);

  watch([props.mapResetTrigger], () => {resetZoom();updateMap();});

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
        .attr("class", "Country")
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
        .on("click", mouseClick);
  }

  function updateMap(){
    svg.selectAll("path.Country")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", d => getCountryColor(d))
  }

  function getCountryColor(d) {
    if(!props.selectingRegions) {
      let failedGuessesIds = props.failedGuesses.map(name => nameToIdMap.value.get(name));
      let succeededGuessesIds = props.succeededGuesses.map(name => nameToIdMap.value.get(name));
      if (failedGuessesIds.includes(d.id)) return "red";
      if (succeededGuessesIds.includes(d.id)) return "green";
    }
    return "grey";
  }

  function mouseOver() {
    mouseover.value = d3.select(this).datum().properties.name;
    props.selectingRegions ? mouseOverRegions.call(this) : mouseOverCountry.call(this);
  }

  function mouseOverCountry() {
    d3.selectAll(".Country").transition()
        .duration(200)
        .style("opacity", .7);
    d3.select(this).transition()
        .duration(200)
        .style("opacity", 1);
  }

  function findRegionForCountry(countryName) {
    if (europe.includes(countryName)) return "europe";
    if (asia.includes(countryName)) return "asia";
    if (oceania.includes(countryName)) return "oceania";
    if (africa.includes(countryName)) return "africa";
    if (southAmerica.includes(countryName)) return "southAmerica";
    if (northAmerica.includes(countryName)) return "northAmerica";
    return null;
  }

  function mouseOverRegions() {
    const hoveredCountryName = d3.select(this).datum().properties.name;
    const region = findRegionForCountry(hoveredCountryName);
    const regionMap = {
      "europe": europe,
      "asia": asia,
      "oceania": oceania,
      "africa": africa,
      "southAmerica": southAmerica,
      "northAmerica": northAmerica
    };

    const regionArray = regionMap[region];
    if(!regionArray) return;

    d3.selectAll(".Country")
        .filter(d => regionArray.includes(d.properties.name))
        .transition()
        .duration(200)
        .style("opacity", 1);

    d3.selectAll(".Country")
        .filter(d => !regionArray.includes(d.properties.name))
        .transition()
        .duration(200)
        .style("opacity", .7);
  }

  function mouseLeave() {
    d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", .7)
        .style("stroke", "black");
  }

  function mouseClick() {

    let country = d3.select(this).datum().properties.name;
    let region = findRegionForCountry(country);

    if (props.selectingRegions) {

      let fractionX; // 0 is leftmost, 1 is rightmost, 0.5 is middle
      let fractionY; // 0 is topmost, 1 is bottommost, 0.5 is middle
      let scale;       // 1 is normal, 2 is double size, 0.5 is half size

      if (region === "europe") { fractionX = 0.55; fractionY = 0.25; scale = 3.8; }
      if (region === "asia") { fractionX = 1; fractionY = 0.3; scale = 2; }
      if (region === "oceania") { fractionX = 1; fractionY = 0.721; scale = 5; }
      if (region === "africa") { fractionX = 0.6; fractionY = 0.6; scale = 2.5; }
      if (region === "northAmerica") { fractionX = 0; fractionY = 0.2; scale = 2; }
      if (region === "southAmerica") { fractionX = 0.22; fractionY = 0.758; scale = 3.25; }

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

  async function populateRegionMocks() {
    europe = await d3.json("http://localhost:8080/countries/europe");
    asia = await d3.json("http://localhost:8080/countries/asia");
    africa = await d3.json("http://localhost:8080/countries/africa");
    oceania = await d3.json("http://localhost:8080/countries/oceania");
    southAmerica = await d3.json("http://localhost:8080/countries/southAmerica");
    northAmerica = await d3.json("http://localhost:8080/countries/northAmerica");
  }
});

</script>

<template>
  <div>{{mouseover}}</div>
  <div>
    <svg id="my_dataviz" width="885" height="650"></svg>
  </div>

</template>

<style scoped>
#my_dataviz {background-color: white;}
</style>