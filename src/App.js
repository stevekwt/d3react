import './App.css';
import { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { name: "A", value: 100 },
  { name: "B", value: 200 },
  { name: "C", value: 500 },
  { name: "D", value: 150 },
  { name: "E", value: 300 }
]

const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
}

const width = 300;

const height = 250;

function App() {
  const ref = useRef();

  useEffect(() => {
    const yMax = Math.max(...data.map((d) => d.value));

    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    const x = d3
      .scaleBand()
      .domain(data)
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const yAxis = (g) =>
      g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((d) => d.name));

    const bars = (g) =>
      g
        .selectAll("rect")
        .data(data)
        .join(
          (enter) => enter.append("rect"),
          (update) => update,
          (exit) => exit.remove()
        )
        .attr("x", (d) => x(d))
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => y(0) - y(d.value))
        .attr("width", x.bandwidth());

    svg.append("g").call(yAxis);

    svg.append("g").call(xAxis);

    svg.append("g").call(bars);

  }, [data]) 

  return <div ref={ref} />;

}

export default App;
