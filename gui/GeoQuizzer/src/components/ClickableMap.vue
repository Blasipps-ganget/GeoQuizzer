<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps(["failedGuesses","succeededGuesses","scale","centerX","centerY"]);
const emit = defineEmits(['countryClicked']);
const nameToIdMap = ref(new Map());

onMounted(async () => {
  const svg = d3.select("#my_dataviz");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const projection = d3.geoMercator()
      .scale(props.scale)
      .center([props.centerX, props.centerY])
      .translate([width / 2, height / 2]);

  const geoData = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
  geoData.features.forEach(feature => nameToIdMap.value.set(feature.properties.name, feature.id));
  appendCountryPaths(geoData);
  watch([props.scale, props.centerX, props.centerY, props.failedGuesses, props.succeededGuesses], updateMap);

  function updateMap(){
    projection
        .scale(props.scale)
        .center([props.centerX, props.centerY])

    svg.selectAll("path.Country")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", d => getCountryColor(d))
  }

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

  function getCountryColor(d) {

    let failedGuessesIds = props.failedGuesses.map(name => nameToIdMap.value.get(name));
    let succeededGuessesIds = props.succeededGuesses.map(name => nameToIdMap.value.get(name));
    if (failedGuessesIds.includes(d.id)) return "red";
    if (succeededGuessesIds.includes(d.id)) return "green";
    return "grey";
  }

  function mouseOver() {
    d3.selectAll(".Country").transition()
        .duration(200)
        .style("opacity", .5);
    d3.select(this).transition()
        .duration(200)
        .style("opacity", 1);
  }

  function mouseLeave() {
    d3.selectAll(".Country")
        .transition().duration(200)
    d3.select(this)
        .transition()
        .duration(200)
        .style("stroke", "transparent");
  }

  function mouseClick() {
    d3.select(this)
        .transition()
        .duration(200)
        .style("stroke", "transparent")
        .style("stroke", "black");
    let name = d3.select(this).datum().properties.name;
    emit("countryClicked", name);
  }

});

</script>

<template>
  <div>
    <svg id="my_dataviz" width="800" height="600"></svg>
  </div>
</template>

<style scoped>
#my_dataviz {background-color: white;}
</style>
