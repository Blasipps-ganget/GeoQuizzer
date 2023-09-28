<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps(["failedGuesses","succeededGuesses","includedCountries","scale","centerX","centerY"]);
const emit = defineEmits(['countryClicked']);
const nameToIdMap = ref(new Map());
const dataMap = ref(new Map());


onMounted(() => {
  const svg = d3.select("#my_dataviz");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const projection = d3.geoMercator()
      .scale(props.scale)
      .center([props.centerX, props.centerY])
      .translate([width / 2, height / 2]);

  const colorScale = d3.scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7]);

  const jsonUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
  const csvUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv";

  Promise.all([d3.json(jsonUrl),d3.csv(csvUrl, d => dataMap.value.set(d.code, d.pop))])
      .then(([geoData]) => {
    geoData.features.forEach(feature => nameToIdMap.value.set(feature.properties.name, feature.id));
    appendCountryPaths(geoData);
  });

  watch(
      [
        () => props.scale,
        () => props.centerX,
        () => props.centerY,
        () => props.failedGuesses,
        () => props.succeededGuesses,
        () => props.includedCountries
      ],
      () => {
        projection.scale(props.scale).center([props.centerX, props.centerY]);
        svg.selectAll("path.Country").attr("d", d3.geoPath().projection(projection));
        svg.selectAll("path.Country").attr("fill", d => getCountryColor(d));
      }
  );


  function appendCountryPaths(geoData) {
    svg.append("g")
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", d => getCountryColor(d))
        .style("stroke", "transparent")
        .attr("class", "Country")
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
        .on("click", mouseClick);
  }



  function getCountryColor(d) {
    let failedGuessesIds = props.failedGuesses.map(name => nameToIdMap.value.get(name));
    let succeededGuessesIds = props.succeededGuesses.map(name => nameToIdMap.value.get(name));
    let includedCountriesIds = props.includedCountries.map(name => nameToIdMap.value.get(name));

    if (failedGuessesIds.includes(d.id)) return "red";
    if (succeededGuessesIds.includes(d.id)) return "green";
    if (includedCountriesIds.includes(d.id)) return "darkgrey";
    return colorScale(dataMap.value.get(d.id) || 0);
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
        .style("opacity", .8);
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
#my_dataviz {
  background-color: white;
}

</style>
