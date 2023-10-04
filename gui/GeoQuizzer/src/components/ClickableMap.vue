<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps(["failedGuesses","succeededGuesses","scale","centerX","centerY"]);
const emit = defineEmits(['countryClicked']);
const nameToIdMap = ref(new Map());
const selectingRegions = ref(true);
let europe;
let america;
let asia;
let africa;
let oceania;


onMounted(async () => {
  const svg = d3.select("#my_dataviz");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const projection = d3.geoMercator()
      .scale(props.scale)
      .center([props.centerX, props.centerY])
      .translate([width / 2, height / 2]);

  const geoData = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");

  // const europe = await d3.json("http://localhost:8080/countries/europe");
  // const america = await d3.json("http://localhost:8080/countries/america");
  // const asia = await d3.json("http://localhost:8080/countries/asia");
  // const africa = await d3.json("http://localhost:8080/countries/africa");
  // const oceania = await d3.json("http://localhost:8080/countries/oceania");
  populateRegionMocks();

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
    selectingRegions.value ? mouseOverRegions.call(this) : mouseOverCountry.call(this);
  }

  function mouseOverCountry() {

    d3.selectAll(".Country").transition()
        .duration(200)
        .style("opacity", .5);
    d3.select(this).transition()
        .duration(200)
        .style("opacity", 1);

  }

  /**
   * @returns {string[]|null}
   */
  function findRegionForCountry(countryName) {
    if (europe.includes(countryName)) return europe;
    if (asia.includes(countryName)) return asia;
    if (america.includes(countryName)) return america;
    if (oceania.includes(countryName)) return oceania;
    if (africa.includes(countryName)) return africa;
    return null;
  }

  function mouseOverRegions() {
    const hoveredCountryName = d3.select(this).datum().properties.name;
    const region = findRegionForCountry(hoveredCountryName);

    if (region) {
      d3.selectAll(".Country")
          .filter(d => region.includes(d.properties.name))
          .transition()
          .duration(200)
          .style("opacity", 1);

      d3.selectAll(".Country")
          .filter(d => !region.includes(d.properties.name))
          .transition()
          .duration(200)
          .style("opacity", .5);
    } else {
      d3.selectAll(".Country").transition()
          .duration(200)
          .style("opacity", .5);
      d3.select(this).transition()
          .duration(200)
          .style("opacity", 1);
    }
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

  function populateRegionMocks() {
    europe = [
      "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan",
      "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
      "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "England",
      "Finland", "France", "Georgia", "Germany", "Greece",
      "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan",
      "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
      "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands",
      "North Macedonia", "Norway", "Poland", "Portugal", "Romania",
      "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
      "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine",
      "United Kingdom", "Vatican City"
    ];
    asia = [
      "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh",
      "Bhutan", "Brunei", "Cambodia", "China", "Cyprus",
      "Georgia", "India", "Indonesia", "Iran", "Iraq",
      "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait",
      "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives",
      "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman",
      "Pakistan", "Palestine", "Philippines", "Qatar", "Russia",
      "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria",
      "Taiwan", "Tajikistan", "Thailand", "Turkey", "Turkmenistan",
      "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
    ];

    america = [
      "Antigua and Barbuda", "Argentina", "Bahamas", "Barbados", "Belize",
      "Bolivia", "Brazil", "Canada", "Chile", "Colombia",
      "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "Ecuador",
      "El Salvador", "Grenada", "Guatemala", "Guyana", "Haiti",
      "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama",
      "Paraguay", "Peru", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
      "Suriname", "Trinidad and Tobago", "United States", "Uruguay", "Venezuela"
    ];

    oceania = [
      "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia",
      "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa",
      "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
    ];

    africa = [
      "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso",
      "Burundi", "Cabo Verde", "Cameroon", "Central African Republic", "Chad",
      "Comoros", "Congo", "Djibouti", "Egypt", "Equatorial Guinea",
      "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia",
      "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya",
      "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
      "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique",
      "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe",
      "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
      "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia",
      "Uganda", "Zambia", "Zimbabwe"
    ];
  }
});

</script>

<template>
  <div>
    <svg id="my_dataviz" width="800" height="600"></svg>
  </div>
  <div>{{mouseover}}</div>
</template>

<style scoped>
#my_dataviz {background-color: white;}
</style>
